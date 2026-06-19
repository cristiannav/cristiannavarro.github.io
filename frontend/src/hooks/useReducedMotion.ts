import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  // Lee el valor inicial de forma perezosa para no llamar a setState
  // sincrónicamente dentro del efecto (evita renders en cascada).
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
