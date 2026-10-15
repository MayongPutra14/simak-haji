import { EventCardSkeleton } from '../ui/global/skeletons/SkeletonLoading';
import { IsValueEmpty } from '../ui/global/StatusComponents';
import { titleCase } from '../../utils/helpers/helpers';
import {
  formatDateIndonesia,
  formatTimeIndonesia,
} from '../../utils/helpers/dateConversion';
import {
  getAttendanceStatus,
  getEventStatus,
} from '../../utils/helpers/status';
import {
  IconClock,
  IconCalendar,
  IconLocation,
  IconPerson,
} from '../../utils/helpers/decorations';

export default function EventCard({ event }) {
  const isAttended = event?.isAttended ?? false;

  const eventDate = formatDateIndonesia(event?.timeStart);
  const eventTimeStart = formatTimeIndonesia(event?.timeStart);
  const eventTimeEnd = formatTimeIndonesia(event?.timeEnd);
  const eventTime = `${eventTimeStart} - ${eventTimeEnd}`;

  const eventSchedule = getEventStatus(event?.status || 'mendatang');
  const attendance = getAttendanceStatus(
    event?.status || 'mendatang',
    isAttended,
  );

  const details = [
    {
      label: 'Tanggal',
      value: IsValueEmpty(eventDate),
      Icon: IconCalendar,
    },
    {
      label: 'Waktu',
      value: IsValueEmpty(eventTime),
      Icon: IconClock,
    },
    {
      label: 'Lokasi',
      value: IsValueEmpty(titleCase(event?.location)),
      Icon: IconLocation,
    },
    {
      label: 'Pemateri',
      value: IsValueEmpty(titleCase(event?.speaker)),
      Icon: IconPerson,
    },
  ];

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sea-green-200 hover:shadow-lg hover:shadow-slate-200/50">
      {/* Accent */}
      <div className="h-1 w-full bg-linear-to-r from-sea-green-500 via-sea-green-400 to-emerald-200" />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Status */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-[11px] font-semibold leading-4 ${eventSchedule.badgeClass}`}
          >
            {titleCase(eventSchedule.label)}
          </span>

          <span
            className={`inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-[11px] font-semibold leading-4 ${attendance.badgeClass}`}
          >
            {titleCase(attendance.label)}
          </span>
        </div>

        {/* Event title */}
        <div className="mb-5 min-w-0">
          <p className="mb-2 text-[11px] font-bold text-sea-green-700">
            Informasi Kegiatan
          </p>

          <h2 className="min-h-14 wrap-break-words text-lg font-bold leading-7 text-slate-800 transition-colors group-hover:text-sea-green-800 sm:text-xl">
            {IsValueEmpty(titleCase(event.eventName))}
          </h2>

          <p className="min-h-10 wrap-break-words text-sm leading-5 text-slate-500">
            {IsValueEmpty(titleCase(event.description))}
          </p>
        </div>

        {/* Event details */}
        <div className="mt-auto border-t border-slate-200 pt-4">
          <div className="grid grid-cols-1 gap-3   sm:gap-y-4">
            {details.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex min-w-0 items-start gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sea-green-50 text-sea-green-700">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1 py-0.5">
                  <p className="mb-1 text-[11px] font-medium text-slate-400">
                    {label}
                  </p>

                  <p
                    title={value}
                    className="wrap-break-words text-sm font-semibold leading-5 text-slate-700"
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// 3. SUB-COMPONENT: LIST HANDLER (Logika Bersih untuk Page)
EventCard.List = ({ isLoading, data, fallback }) => {
  if (isLoading) {
    return [...Array(3)].map((_, index) => (
      <EventCardSkeleton key={`skeleton-${index}`} />
    ));
  }

  if (!data || data.length === 0) {
    return fallback;
  }

  return data.map((item) => <EventCard key={item.id} event={item} />);
};
