
import { Exercise, ExerciseType, ResolutionContent } from '../types';
import { APP_CONSTANTS, getDefaultResolution } from '../constants';

const STORAGE_KEY = 'cursoTallerEjercitaciones2025JoaquinGalasso';

export const loadExercisesFromStorage = (): Exercise[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData) as Exercise[];
      // Ensure data integrity and add default resolutions if missing
      return parsedData.map(ex => ({
        ...ex,
        resolution: ex.resolution || getDefaultResolution(ex.type),
        // Ensure type is valid, default to GENERAL if not
        type: Object.values(ExerciseType).includes(ex.type) ? ex.type : ExerciseType.GENERAL,
      }));
    }
  } catch (error) {
    console.error("Error loading exercises from localStorage:", error);
    // Fallback to initial data if parsing fails or no data
  }
  return APP_CONSTANTS.initialExercises.map(ex => ({
      ...ex,
      resolution: ex.resolution || getDefaultResolution(ex.type)
  }));
};

export const saveExercisesToStorage = (exercises: Exercise[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  } catch (error) {
    console.error("Error saving exercises to localStorage:", error);
    alert("Hubo un error al guardar los datos. Es posible que el almacenamiento local esté lleno.");
  }
};
