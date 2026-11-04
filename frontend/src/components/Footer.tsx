import { useT } from '../i18n';

export function Footer() {
  const { t, profile } = useT();
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} {profile.name}. {t.footer}</p>
    </footer>
  );
}
