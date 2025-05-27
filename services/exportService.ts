
import { Exercise, ResolutionContent, ExerciseType, EisenhowerQuadrantContent, FodaQuadrantContent } from '../types';

// @ts-ignore html2pdf is loaded globally from CDN
const html2pdf = window.html2pdf;

const resolutionToMarkdown = (resolution: ResolutionContent, type: ExerciseType): string => {
  let md = '';
  if (type === ExerciseType.GENERAL && resolution.general) {
    md += resolution.general;
  } else if (type === ExerciseType.EISENHOWER && resolution.eisenhower) {
    const r = resolution.eisenhower;
    md += `### Matriz Plazos e Importancia\n\n`;
    md += `**Importante y Urgente (Hacer):**\n${r.importantUrgent || '_Vacío_'}\n\n`;
    md += `**Importante, No Urgente (Planificar):**\n${r.importantNotUrgent || '_Vacío_'}\n\n`;
    md += `**No Importante, Urgente (Delegar):**\n${r.notImportantUrgent || '_Vacío_'}\n\n`;
    md += `**No Importante, No Urgente (Eliminar):**\n${r.notImportantNotUrgent || '_Vacío_'}\n\n`;
  } else if (type === ExerciseType.FODA && resolution.foda) {
    const r = resolution.foda;
    md += `### Análisis F.O.D.A.\n\n`;
    md += `**Fortalezas (Análisis Interno):**\n${r.strengths || '_Vacío_'}\n\n`;
    md += `**Debilidades (Análisis Interno):**\n${r.weaknesses || '_Vacío_'}\n\n`;
    md += `**Oportunidades (Análisis Externo):**\n${r.opportunities || '_Vacío_'}\n\n`;
    md += `**Amenazas (Análisis Externo):**\n${r.threats || '_Vacío_'}\n\n`;
  } else {
    md += "_Sin resolución._\n";
  }
  return md;
};


export const exportExerciseToMarkdown = (exercise: Exercise): void => {
  let markdownContent = `# ${exercise.title}\n\n`;
  markdownContent += `## Consigna\n\n${exercise.prompt}\n\n`;
  markdownContent += `## Mi Resolución\n\n`;
  markdownContent += resolutionToMarkdown(exercise.resolution, exercise.type);

  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  const fileName = `${exercise.title.toLowerCase().replace(/\s+/g, '_')}.md`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};


const resolutionToHtml = (resolution: ResolutionContent, type: ExerciseType): string => {
  let html = '';
  // Basic styling for PDF - can be enhanced
  const pStyle = "style='margin-bottom: 0.5em; line-height: 1.5;'";
  const h4Style = "style='margin-top: 1em; margin-bottom: 0.25em; font-size: 1.1em; font-weight: bold;'";
  const quadrantStyle = "style='border: 1px solid #eee; padding: 0.5em; margin-bottom: 0.5em; border-radius: 4px;'";
  
  const formatTextForHtml = (text: string | undefined) => {
    if (!text || text.trim() === '') return "<p style='opacity:0.7; font-style:italic;'>_Vacío_</p>";
    // Replace newlines with <br> for HTML, very basic Markdown to HTML
    return text.split('\n').map(line => {
      if (line.startsWith('- ')) return `<ul><li>${line.substring(2)}</li></ul>`; // Basic list
      if (line.startsWith('* ')) return `<ul><li>${line.substring(2)}</li></ul>`; // Basic list
      if (line.trim() === '') return '<br>';
      return `<p ${pStyle}>${line}</p>`;
    }).join('');
  };

  if (type === ExerciseType.GENERAL && resolution.general) {
    html += formatTextForHtml(resolution.general);
  } else if (type === ExerciseType.EISENHOWER && resolution.eisenhower) {
    const r = resolution.eisenhower;
    html += `<h4 ${h4Style}>Matriz Plazos e Importancia</h4>`;
    html += `<div ${quadrantStyle}><strong>Importante y Urgente (Hacer):</strong>${formatTextForHtml(r.importantUrgent)}</div>`;
    html += `<div ${quadrantStyle}><strong>Importante, No Urgente (Planificar):</strong>${formatTextForHtml(r.importantNotUrgent)}</div>`;
    html += `<div ${quadrantStyle}><strong>No Importante, Urgente (Delegar):</strong>${formatTextForHtml(r.notImportantUrgent)}</div>`;
    html += `<div ${quadrantStyle}><strong>No Importante, No Urgente (Eliminar):</strong>${formatTextForHtml(r.notImportantNotUrgent)}</div>`;
  } else if (type === ExerciseType.FODA && resolution.foda) {
    const r = resolution.foda;
    html += `<h4 ${h4Style}>Análisis F.O.D.A.</h4>`;
    html += `<div ${quadrantStyle}><strong>Fortalezas (Análisis Interno):</strong>${formatTextForHtml(r.strengths)}</div>`;
    html += `<div ${quadrantStyle}><strong>Debilidades (Análisis Interno):</strong>${formatTextForHtml(r.weaknesses)}</div>`;
    html += `<div ${quadrantStyle}><strong>Oportunidades (Análisis Externo):</strong>${formatTextForHtml(r.opportunities)}</div>`;
    html += `<div ${quadrantStyle}><strong>Amenazas (Análisis Externo):</strong>${formatTextForHtml(r.threats)}</div>`;
  } else {
    html += `<p ${pStyle} style='opacity:0.7; font-style:italic;'>_Sin resolución._</p>`;
  }
  return html;
};

