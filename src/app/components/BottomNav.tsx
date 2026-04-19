"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "خانه" },
  { href: "/market", label: "بازار" },
  { href: "/portfolio", label: "پرتفوی" },
  { href: "/symbol/فولاد", label: "نماد" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#060b14]/90 py-2 backdrop-blur-xl"
      aria-label="ناوبری اصلی"
    >
      <div className="mx-auto flex max-w-2xl items-stretch justify-between gap-1 px-2">
        {items.map(({ href, label }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : label === "نماد"
                ? pathname.startsWith("/symbol/")
                : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-11 flex-1 items-center justify-center rounded-xl text-xs font-medium transition ${
                active
                  ? "bg-cyan-500/15 text-cyan-200 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.25)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
