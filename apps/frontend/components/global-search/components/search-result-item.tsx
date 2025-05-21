"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Image } from "lucide-react";
import { useIsClient } from "@uidotdev/usehooks";

import { SearchItem } from "@/types/global-search";
import { useGlobalSearchStore } from "../store/global-search-store";
import { HighlightText } from "./highlight-text";

type SearchResultItemProps = {
  item: SearchItem;
};

/**
 * SearchResultItem component displays a single search result.
 * It includes the item's icon, name, breadcrumbs, description, and last updated date.
 */
export const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  const { searchQuery } = useGlobalSearchStore();
  const Icon = Image;
  const isClient = useIsClient();

  // Redirect URL for the search result item
  // TODO: update this to use the actual URL
  // This is a demonstration of how to redirect to a page
  const redirectUrl = `/demo-redirect-page?name=${encodeURIComponent(item.title)}&id=${item.id}&url=${encodeURIComponent(item.siteUrl ?? "")}`;

  // Render null on the server to prevent hydration mismatch
  if (!isClient) return null;

  return (
    <Link
      href={redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full flex-col space-y-1 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-100"
      aria-label={`Search result: ${item.title}`}
    >
      {/* Item name and icon */}
      <div className="flex w-full max-w-[95%] items-center overflow-hidden">
        {Icon && <Icon size={16} className="mr-2 text-gray-400" aria-hidden="true" />}
        <span className="flex-grow font-medium">
          <HighlightText text={item.title} searchTerm={searchQuery} />
        </span>
      </div>

      {/* Breadcrumbs and description */}
      {/* MeshiCardFragment には breadcrumbs と description がないので、関連コードをコメントアウトまたは削除 */}
      {/* <div className="ml-6 w-full max-w-[95%] overflow-hidden text-xs text-gray-500">
        {item.breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-1 flex items-center">
            {item.breadcrumbs.map((part, index, array) => (
              <React.Fragment key={index}>
                <span className="font-medium">{part}</span>
                {index < array.length - 1 && (
                  <span className="mx-1" aria-hidden="true">
                    <ChevronRight className="size-4" />
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        {item.description && (
          <p className="line-clamp-2 font-light">
            <HighlightText text={item.description} searchTerm={searchQuery} />
          </p>
        )}
      </div> */}

      {/* Last updated date */}
      {/* MeshiCardFragment には date プロパティがない。代わりに publishedDate を使用 */}
      {item.publishedDate && (
        <div className="ml-6 text-[10px] text-gray-400">
          Published: {new Date(item.publishedDate).toLocaleDateString()}
        </div>
      )}
    </Link>
  );
};
