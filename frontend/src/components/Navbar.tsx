import { useState } from "react";
import { toggleLang, useT } from "../i18n";

const sections = ["about", "skills", "experience", "projects", "education", "contact"] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { lang, t } = useT();
  const links = sections.map((id) => ({ href: `#${id}`, label: t.nav[id] }));

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          onClick={close}
          className="text-lg font-bold text-gradient"
        >
          CN
        </a>

        {/* Navegación de escritorio */}
        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-300 transition hover:text-neon-cyan"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
        {/* Selector de idioma */}
        <button
          type="button"
          onClick={toggleLang}
          aria-label={t.nav.switchLang}
          title={t.nav.switchLang}
          className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-neon-cyan/50 hover:text-neon-cyan"
        >
          {lang === "es" ? "EN" : "ES"}
        </button>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 transition hover:text-neon-cyan md:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
        </div>
      </nav>

      {/* Panel de navegación móvil */}
      {open && (
        <div id="mobile-menu" className="border-t border-white/10 md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="block rounded-lg px-2 py-2 text-slate-300 transition hover:bg-white/5 hover:text-neon-cyan"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
