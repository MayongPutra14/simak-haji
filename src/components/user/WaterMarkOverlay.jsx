import { useAuth } from '../../features/auth/useAuth';

export default function WatermarkOverlay() {
  const { user } = useAuth();

  // Format waktu lokal untuk watermark
  const timestamp = new Date().toLocaleString('id-ID');

  // Susun teks watermark berdasarkan data user
  const watermarkText = `${user?.name || 'Guest'} - ${user?.email || ''} - ${timestamp}`;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex flex-wrap justify-center items-center opacity-30 select-none mix-blend-multiply"
      aria-hidden="true"
    >
      {/* Mengulang teks watermark untuk menutupi layar */}
      {Array.from({ length: 40 }).map((_, index) => (
        <p
          key={index}
          className="text-gray-400 font-mono text-xl font-bold whitespace-nowrap transform -rotate-45 p-8"
          style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
        >
          {watermarkText}
        </p>
      ))}
    </div>
  );
}
