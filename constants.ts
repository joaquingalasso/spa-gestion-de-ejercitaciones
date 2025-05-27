
import { AppConstants, ExerciseType, TeacherInfo, Exercise, ResolutionContent } from './types';

export const getDefaultResolution = (type: ExerciseType): ResolutionContent => {
  switch (type) {
    case ExerciseType.EISENHOWER:
      return { eisenhower: { importantUrgent: '', importantNotUrgent: '', notImportantUrgent: '', notImportantNotUrgent: '' } };
    case ExerciseType.FODA:
      return { foda: { strengths: '', weaknesses: '', opportunities: '', threats: '' } };
    case ExerciseType.GENERAL:
    default:
      return { general: '' };
  }
};


const INITIAL_EXERCISES_DATA: Omit<Exercise, 'resolution'>[] = [
  {
    id: 'ejercicio-1-plazos-importancia',
    title: "Ejercitación Grupal y Participativa Ejercicio N°1: Plazos e Importancia",
    prompt: "Plazos (tiempos): corto, mediano, largo. Importancia: lo urgente vs. lo importante. Ámbito de la improvisación: → el corto plazo y lo urgente. Ámbito de la estrategia: → el largo plazo y lo importante.",
    type: ExerciseType.EISENHOWER,
  },
  {
    id: 'ejercicio-2-foda',
    title: "Ejercitación Grupal y Participativa Ejercicio N°2: Análisis F.O.D.A.",
    prompt: "Análisis F.O.D.A. Fortalezas y Oportunidades Debilidades y Amenazas. Para evaluar la situación actual en un momento determinado es necesario que consideremos tanto el ambiente externo como el ambiente interno. El análisis FODA es una herramienta estratégica que se utiliza para evaluar la situación presente. Identifica amenazas y oportunidades que surgen del ámbito externo (mercado, ambiente, social, económico, tecnológico …), y debilidades y fortalezas que poseen en el ámbito interno a la organización. Fortalezas y Debilidades: análisis interno. Oportunidades y Amenazas: análisis externo. Análisis interno (al emprendimiento, a la organización): Fortalezas, Debilidades. Análisis externo (al emprendimiento, a la organización): Oportunidades, Amenazas. Análisis FODA: Identificar las 3 principales Fortalezas, Oportunidades, Debilidades y Amenazas.",
    type: ExerciseType.FODA,
  },
  {
    id: 'ejercicio-3-general-example',
    title: "Ejemplo de Ejercicio General",
    prompt: "Este es un ejemplo de una consigna para un ejercicio de tipo general. Puedes escribir tu resolución en formato Markdown.",
    type: ExerciseType.GENERAL,
  }
];

export const APP_CONSTANTS: AppConstants = {
  courseTitle: "Curso Taller 2025 Sociedad Civil y Gestión para el Desarrollo Sostenible",
  userName: "Joaquín Galasso",
  userOrganization: "Biblioteca-Escuela Euforión",
  teacherInfo: {
    name: "Ing. Agr. Mg. Martín Lázzaro",
    profiles: [
      { platform: "LinkedIn", url: "#" }, // Replace # with actual URLs
      { platform: "ResearchGate", url: "#" },
    ],
    contact: "Correo: martin.lazzaro@example.com", // Replace with actual contact
  },
  organizingInstitutions: ["UNLP", "Otra Institución"], // Example
  initialExercises: INITIAL_EXERCISES_DATA.map(ex => ({
    ...ex,
    resolution: getDefaultResolution(ex.type)
  })),
};
