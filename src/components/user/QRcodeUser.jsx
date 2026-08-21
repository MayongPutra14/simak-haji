import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRcodeUser = ({ qrValue = 'INVALID', size = 180 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* THIRD PARENT CONTAINER (MAIN).  */}
      <div className="flex flex-col items-center justify-center p-6 shadow-lg bg-linear-to-b from-sea-green-800 to-sea-green-600 rounded-b-3xl md:bg-none md:shadow-none">
        {/* SECOND CONTAINER WRAPER TEKS */}
        <div className="flex flex-col items-center gap-3 text-center text-white md:text-slate-700">
          <p className="font-semibold uppercase text-md">
            Scan untuk Absen
          </p>

          {/* FIRST CONTAINER WRAPER QR CODE */}
          <div
            onClick={() => setIsOpen(true)}
            className="p-4 transition-transform bg-white shadow-md cursor-pointer rounded-2xl hover:scale-105 active:scale-95"
          >
            <QRCodeCanvas value={qrValue} size={size} />
          </div>

          <p className="font-medium text-md opacity-90">
            Ketuk untuk memperbesar
          </p>
        </div>
      </div>

      {/* MODAL LIGHTBOX, OPEN WHEN CLICK */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-all bg-white/30 backdrop-blur-md animate-fade-in"
        >
          <div className="relative flex flex-col items-center gap-4 p-6 bg-white border border-gray-100 shadow-2xl rounded-3xl">
            <QRCodeCanvas value={qrValue} size={280} />
            <p className="text-sm font-semibold text-slate-800">
              Ketuk di mana saja untuk menutup
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QRcodeUser;
