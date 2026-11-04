import type {
  Profile,
  SkillCategory,
  Experience,
  Project,
  Education,
} from "./types";

export const profile: Profile = {
  name: "Cristian Navarro",
  role: "Senior Full Stack Developer",
  location: "Buenos Aires — Argentina",
  github: "https://github.com/cristiannav",
  linkedin: "https://linkedin.com/in/cristian-navarro",
  summary:
    "Más de 6 años de experiencia como desarrollador Full Stack y más de 10 años en el sector de TI. Participé en múltiples proyectos de ingeniería de software creando aplicaciones propias de las compañías desde cero, y en soporte de aplicaciones sobre servidores Linux en distintos ambientes, siempre con metodologías ágiles. Analítico y detallista, orientado al dinamismo y a la gestión oportuna de procesos alineados con la estrategia del negocio.",
};

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Nest.js", "Python", "Java"],
  },
  { category: "Bases de datos", items: ["SQL Server", "MySQL"] },
  {
    category: "Sistemas operativos",
    items: ["GNU/Linux", "Debian", "Red Hat"],
  },
  {
    category: "Herramientas",
    items: [
      "Visual Studio Code",
      "IntelliJ IDEA",
      "Claude Code",
      "Postman",
      "Git",
      "Docker",
      "Jenkins",
    ],
  },
  { category: "Metodologías ágiles", items: ["Scrum", "Kanban"] },
];

export const experience: Experience[] = [
  {
    company: "Swiss Medical Group",
    role: "Desarrollador Full Stack",
    period: "Sept 2019 — Ago 2025",
    location: "CABA",
    bullets: [
      "Desarrollo de mejoras y de nuevos requerimientos en SMG Parking, app de registro de entradas/salidas de vehículos en los sanatorios.",
      "Implementación del sistema Score NEWS: mapa de camas con nivel de riesgo clínico y estado de COVID-19 para una atención más ágil.",
      "Desarrollo de sistema de detección temprana de altas médicas para optimizar recursos hospitalarios y la calidad del servicio.",
      "Desarrollo de ABM de teléfono para prestadores mediante un chatbot en WhatsApp.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Nest.js",
      "Java",
      "SQL Server",
      "Docker",
      "Jenkins",
      "Red Hat OpenShift",
    ],
  },
  {
    company: "Erictel Argentina",
    role: "Desarrollador Frontend",
    period: "Sept 2018 — May 2019",
    location: "CABA",
    bullets: [
      "Desarrollo del sistema DashPro para monitorear el uso de dispositivos IoT en el sector de la agroindustria.",
      "Instalación y virtualización LAMP para desarrollo local.",
      "Trabajo con metodologías ágiles, pruebas y documentación de soluciones.",
    ],
    stack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "jQuery", "React"],
  },
  {
    company: "Innovation Experience Israel",
    role: "Miembro de la delegación 2017",
    period: "Nov 2017",
    location: "Israel",
    bullets: [
      "Visita a la Start-Up Nation y a los principales centros de innovación del ecosistema emprendedor israelí.",
      "Visita a fondos de capital de riesgo y aceleradoras.",
    ],
    stack: ["Innovación", "Networking"],
  },
  {
    company: "GlobalLogic",
    role: "Analista de Soporte de Aplicaciones",
    period: "Nov 2015 — Mar 2017",
    location: "CABA",
    bullets: [
      "Resolución de incidentes de segundo nivel para el sector de app móvil.",
      "Soporte en servidores Red Hat 6.5 en distintos ambientes y análisis de logs.",
      "Metodologías Scrum y Kanban; documentación de soluciones.",
    ],
    stack: ["GNU/Linux", "Debian", "Red Hat", "Docker", "TCP/IP", "Jira"],
  },
  {
    company: "Sonda",
    role: "Analista de Soporte Técnico / Mesa de Ayuda",
    period: "Ene 2012 — Feb 2014",
    location: "CABA",
    bullets: [
      "Creación y administración de tickets; soporte de primer y segundo nivel, remoto y on-site.",
      "Administración de contraseñas mediante Novell y Active Directory.",
      "Diagnóstico de errores con la herramienta Process Monitor y documentación de soluciones.",
    ],
    stack: ["Windows", "Active Directory", "Novell"],
  },
];

