
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EisenhowerQuadrantContent } from '../../../types';

interface EisenhowerDisplayProps {
  resolution?: EisenhowerQuadrantContent;
}

const QuadrantDisplay: React.FC<{ title: string; content?: string; bgColor: string; textColor: string; subTitle?: string }> = ({ title, content, bgColor, textColor, subTitle }) => (
  <div className={`p-4 rounded-lg shadow ${bgColor} ${textColor} min-h-[120px]`}>
    <h4 className="font-bold text-lg mb-1">{title}</h4>
    {subTitle && <p className="text-xs mb-2 italic opacity-80">{subTitle}</p>}
    {content && content.trim() !== '' ? (
      <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
         <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    ) : (
      <p className="text-sm italic opacity-70">Vacío</p>
    )}
  </div>
);

export const EisenhowerDisplay: React.FC<EisenhowerDisplayProps> = ({ resolution }) => {
  if (!resolution) {
    return <p className="text-gray-500 italic">Aún no has completado la matriz de Eisenhower.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuadrantDisplay 
          title="Importante y Urgente" 
          subTitle="Hacer (Ámbito de la improvisación: corto plazo y urgente)"
          content={resolution.importantUrgent}
          bgColor="bg-red-100" 
          textColor="text-red-700"
        />
        <QuadrantDisplay 
          title="Importante, No Urgente" 
          subTitle="Planificar (Ámbito de la estrategia: largo plazo e importante)"
          content={resolution.importantNotUrgent}
          bgColor="bg-blue-100"
          textColor="text-blue-700"
        />
        <QuadrantDisplay 
          title="No Importante, Urgente" 
          subTitle="Delegar"
          content={resolution.notImportantUrgent}
          bgColor="bg-yellow-100"
          textColor="text-yellow-700"
        />
        <QuadrantDisplay 
          title="No Importante, No Urgente" 
          subTitle="Eliminar"
          content={resolution.notImportantNotUrgent}
          bgColor="bg-green-100"
          textColor="text-green-700"
        />
      </div>
    </div>
  );
};
