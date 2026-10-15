import Button from '../ui/global/Button';
import NotFoundData from '../ui/global/NotFoundData';
import { EventDashboardSkeleton } from '../ui/global/skeletons/SkeletonLoading';
import { titleCase } from '../../utils/helpers/helpers';
import {
  formatDateIndonesia,
  formatTimeIndonesia,
} from '../../utils/helpers/dateConversion';
import { getButtonLabel, getStatusConfig } from '../../utils/helpers/status';
import {
  IconClock,
  IconCalendar,
  IconLocation,
  IconPerson,
  IconCategory,
} from '../../utils/helpers/decorations';

export const EventDashboard = ({
  eventData,
  isLoading = false,
  onActionClick,
}) => {
  if (isLoading) {
    return <EventDashboardSkeleton />;
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
    description = 'Hadiri sesi ini untuk panduan lengkap dan update informasi haji Anda',
    location = 'Aula Utama',
    speaker = 'Panitia',
    category = 'Umum',
    status = 'Belum Dimulai',
    isAttended = 0,
  } = eventData;

  const eventDate = formatDateIndonesia(eventData.timeStart);
  const eventTimeStart = formatTimeIndonesia(eventData.timeStart);
  const eventTimeEnd = formatTimeIndonesia(eventData.timeEnd);
  const eventTime = `${eventTimeStart} - ${eventTimeEnd}`;

  // status event configuration
  const statusConfig = getStatusConfig(status);

  return (
    <section className="mx-auto mt-6 flex w-[95%] flex-col pb-6 md:w-[98%]">
      {/* Section heading */}
      <div className="mb-5">
        <h2 className="inline-block border-b-2 border-sea-green-600 pb-2 text-lg font-bold text-slate-800">
          Agenda Terdekat
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Informasi kegiatan dan jadwal terdekat Anda.
        </p>
      </div>

      {/* Event card */}
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sea-green-200 hover:shadow-lg hover:shadow-slate-200/50">
          {/* Accent */}
          <div className="h-1 w-full bg-linear-to-r from-sea-green-600 via-sea-green-400 to-emerald-200" />

          <div className="flex flex-1 flex-col p-4 sm:p-5">
            {/* Status badges */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-xs font-semibold ${statusConfig.color}`}
              >
                {statusConfig.label}
              </span>

              {Boolean(isAttended) && (
                <span className="inline-flex items-center rounded-full bg-sea-green-50 px-3 py-1.5 text-xs font-semibold text-sea-green-700 ring-1 ring-inset ring-sea-green-100">
                  Hadir
                </span>
              )}
            </div>

            {/* Event title and description */}
            <div className="mb-5 min-w-0 border-l-[3px] border-sea-green-500 pl-4">
              <p className="mb-2 text-[11px] font-bold text-sea-green-700">
                Detail Kegiatan
              </p>

              <h3 className="wrap-break-words text-xl font-bold leading-7 text-slate-800 transition-colors group-hover:text-sea-green-800">
                {eventName || 'Tidak ada judul acara'}
              </h3>

              <p className="mt-2 wrap-break-words text-sm leading-6 text-slate-500">
                {description ||
                  'Informasi kegiatan dan jadwal bimbingan jamaah.'}
              </p>
            </div>

            {/* Event information */}
            <div className="mb-5 mt-auto space-y-1 border-t border-slate-100 pt-4">
              {[
                {
                  label: 'Tanggal',
                  value: eventDate,
                  Icon: IconCalendar,
                },
                {
                  label: 'Waktu',
                  value: eventTime,
                  Icon: IconClock,
                },
                {
                  label: 'Lokasi',
                  value: titleCase(location),
                  Icon: IconLocation,
                },
                {
                  label: 'Kategori',
                  value: titleCase(category),
                  Icon: IconCategory,
                },
                {
                  label: 'Pemateri',
                  value: titleCase(speaker),
                  Icon: IconPerson,
                },
              ].map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="flex min-w-0 items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sea-green-50 text-sea-green-700">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1 py-0.5">
                    <p className="mb-0.5 text-[11px] font-medium text-slate-400">
                      {label}
                    </p>

                    <p className="wrap-break-words text-sm font-semibold leading-5 text-slate-700">
                      {value || '-'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action button */}
            <div className="mt-auto border-t border-slate-100 pt-4">
              <Button
                variant="primary"
                onClick={onActionClick}
                className="w-full"
              >
                {getButtonLabel(status, isAttended)}
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default EventDashboard;
