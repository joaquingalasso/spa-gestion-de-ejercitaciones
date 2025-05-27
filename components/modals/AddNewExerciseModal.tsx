
import React, { useState } from 'react';
import { ExerciseType } from '../../types';
import { XIcon } from '../icons/IconComponents';

interface AddNewExerciseModalProps {
  onClose: () => void;
  onAddExercise: (title: string, prompt: string, type: ExerciseType) => void;
}

export const AddNewExerciseModal: React.FC<AddNewExerciseModalProps> = ({ onClose, onAddExercise }) => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<ExerciseType>(ExerciseType.GENERAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && prompt.trim()) {
      onAddExercise(title, prompt, type);
    } else {
        alert("Por favor, completa el título y la consigna.")
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4 transform transition-all scale-100 opacity-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-unlpBlue">Nueva Ejercitación</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ex-title" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="ex-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-unlpBlue focus:border-unlpBlue sm:text-sm text-gray-900 placeholder-gray-400"
              placeholder="Ej: Análisis de Stakeholders"
              required
            />
          </div>
          <div>
            <label htmlFor="ex-prompt" className="block text-sm font-medium text-gray-700">Consigna</label>
            <textarea
              id="ex-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-unlpBlue focus:border-unlpBlue sm:text-sm text-gray-900 placeholder-gray-400"
              placeholder="Describe la tarea o pregunta para esta ejercitación..."
              required
            />
          </div>
          <div>
            <label htmlFor="ex-type" className="block text-sm font-medium text-gray-700">Tipo de Ejercitación</label>
            <select
              id="ex-type"
              value={type}
              onChange={(e) => setType(e.target.value as ExerciseType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 bg-white text-gray-900 text-base border-gray-300 focus:outline-none focus:ring-unlpBlue focus:border-unlpBlue sm:text-sm rounded-md"
            >
              <option value={ExerciseType.GENERAL}>General (Texto/Markdown)</option>
              <option value={ExerciseType.EISENHOWER}>Matriz Plazos/Importancia</option>
              <option value={ExerciseType.FODA}>Análisis FODA</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-sustainableGreen hover:bg-green-600 rounded-md"
            >
              Agregar Ejercitación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
