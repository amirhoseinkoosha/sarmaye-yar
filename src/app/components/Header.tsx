export default function Header() {
  return (
    <header className="text-center">
      <div className="relative mx-auto w-fit">
        <div className="pointer-events-none absolute inset-0 -z-10 scale-150 rounded-full bg-cyan-500/20 blur-2xl" />
        <img
          src="/logo.png"
          className="relative mx-auto h-20 w-20 rounded-2xl object-contain opacity-95 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          alt="سرمایه‌یار"
          width={80}
          height={80}
        />
      </div>
      <h1 className="mt-4 bg-gradient-to-l from-cyan-200 via-white to-violet-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
        سرمایه‌یار
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        دستیار هوشمند تحلیل سرمایه‌گذاری
      </p>
    </header>
  );
}
