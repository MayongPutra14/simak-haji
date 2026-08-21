import { Button } from '../ui/global/Button';
import formatWaktuIndonesia from '../../utils/dateConversion';

export const EventDashboard = ({
  eventData,
  isLoading = false,
  onActionClick,
}) => {
  if (isLoading) {
    return (
      <div className="w-[95%] max-w-md mx-auto mt-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse">
        <div className="w-1/2 h-6 mb-4 rounded bg-slate-200"></div>
        <div className="w-3/4 h-4 mb-3 rounded bg-slate-200"></div>
        <div className="w-2/3 h-4 rounded bg-slate-200"></div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="w-[95%] max-w-md mx-auto mt-6 flex flex-col items-center">
        <div className="w-full mb-4 text-left">
          <h2 className="inline-block pb-1 text-lg font-bold text-gray-800 border-b-2 border-sea-green-600">
            Agenda Terdekat
          </h2>
        </div>
        <div className="w-full p-6 text-sm text-center bg-white border shadow-sm rounded-3xl border-slate-100 text-slate-500">
          Belum ada agenda terdekat saat ini.
        </div>
      </div>
    );
  }

  // FALLBACK IF API DOES NOT RESPONSE
  const eventName = eventData.nama_event || 'Nama Event Tidak Tersedia';
  const formatedTime = formatWaktuIndonesia(eventData.waktu_event);
  const eventPlace = eventData.tempat || 'Aula Utama SIMAK Center';
  const speaker = eventData.pembicara || 'Panitia SIMAK';
  const eventCategory = eventData.jenis_event || 'Umum';
  const eventCapitalized =
    eventCategory.charAt(0).toUpperCase() + eventCategory.slice(1);
  return (
    <div className="w-[95%] max-w-md mx-auto mt-6 flex flex-col items-center pb-6">
      {/* HEADER */}
      <div className="w-full mb-3 text-left">
        <h2 className="inline-block pb-1 text-lg font-bold text-gray-800 border-b-2 border-sea-green-600">
          Agenda Terdekat
        </h2>
      </div>

      {/* CONTAINER CARD */}
      <div className="flex flex-col w-full gap-4 p-5 bg-white border shadow-sm rounded-3xl border-slate-100">
        {/* SECTION 1: EVENT NAME */}
        <div className="pb-3 border-b border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800">{eventName}</h3>
        </div>

        {/* SECTION B: PLACE AND TIME */}
        <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
          <span className="text-base font-normal text-slate-400">
            Waktu & Tempat
          </span>
          <p className="text-md font-semibold text-slate-700">{formatedTime}</p>
          <p className="text-md font-semibold text-slate-700">{eventPlace}</p>
        </div>

        {/* SECTION C: TYPE OF EVENT */}
        <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
          <span className="text-base font-normal text-slate-400">
            Jenis Event
          </span>
          <p className="text-md font-semibold text-slate-700">
            {eventCapitalized}
          </p>
        </div>

        {/* SECTION D: SPEAKER */}
        <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
          <span className="text-base font-normal text-slate-400">
            Pembicara
          </span>
          <p className="text-md font-semibold text-slate-700">{speaker}</p>
        </div>

        {/* SECTION E: E BOOK BUTTON */}
        <div className="pt-1">
          <Button
            variant="primary"
            onClick={onActionClick}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-sea-green-600 hover:bg-sea-green-700 text-white transition-colors"
          >
            Materi Bacaan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
