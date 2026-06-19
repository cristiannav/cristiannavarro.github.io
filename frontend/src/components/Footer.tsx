import { profile } from '../data/content';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} {profile.name}. Construido con React, Three.js y NestJS.</p>
    </footer>
  );
}
