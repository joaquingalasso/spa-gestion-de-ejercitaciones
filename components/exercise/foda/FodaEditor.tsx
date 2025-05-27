
import React from 'react';
import { FodaQuadrantContent } from '../../../types';
import { TrendingUpIcon, TrendingDownIcon, SparklesIcon, ShieldExclamationIcon } from '../../icons/IconComponents';


interface FodaEditorProps {
  resolution?: FodaQuadrantContent;
  onChange: (value: FodaQuadrantContent) => void;
}

const FodaQuadrantEditor: React.FC<{ 
  title: string; 
  value?: string; 
  onChange: (val: string) => void; 
  placeholder: string; 
  Icon: React.FC<{className?: string}>;
  iconColor: string;
  borderColor: string;
  focusRingColor: string;
  analysisType: string;
}> = ({ title, value, onChange, placeholder, Icon, iconColor, borderColor, focusRingColor, analysisType }) => (
  <div className={`p-3 border ${borderColor} rounded-lg shadow-sm`}>
    <div className="flex items-center mb-1">
        <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
        <div>
            <label className="block text-sm font-medium text-gray-700">{title}</label>
            <p className="text-xs text-gray-500 italic">{analysisType}</p>
        </div>
    </div>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={5}
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 ${focusRingColor} focus:border-transparent transition-colors`}
    />
  </div>
);


export const FodaEditor: React.FC<FodaEditorProps> = ({ resolution, onChange }) => {
  const r = resolution || { strengths: '', weaknesses: '', opportunities: '', threats: '' };

  const handleChange = (field: keyof FodaQuadrantContent, value: string) => {
    onChange({ ...r, [field]: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-2">Identifica las 3 principales Fortalezas, Oportunidades, Debilidades y Amenazas. Puedes usar formato Markdown.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FodaQuadrantEditor 
          title="Fortalezas"
          value={r.strengths}
          onChange={(val) => handleChange('strengths', val)}
          placeholder="Ej: Buen equipo, recursos únicos..."
          Icon={TrendingUpIcon}
          iconColor="text-green-600"
          borderColor="border-green-300"
          focusRingColor="focus:ring-green-500"
          analysisType="Análisis Interno"
        />
        <FodaQuadrantEditor 
          title="Debilidades"
          value={r.weaknesses}
          onChange={(val) => handleChange('weaknesses', val)}
          placeholder="Ej: Falta de experiencia, presupuesto limitado..."
          Icon={TrendingDownIcon}
          iconColor="text-red-600"
          borderColor="border-red-300"
          focusRingColor="focus:ring-red-500"
          analysisType="Análisis Interno"
        />
        <FodaQuadrantEditor 
          title="Oportunidades"
          value={r.opportunities}
          onChange={(val) => handleChange('opportunities', val)}
          placeholder="Ej: Nuevo mercado, tendencias favorables..."
          Icon={SparklesIcon}
          iconColor="text-blue-600"
          borderColor="border-blue-300"
          focusRingColor="focus:ring-blue-500"
          analysisType="Análisis Externo"
        />
        <FodaQuadrantEditor 
          title="Amenazas"
          value={r.threats}
          onChange={(val) => handleChange('threats', val)}
          placeholder="Ej: Competencia fuerte, cambios regulatorios..."
          Icon={ShieldExclamationIcon}
          iconColor="text-yellow-700"
          borderColor="border-yellow-400"
          focusRingColor="focus:ring-yellow-500"
          analysisType="Análisis Externo"
        />
      </div>
    </div>
  );
};
