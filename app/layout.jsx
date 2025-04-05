import './globals.css';

export const metadata = {
  title: 'CIVIScribe - Generador de Solicitudes Ciudadanas',
  description: 'Generador automatizado de solicitudes ciudadanas usando GPT',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 font-sans">{children}</body>
    </html>
  );
}
