import Button from '../ui/global/Button';
import { SkeletonScheduleUserDashboard } from '../ui/global/skeletons/index';
import NotFoundData from '../ui/global/NotFoundData';
import {
  formatDateIndonesia,
  formatTimeIndonesia,
} from '../../utils/helpers/dateConversion';
import {
  getButtonLabel,
  getStatusConfig,
} from '../../utils/helpers/statusInEnvent';
import {
  IoTimeOutline as IconClock,
  IoCalendarClearOutline as IconCalendar,
  IoLocationOutline as IconLocation,
  IoPersonOutline as IconPerson,
  IoLayersOutline as IconCategory,
} from 'react-icons/io5';

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
        <NotFoundData message="Belum ada agenda terdekat." />
      </div>
    );
  }

  // FALLBACK IF API DOES NOT RESPONSE
  const {
    eventName = 'Nama Event Tidak Tersedia',
    eventDescription = 'Hadiri sesi ini untuk panduan lengkap dan update informasi haji Anda',
    venue = 'Aula Utama',
    speaker = 'Panitia',
    eventType = 'Umum',
    status = 'upcoming',
    isAttended = 0,
  } = eventData;

  const eventDate = formatDateIndonesia(eventData.eventTime);
  const eventTime = formatTimeIndonesia(eventData.eventTime);
  const eventLocation = venue;
  const eventCapitalized =
    eventType.charAt(0).toUpperCase() + eventType.slice(1);

  // status event configuration
  const statusConfig = getStatusConfig(status);

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
          <div className=" flex flex-col items-end gap-2">
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

          <div className="border-l-4 border-sea-green-400 p-4 ">
            <h2 className="pb-3 text-2xl font-semibold  text-slate-700">
              {eventName}
            </h2>
            <p className="text-sm text-slate-600/70">{eventDescription}</p>
          </div>

          {/* DETAIL ATTENDANCE STATUS */}
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex gap-2 items-center">
              <IconCalendar className="w-6 h-6 text-slate-600" />
              <p className="text-sm font-medium text-slate-800">{eventDate}</p>
            </div>
            <div className="flex gap-2 items-center">
              <IconClock className="w-6 h-6 text-slate-600" />
              <p className="text-sm font-medium text-slate-800">{eventTime}</p>
            </div>
            <div className="flex gap-2 items-center">
              <IconLocation className="w-6 h-6 text-slate-600" />
              <p className="text-sm font-medium text-slate-800">
                {eventLocation}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <IconCategory className="w-6 h-6 text-slate-600" />
              <p className="text-sm font-medium text-slate-800">
                {eventCapitalized}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <IconPerson className="w-6 h-6 text-slate-600" />
              <p className="text-sm font-medium text-slate-800">{speaker}</p>
            </div>
          </div>

          <div className="pt-1">
            <Button
              variant="primary"
              onClick={onActionClick}
              className="w-full"
            >
              {getButtonLabel(status, isAttended)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
