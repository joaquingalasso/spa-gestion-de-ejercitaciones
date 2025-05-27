
import React from 'react';
import { TeacherInfo } from '../../types';

interface FooterProps {
  teacherInfo: TeacherInfo;
  organizingInstitutions: string[];
}

export const Footer: React.FC<FooterProps> = ({ teacherInfo, organizingInstitutions }) => {
  return (
    <footer className="bg-darkGray text-gray-300 py-8 text-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-100 mb-2">Docente a Cargo</h4>
            <p>{teacherInfo.name}</p>
            <div className="mt-1 space-x-2">
              {teacherInfo.profiles.map(profile => (
                <a key={profile.platform} href={profile.url} target="_blank" rel="noopener noreferrer" className="text-accentGold hover:text-yellow-400 transition-colors">
                  {profile.platform}
                </a>
              ))}
            </div>
            <p className="mt-1">{teacherInfo.contact}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-100 mb-2">Organizan</h4>
            {organizingInstitutions.map(inst => (
              <p key={inst}>{inst}</p>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Joaquín Galasso. Todos los derechos reservados.</p>
        <p className="text-xs text-gray-500 mt-1">Aplicación desarrollada para el Curso Taller 2025.</p>
      </div>
    </footer>
  );
};