export const exportAllExercisesToPdf = (
  exercises: Exercise[],
  courseTitle: string,
  userName: string,
  userOrganization: string
): void => {
  let fullHtmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .page-break { page-break-after: always; }
          .exercise-container { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;}
          h1 { color: #005A9C; font-size: 24px; text-align: center; margin-bottom: 10px; }
          h2 { color: #005A9C; font-size: 20px; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;}
          h3 { color: #333; font-size: 16px; margin-top: 15px; margin-bottom: 8px; font-weight: bold;}
          p { margin-bottom: 10px; }
          ul { margin-left: 20px; margin-bottom: 10px; }
          .header-info { text-align: center; margin-bottom: 20px; font-size: 14px; }
          .prompt-text { white-space: pre-wrap; background-color: #eef; padding: 10px; border-radius: 4px; margin-bottom:10px; }
        </style>
      </head>
      <body>
        <h1>${courseTitle}</h1>
        <div class="header-info">
          <p><strong>Participante:</strong> ${userName}</p>
          <p><strong>Organización:</strong> ${userOrganization}</p>
        </div>
  `;

  exercises.forEach((exercise, index) => {
    fullHtmlContent += `
      <div class="exercise-container">
        <h2>${index + 1}. ${exercise.title}</h2>
        <h3>Consigna:</h3>
        <div class="prompt-text">${exercise.prompt.replace(/\n/g, '<br>')}</div>
        <h3>Mi Resolución:</h3>
        <div>${resolutionToHtml(exercise.resolution, exercise.type)}</div>
      </div>
    `;
    if (index < exercises.length - 1) {
      fullHtmlContent += `<div class="page-break"></div>`;
    }
  });

  fullHtmlContent += `</body></html>`;

  const element = document.createElement('div');
  element.innerHTML = fullHtmlContent;
  // Append to body to ensure styles are applied if html2pdf relies on computed styles, then remove
  // document.body.appendChild(element); 

  const opt = {
    margin: [15, 10, 15, 10], // top, left, bottom, right in mm
    filename: 'ejercitaciones_curso_taller_2025.pdf',
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, logging: false }, // Increased scale for better quality
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'], before: '.page-break' }
  };

  html2pdf().from(element).set(opt).save().then(() => {
    // if (document.body.contains(element)) {
    //   document.body.removeChild(element);
    // }
  }).catch((err: Error) => {
    console.error("Error generating PDF:", err);
    alert("Error al generar el PDF: " + err.message);
    // if (document.body.contains(element)) {
    //   document.body.removeChild(element);
    // }
  });
};
