
import React from 'react';
import { EisenhowerQuadrantContent } from '../../../types';

interface EisenhowerEditorProps {
  resolution?: EisenhowerQuadrantContent;
  onChange: (value: EisenhowerQuadrantContent) => void;
}

const QuadrantEditor: React.FC<{ title: string; value?: string; onChange: (val: string) => void; placeholder: string; subTitle?: string; borderColor: string; focusRingColor: string }> = 
  ({ title, value, onChange, placeholder, subTitle, borderColor, focusRingColor }) => (
  <div className={`p-3 border ${borderColor} rounded-lg shadow-sm`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
    {subTitle && <p className="text-xs text-gray-500 mb-1 italic">{subTitle}</p>}
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 ${focusRingColor} focus:border-transparent transition-colors`}
    />
  </div>
);

export const EisenhowerEditor: React.FC<EisenhowerEditorProps> = ({ resolution, onChange }) => {
  const r = resolution || { importantUrgent: '', importantNotUrgent: '', notImportantUrgent: '', notImportantNotUrgent: '' };

  const handleChange = (field: keyof EisenhowerQuadrantContent, value: string) => {
    onChange({ ...r, [field]: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-2">Completa cada cuadrante de la matriz. Puedes usar formato Markdown.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuadrantEditor 
          title="Importante y Urgente"
          subTitle="Hacer (Ámbito de la improvisación: corto plazo y urgente)"
          value={r.importantUrgent}
          onChange={(val) => handleChange('importantUrgent', val)}
          placeholder="Tareas críticas que deben hacerse ya..."
          borderColor="border-red-300"
          focusRingColor="focus:ring-red-500"
        />
        <QuadrantEditor 
          title="Importante, No Urgente"
          subTitle="Planificar (Ámbito de la estrategia: largo plazo e importante)"
          value={r.importantNotUrgent}
          onChange={(val) => handleChange('importantNotUrgent', val)}
          placeholder="Metas a largo plazo, desarrollo..."
          borderColor="border-blue-300"
          focusRingColor="focus:ring-blue-500"
        />
        <QuadrantEditor 
          title="No Importante, Urgente"
          subTitle="Delegar"
          value={r.notImportantUrgent}
          onChange={(val) => handleChange('notImportantUrgent', val)}
          placeholder="Interrupciones, algunas reuniones..."
          borderColor="border-yellow-400"
          focusRingColor="focus:ring-yellow-500"
        />
        <QuadrantEditor 
          title="No Importante, No Urgente"
          subTitle="Eliminar"
          value={r.notImportantNotUrgent}
          onChange={(val) => handleChange('notImportantNotUrgent', val)}
          placeholder="Distracciones, actividades sin valor..."
          borderColor="border-green-300"
          focusRingColor="focus:ring-green-500"
        />
      </div>
    </div>
  );
};
