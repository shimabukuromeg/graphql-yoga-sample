"use client";

// @ts-ignore
import { useGoogleTagManager } from "@next/third-parties/google";
import { useEffect } from "react";

/**
 * ref https://github.com/vercel/next.js/discussions/53868
 */
export const GoogleTagManager = () => {
    const { init } = useGoogleTagManager();
    const gtmParams = {
        id: process.env.GOOGLE_TAG_MANAGER_ID ?? "",
    };

    useEffect(() => init(gtmParams), []);

    return null;
}
