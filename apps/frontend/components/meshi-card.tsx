import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FragmentType, graphql, useFragment } from "@/src/gql";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import Image from "next/image";

export const MeshiCardFragment = graphql(`
  fragment MeshiCard on Meshi {
    id
    imageUrl
    siteUrl
    title
    storeName
    publishedDate
    createdAt
    municipality {
      id
      name
    }
  }
`);

type Props = {
  meshi: FragmentType<typeof MeshiCardFragment>;
  isEager?: boolean;
};

export const MeshiCard = (props: Props) => {
  const meshi = useFragment(MeshiCardFragment, props.meshi);

  return (
    <Link id="meshi" target="_blank" href={meshi.siteUrl} key={meshi.id}>
      <Card className="p-2 max-w-[300px]">
        <CardContent className="p-0">
          <Image
            className="h-auto max-w-full rounded-lg"
            width={300}
            height={300}
            src={meshi.imageUrl}
            alt=""
            loading={props.isEager ? "eager" : "lazy"}
          />
          <div className="flex flex-row flex-wrap gap-1 pt-2">
            <div className="px-2 py-1 rounded-xl text-[10px] text-white w-fit bg-primary">
              {meshi.municipality?.name}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-1">
          <p className="font-bold line-clamp-3">{meshi.title}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
