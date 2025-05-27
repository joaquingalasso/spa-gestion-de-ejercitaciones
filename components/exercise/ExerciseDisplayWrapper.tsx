
import React, { useState, useEffect } from 'react';
import { Exercise, ResolutionContent, ExerciseType } from '../../types';
import { GenericDisplay } from './common/GenericDisplay';
import { GenericEditor } from './common/GenericEditor';
import { EisenhowerDisplay } from './eisenhower/EisenhowerDisplay';
import { EisenhowerEditor } from './eisenhower/EisenhowerEditor';
import { FodaDisplay } from './foda/FodaDisplay';
import { FodaEditor } from './foda/FodaEditor';
import { SaveIcon, EditIcon, EyeIcon, MarkdownIcon, CheckCircleIcon } from '../icons/IconComponents';

interface ExerciseDisplayWrapperProps {
  exercise: Exercise;
  onSaveResolution: (id: string, resolution: ResolutionContent) => void;
  onExportMarkdown: (exercise: Exercise) => void;
}

export const ExerciseDisplayWrapper: React.FC<ExerciseDisplayWrapperProps> = ({ exercise, onSaveResolution, onExportMarkdown }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentResolution, setCurrentResolution] = useState<ResolutionContent>(exercise.resolution);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  // Reset local state when exercise changes
  useEffect(() => {
    setCurrentResolution(exercise.resolution);
    setIsEditing(false); // Default to view mode when exercise changes
  }, [exercise]);

  const handleSave = () => {
    onSaveResolution(exercise.id, currentResolution);
    setIsEditing(false);
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 2000);
  };

  const handleCancelEdit = () => {
    setCurrentResolution(exercise.resolution); // Revert to original resolution
    setIsEditing(false);
  };

  const isResolutionChanged = JSON.stringify(currentResolution) !== JSON.stringify(exercise.resolution);

  const renderDisplayMode = () => {
    switch (exercise.type) {
      case ExerciseType.EISENHOWER:
        return <EisenhowerDisplay resolution={currentResolution.eisenhower} />;
      case ExerciseType.FODA:
        return <FodaDisplay resolution={currentResolution.foda} />;
      case ExerciseType.GENERAL:
      default:
        return <GenericDisplay resolution={currentResolution.general} />;
    }
  };

  const renderEditMode = () => {
    switch (exercise.type) {
      case ExerciseType.EISENHOWER:
        return <EisenhowerEditor resolution={currentResolution.eisenhower} onChange={(res) => setCurrentResolution({ ...currentResolution, eisenhower: res })} />;
      case ExerciseType.FODA:
        return <FodaEditor resolution={currentResolution.foda} onChange={(res) => setCurrentResolution({ ...currentResolution, foda: res })} />;
      case ExerciseType.GENERAL:
      default:
        return <GenericEditor resolution={currentResolution.general} onChange={(res) => setCurrentResolution({ ...currentResolution, general: res })} />;
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-start border-b-2 border-gray-200 pb-4">
        <div>
            <h2 className="text-2xl font-bold text-unlpBlue mb-1">{exercise.title}</h2>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                exercise.type === ExerciseType.FODA ? 'bg-yellow-100 text-yellow-700' :
                exercise.type === ExerciseType.EISENHOWER ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
            }`}>
                {exercise.type === ExerciseType.FODA ? 'Análisis FODA' : exercise.type === ExerciseType.EISENHOWER ? 'Matriz Plazos/Importancia' : 'General'}
            </span>
        </div>
        <div className="flex space-x-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-md transition-colors ${isEditing ? 'bg-gray-200 hover:bg-gray-300' : 'bg-yellow-400 hover:bg-yellow-500 text-white'}`}
            title={isEditing ? "Ver Resolución" : "Editar Resolución"}
          >
            {isEditing ? <EyeIcon className="h-5 w-5" /> : <EditIcon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => onExportMarkdown(exercise)}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            title="Exportar a Markdown"
          >
            <MarkdownIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md shadow-inner">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Consigna:</h3>
        <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">{exercise.prompt}</div>
      </div>
      
      <div className="flex-grow min-h-[200px]">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            Tu Resolución
            {showSavedMessage && <CheckCircleIcon className="h-5 w-5 text-sustainableGreen ml-2" />}
            {showSavedMessage && <span className="text-sm text-sustainableGreen ml-1">Guardado!</span>}
        </h3>
        {isEditing ? renderEditMode() : renderDisplayMode()}
      </div>

      {isEditing && (
        <div className="mt-auto pt-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={handleCancelEdit}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!isResolutionChanged}
            className="px-4 py-2 text-sm font-medium text-white bg-sustainableGreen hover:bg-green-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <SaveIcon className="h-4 w-4 mr-2" /> Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
};
