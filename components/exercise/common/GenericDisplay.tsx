
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface GenericDisplayProps {
  resolution?: string;
}

export const GenericDisplay: React.FC<GenericDisplayProps> = ({ resolution }) => {
  if (!resolution || resolution.trim() === '') {
    return <p className="text-gray-500 italic">Aún no has ingresado una resolución para este ejercicio.</p>;
  }
  return (
    <div className="prose prose-sm max-w-none p-4 bg-white rounded-md shadow">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{resolution}</ReactMarkdown>
    </div>
  );
};
