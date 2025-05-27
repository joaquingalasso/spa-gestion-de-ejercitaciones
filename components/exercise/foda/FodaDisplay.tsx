
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FodaQuadrantContent } from '../../../types';
import { TrendingUpIcon, TrendingDownIcon, SparklesIcon, ShieldExclamationIcon } from '../../icons/IconComponents';

interface FodaDisplayProps {
  resolution?: FodaQuadrantContent;
}

const FodaQuadrantDisplay: React.FC<{ title: string; content?: string; Icon: React.FC<{className?: string}>; iconColor: string; bgColor: string; textColor: string; analysisType: string }> = 
  ({ title, content, Icon, iconColor, bgColor, textColor, analysisType }) => (
  <div className={`p-4 rounded-lg shadow ${bgColor} ${textColor} min-h-[150px]`}>
    <div className="flex items-center mb-2">
      <Icon className={`h-7 w-7 mr-2 ${iconColor}`} />
      <div>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-xs opacity-80">{analysisType}</p>
      </div>
    </div>
    {content && content.trim() !== '' ? (
      <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
         <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    ) : (
      <p className="text-sm italic opacity-70">Vacío</p>
    )}
  </div>
);

export const FodaDisplay: React.FC<FodaDisplayProps> = ({ resolution }) => {
  if (!resolution) {
    return <p className="text-gray-500 italic">Aún no has completado el análisis FODA.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FodaQuadrantDisplay 
          title="Fortalezas" 
          content={resolution.strengths}
          Icon={TrendingUpIcon}
          iconColor="text-green-500"
          bgColor="bg-green-50"
          textColor="text-green-700"
          analysisType="Análisis Interno"
        />
        <FodaQuadrantDisplay 
          title="Debilidades" 
          content={resolution.weaknesses}
          Icon={TrendingDownIcon}
          iconColor="text-red-500"
          bgColor="bg-red-50"
          textColor="text-red-700"
          analysisType="Análisis Interno"
        />
        <FodaQuadrantDisplay 
          title="Oportunidades" 
          content={resolution.opportunities}
          Icon={SparklesIcon}
          iconColor="text-blue-500"
          bgColor="bg-blue-50"
          textColor="text-blue-700"
          analysisType="Análisis Externo"
        />
        <FodaQuadrantDisplay 
          title="Amenazas" 
          content={resolution.threats}
          Icon={ShieldExclamationIcon}
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
          textColor="text-yellow-700"
          analysisType="Análisis Externo"
        />
      </div>
    </div>
  );
};
