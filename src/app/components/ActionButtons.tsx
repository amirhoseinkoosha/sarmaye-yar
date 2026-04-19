import Link from "next/link";

const actions: { href: string; label: string; disabled?: boolean }[] = [
  { href: "/symbol/فولاد", label: "تحلیل نماد" },
  { href: "/market", label: "روند بازار" },
  { href: "/portfolio", label: "پرتفوی من" },
  { href: "#", label: "سؤال از ربات", disabled: true },
];

export default function ActionButtons() {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {actions.map(({ href, label, disabled }) =>
        disabled ? (
          <span
            key={label}
            className="btn-glass cursor-not-allowed rounded-2xl py-3.5 text-center text-sm text-slate-500 opacity-60"
          >
            {label}
          </span>
        ) : (
          <Link
            key={href}
            href={href}
            className="btn-glass rounded-2xl py-3.5 text-center text-sm font-medium text-slate-100"
          >
            {label}
          </Link>
        ),
      )}
    </div>
  );
}
