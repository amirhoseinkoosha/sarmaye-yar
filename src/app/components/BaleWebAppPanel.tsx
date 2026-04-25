"use client";

import { useEffect, useMemo, useState } from "react";

type BaleUser = {
  id?: number | string;
  first_name?: string;
  username?: string;
};

type BaleWebApp = {
  initDataUnsafe?: {
    user?: BaleUser;
  };
  SettingsButton?: {
    show: () => void;
  };
  onEvent?: (eventName: string, handler: (event?: unknown) => void) => void;
  close?: () => void;
  requestContact?: (callback?: (wasShared: boolean) => void) => void;
  isClosingConfirmationEnabled?: boolean;
  enableClosingConfirmation?: () => void;
  disableClosingConfirmation?: () => void;
  expand?: () => void;
  setHeaderColor?: (color: string) => void;
};

type BaleWindow = Window & {
  Bale?: {
    WebApp?: BaleWebApp;
  };
};

export default function BaleWebAppPanel() {
  const [logs, setLogs] = useState<string[]>([]);
  const [closingConfirmationEnabled, setClosingConfirmationEnabled] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }
      return !!(window as BaleWindow).Bale?.WebApp?.isClosingConfirmationEnabled;
    });

  const webApp = useMemo(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    return (window as BaleWindow).Bale?.WebApp;
  }, []);

  const addLog = (message: string) => {
    setLogs((prev) => [message, ...prev].slice(0, 8));
  };

  const user = webApp?.initDataUnsafe?.user ?? null;

  useEffect(() => {
    if (!webApp) {
      return;
    }

    // Match Bale header with the mini-app primary background color.
    webApp.setHeaderColor?.("#050812");
    webApp.SettingsButton?.show();

    webApp.onEvent?.("settingsButtonPressed", () => {
      addLog("Settings button pressed.");
    });

    webApp.onEvent?.("contactRequested", (event) => {
      const payload =
        typeof event === "object" && event !== null
          ? (event as { status?: string })
          : undefined;
      const wasShared = payload?.status === "sent";
      addLog(wasShared ? "Number shared by user." : "Number not shared.");
    });
  }, [webApp]);

  const onCloseMiniApp = () => {
    if (!webApp) {
      return;
    }
    webApp.close?.();
  };

  const onRequestContact = () => {
    if (!webApp) {
      return;
    }

    webApp.requestContact?.((wasShared) => {
      addLog(
        wasShared ? "Callback: Number shared by user." : "Callback: No number."
      );
    });
  };

  const onToggleClosingConfirmation = () => {
    if (!webApp) {
      return;
    }

    const isEnabled = !!webApp.isClosingConfirmationEnabled;
    if (isEnabled) {
      webApp.disableClosingConfirmation?.();
      setClosingConfirmationEnabled(false);
      addLog("Closing confirmation disabled.");
      return;
    }

    webApp.enableClosingConfirmation?.();
    setClosingConfirmationEnabled(true);
    addLog("Closing confirmation enabled.");
  };

  const onExpand = () => {
    if (!webApp) {
      return;
    }

    webApp.expand?.();
  };

  return (
    <section className="card-elevated mt-6 rounded-2xl p-4">
      <h2 className="text-base font-semibold">Bale WebApp Demo</h2>

      {!webApp ? (
        <p className="mt-3 text-sm text-slate-300">
          Bale WebApp object not available. Open this page inside Bale Mini App
          to test.
        </p>
      ) : (
        <>
          <div className="mt-3 rounded-xl bg-slate-900/60 p-3 text-sm leading-7 text-slate-100">
            <div>ID: {user?.id ?? "-"}</div>
            <div>First Name: {user?.first_name ?? "-"}</div>
            <div>Username: {user?.username ?? "-"}</div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <button className="btn-glass rounded-xl px-3 py-2" onClick={onCloseMiniApp}>
              Close
            </button>
            <button className="btn-glass rounded-xl px-3 py-2" onClick={onExpand}>
              Expand
            </button>
            <button
              className="btn-glass col-span-2 rounded-xl px-3 py-2"
              onClick={onToggleClosingConfirmation}
            >
              {closingConfirmationEnabled
                ? "Disable closing confirmation"
                : "Enable closing confirmation"}
            </button>
            <button
              className="btn-glass col-span-2 rounded-xl px-3 py-2"
              onClick={onRequestContact}
            >
              Request contact
            </button>
          </div>

          {logs.length > 0 && (
            <div className="mt-4 rounded-xl bg-black/25 p-3 text-xs text-slate-300">
              {logs.map((item, index) => (
                <p key={`${item}-${index}`}>- {item}</p>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
