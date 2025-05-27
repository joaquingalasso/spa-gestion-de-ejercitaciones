
export enum ExerciseType {
  GENERAL = 'GENERAL',
  EISENHOWER = 'EISENHOWER',
  FODA = 'FODA',
}

export interface EisenhowerQuadrantContent {
  importantUrgent: string;
  importantNotUrgent: string;
  notImportantUrgent: string;
  notImportantNotUrgent: string;
}

export interface FodaQuadrantContent {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface ResolutionContent {
  general?: string;
  eisenhower?: EisenhowerQuadrantContent;
  foda?: FodaQuadrantContent;
}

export interface Exercise {
  id: string;
  title: string;
  prompt: string;
  type: ExerciseType;
  resolution: ResolutionContent;
}

export interface TeacherInfo {
  name: string;
  profiles: { platform: string; url: string }[];
  contact: string;
}

export interface AppConstants {
  courseTitle: string;
  userName: string;
  userOrganization: string;
  teacherInfo: TeacherInfo;
  organizingInstitutions: string[];
  initialExercises: Exercise[];
}
