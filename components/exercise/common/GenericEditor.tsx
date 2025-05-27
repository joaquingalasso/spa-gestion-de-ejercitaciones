
import React from 'react';

interface GenericEditorProps {
  resolution?: string;
  onChange: (value: string) => void;
}

export const GenericEditor: React.FC<GenericEditorProps> = ({ resolution, onChange }) => {
  return (
    <div>
      <textarea
        value={resolution || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribe tu resolución aquí. Puedes usar formato Markdown."
        className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-unlpBlue focus:border-unlpBlue transition-colors"
      />
      <p className="text-xs text-gray-500 mt-1">Soporta formato Markdown.</p>
    </div>
  );
};
