"use client";

import { useEffect, useState } from "react";

export default function BaleWebAppPanel() {
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    const w = typeof window !== "undefined" ? window : null;
    // @ts-ignore: Ignore missing Bale property on window
    const sdk = (w && (w as any).Bale?.WebApp) || null;

    if (!sdk) {
      console.log("Bale SDK not found (normal outside the Bale app)");
      return;
    }

    // attach
    setWebApp(sdk);
    sdk.ready();
    sdk.expand();
    sdk.setHeaderColor?.("#050812");
    sdk.SettingsButton?.show();
  }, []);

  if (!webApp) {
    return (
      <div className="text-center text-gray-500 text-sm p-4">
        در حال اجرا خارج از بله (SDK در دسترس نیست)
      </div>
    );
  }

  return (
    <div className="p-4">
      <strong>MiniApp Connected ✓</strong>
    </div>
  );
}
