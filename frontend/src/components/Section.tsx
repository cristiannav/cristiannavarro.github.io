import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}

export function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        {eyebrow && <p className="mb-2 text-sm font-medium uppercase tracking-widest text-neon-cyan">{eyebrow}</p>}
        <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
