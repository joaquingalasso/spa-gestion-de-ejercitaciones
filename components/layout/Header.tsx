
import React from 'react';
import { PdfIcon, PlusIcon } from '../icons/IconComponents';

interface HeaderProps {
  courseTitle: string;
  userName: string;
  userOrganization: string;
  onExportAllPdf: () => void;
  onAddNewExercise: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  courseTitle,
  userName,
  userOrganization,
  onExportAllPdf,
  onAddNewExercise
}) => {
  return (
    <header className="bg-unlpBlue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{courseTitle}</h1>
            <p className="text-sm sm:text-base text-blue-200">{userName} - {userOrganization}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onAddNewExercise}
              className="bg-sustainableGreen hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center space-x-2 text-sm sm:text-base"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Nueva Ejercitación</span>
            </button>
            <button
              onClick={onExportAllPdf}
              className="bg-accentGold hover:bg-yellow-600 text-unlpBlue font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center space-x-2 text-sm sm:text-base"
            >
              <PdfIcon className="h-5 w-5" />
              <span>Exportar Todo a PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
