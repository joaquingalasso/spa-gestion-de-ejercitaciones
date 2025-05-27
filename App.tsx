
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Sidebar } from './components/layout/Sidebar';
import { ExerciseDisplayWrapper } from './components/exercise/ExerciseDisplayWrapper';
import { AddNewExerciseModal } from './components/modals/AddNewExerciseModal';
import { ConfirmDeleteModal } from './components/modals/ConfirmDeleteModal';
import { Exercise, ExerciseType, ResolutionContent } from './types';
import { APP_CONSTANTS, getDefaultResolution } from './constants';
import { loadExercisesFromStorage, saveExercisesToStorage } from './services/storageService';
import { exportAllExercisesToPdf, exportExerciseToMarkdown } from './services/exportService';
import { PlusIcon } from './components/icons/IconComponents';

const App: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{ isOpen: boolean, exerciseId: string | null, exerciseTitle: string | null }>({ isOpen: false, exerciseId: null, exerciseTitle: null });

  useEffect(() => {
    const loadedExercises = loadExercisesFromStorage();
    setExercises(loadedExercises);
    if (loadedExercises.length > 0) {
      setSelectedExerciseId(loadedExercises[0].id);
    }
    setIsLoading(false);
  }, []);

  const handleSaveExercises = useCallback((updatedExercises: Exercise[]) => {
    setExercises(updatedExercises);
    saveExercisesToStorage(updatedExercises);
  }, []);

  const handleSelectExercise = (id: string) => {
    setSelectedExerciseId(id);
  };

  const handleSaveResolution = (id: string, resolution: ResolutionContent) => {
    const updatedExercises = exercises.map(ex =>
      ex.id === id ? { ...ex, resolution } : ex
    );
    handleSaveExercises(updatedExercises);
  };

  const handleAddNewExercise = (title: string, prompt: string, type: ExerciseType) => {
    const newExercise: Exercise = {
      id: `exercise-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title,
      prompt,
      type,
      resolution: getDefaultResolution(type),
    };
    const updatedExercises = [...exercises, newExercise];
    handleSaveExercises(updatedExercises);
    setSelectedExerciseId(newExercise.id); 
    setIsAddModalOpen(false);
  };

  const handleOpenDeleteConfirmModal = (id: string) => {
    const exerciseToDelete = exercises.find(ex => ex.id === id);
    if (exerciseToDelete) {
      setDeleteConfirmModal({ isOpen: true, exerciseId: id, exerciseTitle: exerciseToDelete.title });
    }
  };

  const handleCloseDeleteConfirmModal = () => {
    setDeleteConfirmModal({ isOpen: false, exerciseId: null, exerciseTitle: null });
  };

  const handleConfirmDeleteExercise = () => {
    if (deleteConfirmModal.exerciseId) {
      const updatedExercises = exercises.filter(ex => ex.id !== deleteConfirmModal.exerciseId);
      handleSaveExercises(updatedExercises);

      if (selectedExerciseId === deleteConfirmModal.exerciseId) {
        setSelectedExerciseId(updatedExercises.length > 0 ? updatedExercises[0].id : null);
      }
    }
    handleCloseDeleteConfirmModal();
  };


  const currentExercise = exercises.find(ex => ex.id === selectedExerciseId);

  const handleExportAllToPdf = () => {
    if (exercises.length > 0) {
      exportAllExercisesToPdf(
        exercises,
        APP_CONSTANTS.courseTitle,
        APP_CONSTANTS.userName,
        APP_CONSTANTS.userOrganization
      );
    } else {
      alert("No hay ejercitaciones para exportar.");
    }
  };
  
  const handleExportMarkdown = (exercise: Exercise) => {
    exportExerciseToMarkdown(exercise);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-lightGray"><div className="text-xl text-unlpBlue">Cargando aplicación...</div></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <Header
        courseTitle={APP_CONSTANTS.courseTitle}
        userName={APP_CONSTANTS.userName}
        userOrganization={APP_CONSTANTS.userOrganization}
        onExportAllPdf={handleExportAllToPdf}
        onAddNewExercise={() => setIsAddModalOpen(true)}
      />
      <div className="flex flex-col md:flex-row flex-1 container mx-auto px-4 py-6 md:space-x-6 overflow-hidden">
        <Sidebar
          exercises={exercises}
          selectedExerciseId={selectedExerciseId}
          onSelectExercise={handleSelectExercise}
          onAddNewExercise={() => setIsAddModalOpen(true)}
          onDeleteExercise={handleOpenDeleteConfirmModal}
        />
        <main className="flex-1 bg-white shadow-xl rounded-lg p-6 overflow-y-auto mt-6 md:mt-0 min-h-[300px] md:min-h-0">
          {currentExercise ? (
            <ExerciseDisplayWrapper
              key={currentExercise.id} 
              exercise={currentExercise}
              onSaveResolution={handleSaveResolution}
              onExportMarkdown={handleExportMarkdown}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"  strokeWidth={1}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="text-xl text-center">Selecciona una ejercitación del panel lateral.</p>
              <p className="mt-2 text-center">O crea una nueva haciendo clic en el botón <PlusIcon className="inline h-5 w-5" /> "Nueva Ejercitación".</p>
            </div>
          )}
        </main>
      </div>
      <Footer
        teacherInfo={APP_CONSTANTS.teacherInfo}
        organizingInstitutions={APP_CONSTANTS.organizingInstitutions}
      />
      {isAddModalOpen && (
        <AddNewExerciseModal
          onClose={() => setIsAddModalOpen(false)}
          onAddExercise={handleAddNewExercise}
        />
      )}
      {deleteConfirmModal.isOpen && (
        <ConfirmDeleteModal
          exerciseTitle={deleteConfirmModal.exerciseTitle || ''}
          onClose={handleCloseDeleteConfirmModal}
          onConfirm={handleConfirmDeleteExercise}
        />
      )}
    </div>
  );
};

export default App;
