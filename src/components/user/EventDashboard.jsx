import Button from '../ui/global/Button';
import formatWaktuIndonesia from '../../utils/helpers/dateConversion';
import { SkeletonScheduleUserDashboard } from '../ui/global/skeletons/index';

export const EventDashboard = ({
  eventData,
  isLoading = false,
  onActionClick,
}) => {
  if (isLoading) {
    return <SkeletonScheduleUserDashboard />;
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

  const indonesianTime = formatWaktuIndonesia(eventData.eventTime);
  // FALLBACK IF API DOES NOT RESPONSE
  const {
    eventName = 'Nama Event Tidak Tersedia',
    eventTime = indonesianTime,
    venue = 'Aula Utama',
    speaker = 'Panitia',
    eventType = 'Umum',
    status = 'upcoming', // default jika kosong
    isAttended = 0,
  } = eventData;

  const formatedTime = formatWaktuIndonesia(eventTime);
  const eventCapitalized =
    eventType.charAt(0).toUpperCase() + eventType.slice(1);

  // status event configuration
  const getStatusConfig = () => {
    const currentStatus = status.toLowerCase();
    if (currentStatus === 'live')
      return {
        label: 'Live',
        color: 'bg-yellow-100 text-yellow-700 animate-pulse duration-300',
      };
    if (currentStatus === 'completed')
      return { label: 'Selesai', color: 'bg-green-100 text-green-700' };
    return { label: 'Belum Dimulai', color: 'bg-red-100 text-red-700' };
  };

  const statusConfig = getStatusConfig();

  const getButtonLabel = () => {
    if (status.toLowerCase() === 'live' && isAttended === 0) {
      return 'Absen via QR';
    }
    return 'Materi Bacaan';
  };

  return (
    <div className="w-[95%] md:w-[98%] mt-6 mx-auto flex flex-col pb-6">
      <div className="w-full mb-3 text-left">
        <h2 className="inline-block pb-1 text-lg font-bold text-gray-800 border-b-2 border-sea-green-600">
          Agenda Terdekat
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex flex-col w-full gap-4 p-5 bg-white border shadow-sm md:max-w-md rounded-3xl border-slate-100">
          {/* BADGE STATUS */}
          <div className="absolute flex flex-col items-end gap-2 top-5 right-5">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${statusConfig.color}`}
            >
              {statusConfig.label}
            </span>
            {isAttended === 1 && (
              <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                Terabsensi
              </span>
            )}
          </div>

          <div className="pb-3 pr-24 border-b border-slate-100">
            <h3 className="text-xl font-semibold text-slate-800">
              {eventName}
            </h3>
          </div>

          <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
            <span className="text-base font-normal text-slate-400">
              Waktu & Tempat
            </span>
            <p className="font-semibold text-md text-slate-700">
              {formatedTime}
            </p>
            <p className="font-semibold text-md text-slate-700">{venue}</p>
          </div>

          <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
            <span className="text-base font-normal text-slate-400">
              Jenis & Pembicara
            </span>
            <p className="font-semibold text-md text-slate-700">
              {eventCapitalized} - {speaker}
            </p>
          </div>

          <div className="pt-1">
            <Button
              variant="primary"
              onClick={onActionClick}
              className="w-full"
            >
              {getButtonLabel()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
