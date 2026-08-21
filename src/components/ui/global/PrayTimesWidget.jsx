import { IoLocationOutline } from 'react-icons/io5';
import { bgImage } from '../../../utils/bgImage';
import { usePrayTimes } from '../../../hooks/global/usePrayTimes';

export default function PrayTimesWidget() {
  const { loading, error, nextPrayer, timeLeft, todayTimes } = usePrayTimes(
    'JAWA BARAT',
    'Kab. Karawang',
  );

  if (loading) {
    return (
      <div className="w-[95%] mx-auto mt-4 h-48 rounded-2xl bg-sea-green-800/40 animate-pulse flex items-center justify-center text-white/70">
        Memuat jadwal shalat...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[92%] mx-auto mt-4 p-4 rounded-2xl bg-red-900/40 text-red-200 text-center text-sm border border-red-500/20">
        Gagal memuat jadwal shalat. Sila cek koneksi Anda.
      </div>
    );
  }

  return (
    <div className="relative w-[95%] md:w-[98%] mx-auto mt-4 overflow-hidden rounded-2xl shadow-xl text-white">
      {/* FIRST LAYER: BG IMAGE */}
      <img
        src={bgImage.bgAqsa}
        alt="Latar Masjid"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* SECOND LAYER: OVERLAY GRADIENT */}
      <div className="absolute inset-0 bg-linear-to-tr from-sea-green-800 via-sea-green-800/90 to-sea-green-500/75" />

      {/* THIRD LAYER: MAIN CONTENT WIDGET */}
      <div className="relative z-10 p-5">
        {/* HEADER WIDGET */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-200 md:text-lg">
            <span className='flex items-center gap-1'>
              <IoLocationOutline /> Kab. Karawang
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 md:text-lg">
            Jadwal Shalat
          </span>
        </div>

        {/* HIGHLIGHT INCOMING PRAY TIME */}
        <div className="mb-6">
          <p className="text-base md:text-[24px] font-medium text-emerald-100">
            Menuju{' '}
            <span className="font-bold text-white underline decoration-emerald-400 underline-offset-4">
              {nextPrayer.name}
            </span>
          </p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl font-extrabold tracking-tight md:text-5xl">
              {nextPrayer.time || '--:--'}
            </span>
            <span className="font-mono text-lg md:text-xl font-bold text-emerald-300 bg-black/20 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-emerald-500/30">
              {timeLeft}
            </span>
          </div>
        </div>

        {/* GRID 5 TODAY PRAYER (5 TIME PRAYER) */}
        <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-white/10">
          {todayTimes?.map((item) => {
            const isNext = item.name === nextPrayer.name;
            return (
              <div
                key={item.name}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                  isNext
                    ? 'bg-white/20 border border-emerald-300/50 shadow-md backdrop-blur-md scale-105'
                    : 'bg-black/10 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span
                  className={`text-[12px] md:text-lg font-semibold ${
                    isNext ? 'text-emerald-200' : 'text-white/70'
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-xs md:text-lg font-bold mt-0.5 tracking-tight">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
