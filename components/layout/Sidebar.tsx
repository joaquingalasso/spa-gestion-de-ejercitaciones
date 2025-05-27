
import React from 'react';
import { Exercise } from '../../types';
import { PlusIcon, DocumentTextIcon, ClipboardListIcon, LightBulbIcon, TrashIcon } from '../icons/IconComponents';

interface SidebarProps {
  exercises: Exercise[];
  selectedExerciseId: string | null;
  onSelectExercise: (id: string) => void;
  onAddNewExercise: () => void;
  onDeleteExercise: (id: string) => void;
}

const getExerciseIcon = (type: Exercise['type']) => {
  switch (type) {
    case 'EISENHOWER':
      return <ClipboardListIcon className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />;
    case 'FODA':
      return <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0" />;
    case 'GENERAL':
    default:
      return <DocumentTextIcon className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ exercises, selectedExerciseId, onSelectExercise, onAddNewExercise, onDeleteExercise }) => {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg p-4 md:p-6 space-y-4 h-auto md:max-h-[calc(100vh-200px)] md:overflow-y-auto mb-6 md:mb-0">
      <div className="flex justify-between items-center border-b-2 border-accentGold pb-2">
        <h2 className="text-xl font-semibold text-unlpBlue">Ejercitaciones</h2>
        <button 
            onClick={onAddNewExercise}
            className="md:hidden text-sm text-sustainableGreen hover:text-green-700 font-semibold flex items-center p-1 rounded hover:bg-green-100"
            title="Crear nueva ejercitación"
          >
            <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      {exercises.length === 0 ? (
         <div className="text-center text-gray-500 py-4">
          <p>No hay ejercitaciones.</p>
          <button 
            onClick={onAddNewExercise}
            className="mt-2 text-sm text-sustainableGreen hover:text-green-700 font-semibold flex items-center justify-center mx-auto"
          >
            <PlusIcon className="h-4 w-4 mr-1" /> Crear una nueva
          </button>
        </div>
      ) : (
        <nav>
          <ul className="space-y-2">
            {exercises.map(exercise => (
              <li key={exercise.id} className="flex items-stretch group"> {/* Use items-stretch if icon height is an issue */}
                <button
                  onClick={() => onSelectExercise(exercise.id)}
                  className={`flex-grow text-left px-3 py-3 rounded-l-lg transition-all duration-150 ease-in-out flex items-start md:items-center
                              ${selectedExerciseId === exercise.id 
                                ? 'bg-unlpBlue text-white shadow-md' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-unlpBlue'}`}
                  aria-current={selectedExerciseId === exercise.id ? "page" : undefined}
                >
                  <div className="flex-shrink-0 mt-0.5 md:mt-0"> {/* Ensure icon aligns well with multi-line text */}
                    {getExerciseIcon(exercise.type)}
                  </div>
                  <span className="break-words whitespace-normal text-sm ml-2">{exercise.title}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent li click from triggering select
                    onDeleteExercise(exercise.id);
                  }}
                  title={`Eliminar "${exercise.title}"`}
                  className={`p-3 rounded-r-lg transition-all duration-150 ease-in-out flex items-center justify-center 
                              ${selectedExerciseId === exercise.id 
                                ? 'bg-unlpBlue text-red-300 hover:text-red-100 hover:bg-red-700' 
                                : 'bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white group-hover:bg-gray-200'}`}
                >
                  <TrashIcon className="h-5 w-5 flex-shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
};
