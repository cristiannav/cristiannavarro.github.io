import type { Profile, SkillCategory, Experience, Project, Education } from './types';

export const profile: Profile = {
  name: 'Cristian Navarro',
  role: 'Senior Software Engineer',
  location: 'Buenos Aires — Argentina',
  github: 'https://github.com/cristiannav',
  linkedin: 'https://linkedin.com/in/cristian-navarro',
  summary:
    'Más de 6 años de experiencia como ingeniero de software y más de 10 años en el sector de TI. Participé en múltiples proyectos de ingeniería de software creando aplicaciones propias de las compañías desde cero, y en soporte de aplicaciones sobre servidores Linux en distintos ambientes, siempre con metodologías ágiles. Analítico y detallista, orientado al dinamismo y a la gestión oportuna de procesos alineados con la estrategia del negocio.',
};

export const skills: SkillCategory[] = [
  { category: 'Frontend', items: ['HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'TypeScript', 'React'] },
  { category: 'Backend', items: ['Node JS', 'Express JS', 'Nest JS', 'Python', 'Java'] },
  { category: 'Bases de datos', items: ['SQL Server', 'MySQL'] },
  { category: 'Sistemas operativos', items: ['GNU/Linux', 'Debian', 'Red Hat'] },
  { category: 'Herramientas', items: ['Visual Studio Code', 'IntelliJ IDEA', 'Claude Code', 'Postman', 'Git', 'Docker', 'Jenkins'] },
];

export const experience: Experience[] = [
  {
    company: 'Swiss Medical Group',
    role: 'Desarrollador Full Stack',
    period: 'Sept 2019 — Ago 2025',
    location: 'CABA',
    bullets: [
      'Mejoras y nuevos requerimientos en SMG Parking, app de registro de entradas/salidas de vehículos en los sanatorios.',
      'Implementación del sistema Score NEWS: mapa de camas con nivel de riesgo clínico y estado COVID-19 para una atención más ágil.',
      'Sistema de detección temprana de altas médicas para optimizar recursos hospitalarios y la calidad del servicio.',
      'ABM de teléfono para prestadores mediante un chatbot en WhatsApp.',
    ],
    stack: ['React', 'TypeScript', 'Node JS', 'Express JS', 'Nest JS', 'Java', 'SQL Server', 'Docker', 'Jenkins', 'Red Hat OpenShift'],
  },
  {
    company: 'Erictel Argentina',
    role: 'Desarrollador Front End',
    period: 'Sept 2018 — May 2019',
    location: 'CABA',
    bullets: [
      'Desarrollo del sistema DashPro para monitorear el uso de dispositivos IoT en el sector de la agroindustria.',
      'Instalación y virtualización LAMP para desarrollo local.',
      'Trabajo con metodologías ágiles, pruebas y documentación de soluciones.',
    ],
    stack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'jQuery', 'React'],
  },
  {
    company: 'Innovation Experience Israel',
    role: 'Miembro de la delegación 2017',
    period: 'Nov 2017',
    location: 'Israel',
    bullets: [
      'Visita a la Start-Up Nation y a los principales centros de innovación del ecosistema emprendedor israelí.',
      'Visita a fondos de capital de riesgo y aceleradoras.',
    ],
    stack: ['Innovación', 'Networking'],
  },
  {
    company: 'GlobalLogic',
    role: 'Analista de Soporte de Aplicaciones',
    period: 'Nov 2015 — Mar 2017',
    location: 'CABA',
    bullets: [
      'Resolución de incidentes de segundo nivel para el sector de app móvil.',
      'Soporte en servidores Red Hat 6.5 en distintos ambientes y análisis de logs.',
      'Metodologías Scrum y Kanban; documentación de soluciones.',
    ],
    stack: ['GNU/Linux','Debian', 'Red Hat', 'Docker', 'TCP/IP', 'Jira'],
  },
  {
    company: 'Sonda',
    role: 'Analista de Soporte Técnico / Mesa de Ayuda',
    period: 'Ene 2012 — Feb 2014',
    location: 'CABA',
    bullets: [
      'Creación y administración de tickets; soporte de primer y segundo nivel, remoto y on-site.',
      'Administración de contraseñas mediante Novell y Active Directory.',
      'Diagnóstico de errores con la herramienta Process Monitor y documentación de soluciones.',
    ],
    stack: ['Windows', 'Active Directory', 'Novell'],
  },
];

export const projects: Project[] = [
  {
    title: 'SMG Parking',
    description: 'Aplicación para registrar entradas y salidas de vehículos en los sanatorios propios de la compañía.',
    impact: 'Control centralizado y trazable del flujo vehicular en múltiples sedes.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Java', 'SQL Server'],
    image: '/images/parking.jpg',
  },
  {
    title: 'Score NEWS',
    description: 'Mapa de camas que permite a médicos y enfermeros conocer el nivel de riesgo clínico del paciente internado y su estado COVID-19.',
    impact: 'Atención clínica más ágil y priorizada en plena pandemia.',
    stack: ['React', 'Node JS', 'Express JS', 'SQL Server'],
    image: '/images/score-news.jpg',
  },
  {
    title: 'Detección temprana de altas médicas',
    description: 'Sistema que identifica proactivamente pacientes aptos para el alta.',
    impact: 'Mejora de la eficiencia operativa y optimización de recursos hospitalarios.',
    stack: ['React', 'Node JS', 'Express JS', 'SQL Server'],
    image: '/images/altas.jpg',
  },
  {
    title: 'ABM de teléfono vía chatbot WhatsApp',
    description: 'Permite a los prestadores dar de alta, modificar o eliminar su teléfono a través de un chatbot en WhatsApp.',
    impact: 'Autogestión del cliente y reducción de carga operativa manual.',
    stack: ['Java', 'WhatsApp API'],
    image: '/images/chatbot.jpg',
  },
];

export const education: Education[] = [
  { institution: 'Universidad Argentina de la Empresa (UADE)', title: 'Lic. en Gestión de Tecnología de la Información', period: 'Mar 2019 — Actualidad' },
  { institution: 'Digital House', title: 'React JS', period: 'Feb 2018 — Abr 2018' },
  { institution: 'Digital House', title: 'Desarrollo Web Full Stack', period: 'Jul 2017 — Dic 2017' },
  { institution: 'Universidad Tecnológica Nacional (UTN)', title: 'Tecnicatura Superior en Programación', period: 'Mar 2014 — Dic 2015' },
  { institution: 'Academia Proydesa', title: 'Administración Avanzada en Linux', period: 'Nov 2013 — Mar 2014' },
  { institution: 'Universidad Tecnológica Nacional (UTN)', title: 'Especialización Superior en GNU/Linux', period: 'Mar 2011 — Dic 2011' },
];
