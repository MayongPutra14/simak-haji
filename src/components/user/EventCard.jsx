import { SkeletonScheduleUserMenu } from '../ui/global/skeletons/index';
import {
  formatDateIndonesia,
  formatTimeIndonesia,
} from '../../utils/helpers/dateConversion';
import {
  getAttendanceStatus,
  getEventStatus,
} from '../../utils/helpers/statusInEnvent';
import {
  IoTimeOutline as IconClock,
  IoCalendarClearOutline as IconCalendar,
  IoLocationOutline as IconLocation,
  IoPersonOutline as IconPerson,
} from 'react-icons/io5';

export default function EventCard({ event, isLoading = false }) {
  // SKELETON LOADING
  if (isLoading) {
    return <SkeletonScheduleUserMenu />;
  }

  // SHOW DATA
  const eventStatus = event?.status || 'mendatang';
  const isAttended = event?.isAttended ?? 0;

  const enventName = event?.eventName || 'Tidak ada Judul';
  const eventDescription =
    event?.eventDesctiption ||
    'Hadiri sesi ini untuk panduan lengkap dan update informasi haji Anda';
  const eventDate = formatDateIndonesia(event?.eventTime);
  const eventTime = formatTimeIndonesia(event?.eventTime);
  const eventLocation = event?.venue;
  const speaker = event?.speaker;

  const eventSchedule = getEventStatus(eventStatus);
  const attendance = getAttendanceStatus(eventStatus, isAttended);

  return (
    <div className="md:max-w-123 p-5 mx-auto md:mx-0 transition-all bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* ATTENDANCE & EVENT STATUS BEDGE */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-4 py-1.5 rounded-lg text-xs font-medium ${eventSchedule.badgeClass}`}
        >
          {eventSchedule.label}
        </span>

        <span
          className={`px-4 py-1.5 rounded-lg text-xs font-medium ${attendance.badgeClass}`}
        >
          {attendance.label}
        </span>
      </div>

      {/* TITLE & SUBTITLE EVENT */}
      <div className="border-l-4 border-sea-green-400 p-4 ">
        <h2 className="pb-3 text-2xl font-semibold  text-slate-700">
          {enventName}
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
          <p className="text-sm font-medium text-slate-800">{eventLocation}</p>
        </div>
        <div className="flex gap-2 items-center">
          <IconPerson className="w-6 h-6 text-slate-600" />
          <p className="text-sm font-medium text-slate-800">{speaker}</p>
        </div>
      </div>
    </div>
  );
}
