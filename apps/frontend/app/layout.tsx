import "./globals.css";
import type { Metadata } from "next";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { FloatingButton } from "@/components/ui/floating-button";
// @ts-ignore
import { GoogleTagManager } from "@next/third-parties/google";
import { Noto_Sans_JP } from "next/font/google";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SpeedInsights } from "@vercel/speed-insights/next";

const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "飯ぴよ",
  description: "沖縄のグルメ情報を探索するサイトです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={cn("font-sans bg-background", noto.variable)}>
        <Menubar className="flex flex-row justify-between bg-white shadow-nav">
          <Link href="/">
            <div className="flex flex-row items-center">
              <Icons.logo className="mr-1 h-14 w-14" />
              <p className="text-s tracking-widest font-bold">飯ぴよ</p>
            </div>
          </Link>
          <MenubarMenu>
            <MenubarTrigger>
              <HamburgerMenuIcon className="w-6 h-6" />
            </MenubarTrigger>
            <MenubarContent>
              <Link href="/">
                <MenubarItem>Top</MenubarItem>
              </Link>

              <MenubarSeparator />
              <Link href="/members">
                <MenubarItem>Members</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {children}
        <FloatingButton />
        <SpeedInsights />
      </body>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID ?? ""} />
    </html>
  );
}
