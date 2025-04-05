'use client';
import { useState } from 'react';
import jsPDF from 'jspdf';

export default function Page() {
  const [tema, setTema] = useState('');
  const [problema, setProblema] = useState('');
  const [propuestas, setPropuestas] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [enfoque, setEnfoque] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generarSolicitud = async () => {
    setIsLoading(true);
    const prompt = `Actúa como un redactor cívico-legal experto en normativas mexicanas. Redacta una solicitud ciudadana con base en los siguientes datos:

    Tema: ${tema}
    Problema principal: ${problema}
    Propuestas a desarrollar: ${propuestas}
    Destinatario: ${destinatario}
    Enfoque: ${enfoque}

    Estructura del documento:
    1. Introducción formal
    2. Objetivo general
    3. Motivos
    4. Justificación técnica
    5. Marco legal (solo leyes mexicanas)
    6. Conclusión`;

    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    setOutput(data.text);
    setIsLoading(false);
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(output, 180);
    doc.setFontSize(12);
    doc.text(lines, 15, 20);
    doc.save('solicitud_ciudadana.pdf');
  };

  const isFormComplete = tema && problema && propuestas && destinatario && enfoque;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generador de Solicitudes Ciudadanas - CIVIScribe</h1>

      <input className="mb-2 p-2 border rounded w-full" placeholder="Tema (ej. Calidad del aire en Chihuahua)" value={tema} onChange={(e) => setTema(e.target.value)} />
      <textarea className="mb-2 p-2 border rounded w-full" placeholder="Problema principal" value={problema} onChange={(e) => setProblema(e.target.value)} />
      <textarea className="mb-2 p-2 border rounded w-full" placeholder="Propuestas a desarrollar" value={propuestas} onChange={(e) => setPropuestas(e.target.value)} />
      <input className="mb-2 p-2 border rounded w-full" placeholder="Destinatario (ej. Secretaría de Gobierno)" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} />
      <input className="mb-4 p-2 border rounded w-full" placeholder="Enfoque (ej. política pública local)" value={enfoque} onChange={(e) => setEnfoque(e.target.value)} />

      <button className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" onClick={generarSolicitud} disabled={!isFormComplete || isLoading}>
        {isLoading ? 'Generando...' : 'Generar Solicitud'}
      </button>

      {output && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Documento generado:</h2>
          <pre className="whitespace-pre-wrap text-sm mb-4">{output}</pre>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={descargarPDF}>Descargar como PDF</button>
        </div>
      )}
    </div>
  );
}