export const projects: Project[] = [
  {
    title: "SwapStyle",
    description:
      "Aplicación de swap donde matcheas con personas que tienen prendas que te interesan y viceversa.",
    impact: "https://swapstyle-prod.vercel.app",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Nest.js",
      "PostgreSQL",
    ],
    image: "/images/swapstyle.png",
  },
  {
    title: "SMG Parking",
    description:
      "Aplicación para registrar entradas y salidas de vehículos en los sanatorios propios de la compañía.",
    impact:
      "Control centralizado y trazable del flujo vehicular en múltiples sedes.",
    stack: ["HTML5", "CSS3", "JavaScript", "Java", "SQL Server"],
    image: "/images/parking.jpg",
  },
  {
    title: "Score NEWS",
    description:
      "Mapa de camas que permite a médicos y enfermeros conocer el nivel de riesgo clínico del paciente internado y su estado de COVID-19.",
    impact: "Atención clínica más ágil y priorizada en plena pandemia.",
    stack: ["React", "Node.js", "Express.js", "SQL Server"],
    image: "/images/score-news.jpg",
  },
  {
    title: "Detección temprana de altas médicas",
    description:
      "Sistema que identifica proactivamente pacientes aptos para el alta.",
    impact:
      "Mejora de la eficiencia operativa y optimización de recursos hospitalarios.",
    stack: ["React", "Node.js", "Express.js", "SQL Server"],
    image: "/images/altas.jpg",
  },
  {
    title: "ABM de teléfono vía chatbot WhatsApp",
    description:
      "Permite a los prestadores dar de alta, modificar o eliminar su teléfono a través de un chatbot en WhatsApp.",
    impact: "Autogestión del cliente y reducción de carga operativa manual.",
    stack: ["Java", "WhatsApp API"],
    image: "/images/chatbot.jpg",
  },
];

export const education: Education[] = [
  {
    institution: "Universidad Argentina de la Empresa (UADE)",
    title: "Lic. en Gestión de Tecnología de la Información",
    period: "Mar 2019 — Actualidad",
  },
  {
    institution: "Digital House",
    title: "React",
    period: "Feb 2018 — Abr 2018",
  },
  {
    institution: "Digital House",
    title: "Desarrollo Web Full Stack",
    period: "Jul 2017 — Dic 2017",
  },
  {
    institution: "Universidad Tecnológica Nacional (UTN)",
    title: "Tecnicatura Superior en Programación",
    period: "Mar 2014 — Dic 2015",
  },
  {
    institution: "Fundación Proydesa",
    title: "Administración Avanzada en Linux",
    period: "Nov 2013 — Mar 2014",
  },
  {
    institution: "Universidad Tecnológica Nacional (UTN)",
    title: "Especialización Superior en GNU/Linux",
    period: "Mar 2011 — Dic 2011",
  },
];

// English version: only translated fields; the rest (stack, links, images) is reused from Spanish by index.
const profileEn: Profile = {
  ...profile,
  summary:
    "Over 6 years of experience as a Full Stack developer and over 10 years in the IT industry. I have taken part in multiple software engineering projects, building in-house company applications from scratch, and supporting applications on Linux servers across different environments, always using agile methodologies. Analytical and detail-oriented, focused on dynamism and timely process management aligned with business strategy.",
};

const skillCategoriesEn = [
  "Frontend",
  "Backend",
  "Databases",
  "Operating systems",
  "Tools",
  "Agile methodologies",
];

