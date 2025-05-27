
import React from 'react';
import { XIcon, TrashIcon, ShieldExclamationIcon } from '../icons/IconComponents';

interface ConfirmDeleteModalProps {
  exerciseTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ exerciseTitle, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[100]" role="alertdialog" aria-modal="true" aria-labelledby="confirm-delete-title" aria-describedby="confirm-delete-description">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-4 transform transition-all scale-100 opacity-100">
        <div className="flex justify-between items-center">
          <h2 id="confirm-delete-title" className="text-xl font-semibold text-red-600 flex items-center">
            <ShieldExclamationIcon className="h-6 w-6 mr-2 text-red-500" />
            Confirmar Eliminación
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Cerrar">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div id="confirm-delete-description" className="text-gray-700 space-y-2">
          <p>¿Estás seguro de que quieres eliminar la ejercitación titulada:</p>
          <p className="font-semibold text-unlpBlue">"{exerciseTitle}"?</p>
          <p className="text-sm text-red-500">Esta acción no se puede deshacer.</p>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center"
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
