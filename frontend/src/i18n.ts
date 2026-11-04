import { useSyncExternalStore } from "react";
import { content } from "./data/content";

export type Lang = "es" | "en";

const ui = {
  es: {
    nav: {
      about: "Sobre mí",
      skills: "Skills",
      experience: "Experiencia",
      projects: "Proyectos",
      education: "Educación",
      contact: "Contacto",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      switchLang: "Switch to English",
    },
    hero: {
      tagline: "Construyo aplicaciones full stack robustas, del frontend al backend.",
      seeProjects: "Ver proyectos",
      contactMe: "Contactame",
    },
    about: {
      eyebrow: "Quién soy",
      title: "Sobre mí",
      experience: "Experiencia",
      experienceValue: "+6 años en desarrollo de software",
      inIT: "En TI",
      inITValue: "+10 años",
      location: "Ubicación",
    },
    skills: { eyebrow: "Stack técnico", title: "Skills" },
    experience: { eyebrow: "Trayectoria", title: "Experiencia" },
    projects: { eyebrow: "Casos reales", title: "Proyectos", impact: "Impacto:" },
    education: { eyebrow: "Formación", title: "Educación" },
    contact: {
      eyebrow: "Hablemos",
      title: "Contacto",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      sending: "Enviando…",
      send: "Enviar mensaje",
      success: "¡Mensaje enviado! Te respondo pronto.",
      error: "No se pudo enviar el mensaje. Intentá de nuevo.",
    },
    loading: "Cargando recursos...",
    footer: "Construido con React, Three.js y NestJS.",
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchLang: "Cambiar a español",
    },
    hero: {
      tagline: "I build robust full stack applications, from frontend to backend.",
      seeProjects: "See projects",
      contactMe: "Contact me",
    },
    about: {
      eyebrow: "Who I am",
      title: "About me",
      experience: "Experience",
      experienceValue: "6+ years in software development",
      inIT: "In IT",
      inITValue: "10+ years",
      location: "Location",
    },
    skills: { eyebrow: "Tech stack", title: "Skills" },
    experience: { eyebrow: "Career", title: "Experience" },
    projects: { eyebrow: "Real cases", title: "Projects", impact: "Impact:" },
    education: { eyebrow: "Background", title: "Education" },
    contact: {
      eyebrow: "Let's talk",
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      sending: "Sending…",
      send: "Send message",
      success: "Message sent! I'll get back to you soon.",
      error: "The message could not be sent. Please try again.",
    },
    loading: "Loading resources...",
    footer: "Built with React, Three.js and NestJS.",
  },
} satisfies Record<Lang, unknown>;

// Global language store: no provider needed, every useT() re-renders on change.
let lang: Lang = localStorage.getItem("lang") === "en" ? "en" : "es";
document.documentElement.lang = lang;
const listeners = new Set<() => void>();

export function toggleLang() {
  lang = lang === "es" ? "en" : "es";
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useT() {
  const current = useSyncExternalStore(subscribe, () => lang);
  return { lang: current, t: ui[current], ...content[current] };
}