const experienceEn: Pick<Experience, "role" | "period" | "location" | "bullets">[] = [
  {
    role: "Full Stack Developer",
    period: "Sep 2019 — Aug 2025",
    location: "Buenos Aires",
    bullets: [
      "Developed improvements and new requirements for SMG Parking, an app that logs vehicle entries/exits at the company's hospitals.",
      "Implemented the Score NEWS system: a bed map showing clinical risk level and COVID-19 status for faster patient care.",
      "Developed an early medical discharge detection system to optimize hospital resources and service quality.",
      "Developed phone number management (create/update/delete) for providers through a WhatsApp chatbot.",
    ],
  },
  {
    role: "Frontend Developer",
    period: "Sep 2018 — May 2019",
    location: "Buenos Aires",
    bullets: [
      "Developed the DashPro system to monitor IoT device usage in the agribusiness sector.",
      "LAMP installation and virtualization for local development.",
      "Worked with agile methodologies, testing and solution documentation.",
    ],
  },
  {
    role: "2017 Delegation Member",
    period: "Nov 2017",
    location: "Israel",
    bullets: [
      "Visited the Start-Up Nation and the main innovation hubs of the Israeli entrepreneurial ecosystem.",
      "Visited venture capital funds and accelerators.",
    ],
  },
  {
    role: "Application Support Analyst",
    period: "Nov 2015 — Mar 2017",
    location: "Buenos Aires",
    bullets: [
      "Resolved second-level incidents for the mobile app area.",
      "Supported Red Hat 6.5 servers across different environments and performed log analysis.",
      "Scrum and Kanban methodologies; solution documentation.",
    ],
  },
  {
    role: "Technical Support / Help Desk Analyst",
    period: "Jan 2012 — Feb 2014",
    location: "Buenos Aires",
    bullets: [
      "Created and managed tickets; first and second-level support, remote and on-site.",
      "Password management through Novell and Active Directory.",
      "Error diagnosis with Process Monitor and solution documentation.",
    ],
  },
];

const projectsEn: Pick<Project, "title" | "description" | "impact">[] = [
  {
    title: "SwapStyle",
    description:
      "A swap app where you match with people who have clothes you like, and vice versa.",
    impact: "https://swapstyle-prod.vercel.app",
  },
  {
    title: "SMG Parking",
    description:
      "An application to log vehicle entries and exits at the company's own hospitals.",
    impact: "Centralized, traceable control of vehicle flow across multiple sites.",
  },
  {
    title: "Score NEWS",
    description:
      "A bed map that lets doctors and nurses see the clinical risk level of inpatients and their COVID-19 status.",
    impact: "Faster, prioritized clinical care during the pandemic.",
  },
  {
    title: "Early medical discharge detection",
    description: "A system that proactively identifies patients ready for discharge.",
    impact: "Improved operational efficiency and optimized hospital resources.",
  },
  {
    title: "Phone management via WhatsApp chatbot",
    description:
      "Lets providers add, update or remove their phone number through a WhatsApp chatbot.",
    impact: "Customer self-service and reduced manual operational workload.",
  },
];

const educationEn: Pick<Education, "title" | "period">[] = [
  { title: "B.S. in Information Technology Management", period: "Mar 2019 — Present" },
  { title: "React", period: "Feb 2018 — Apr 2018" },
  { title: "Full Stack Web Development", period: "Jul 2017 — Dec 2017" },
  { title: "Associate Degree in Programming", period: "Mar 2014 — Dec 2015" },
  { title: "Advanced Linux Administration", period: "Nov 2013 — Mar 2014" },
  { title: "Advanced Specialization in GNU/Linux", period: "Mar 2011 — Dec 2011" },
];

export const content = {
  es: { profile, skills, experience, projects, education },
  en: {
    profile: profileEn,
    skills: skills.map((s, i) => ({ ...s, category: skillCategoriesEn[i] })),
    experience: experience.map((e, i) => ({ ...e, ...experienceEn[i] })),
    projects: projects.map((p, i) => ({ ...p, ...projectsEn[i] })),
    education: education.map((e, i) => ({ ...e, ...educationEn[i] })),
  },
};
