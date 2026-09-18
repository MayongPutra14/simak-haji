import { useState } from 'react';
import { useParams } from 'react-router';
import { MdOutlineDriveFileRenameOutline as IconName } from 'react-icons/md';
import {
  formatDateIndonesia,
  formatTimeIndonesia,
} from '../../../utils/helpers/dateConversion';
import {
  TbWorldLongitude as IconLongitude,
  TbWorldLatitude as IconLatitude,
  TbMapPin2 as IconRadius,
} from 'react-icons/tb';
import {
  IoTimeOutline as IconClock,
  IoCalendarClearOutline as IconCalendar,
  IoLocationOutline as IconLocation,
  IoPersonOutline as IconPerson,
  IoLayersOutline as IconCategory,
} from 'react-icons/io5';

// run this component with dummy event detail data
export default function DetailEvent() {
  const { id } = useParams();

  // dummy event detail data structure based on your json format
  const [eventData] = useState({
    id: id || 1,
    nama_event: 'Manasik Haji Akbar',
    tempat: 'Asrama Haji Pondok Gede',
    pembicara: 'KH. Abdullah',
    jenis_event: 'umum',
    zona_target: null,
    waktu_event: '2026-09-01 08:00:00',
    latitude: -6.28456,
    longitude: 106.90123,
    radius: 150,
  });

  // date and time formatting helpers
  const eventTime = formatTimeIndonesia(eventData.waktu_event);
  const eventDate = formatDateIndonesia(eventData.waktu_event);
  // date formatting helper fallback
  return (
    <div className="min-h-screen pt-4 w-[95%] mx-auto space-y-6 bg-slate-50 md:w-[98%]">
      {/* MAIN CONTENT GRID WITH 2 COLUMNS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* LEFT COLUMN (2/3 WIDTH) */}
        <div className="space-y-4 lg:col-span-2">
          {/* MAIN INFORMATION CARD */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Informasi Acara
            </h2>

            {/* EVENT NAME */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 font-medium text-slate-400/50 ">
                  <IconName className="w-6 h-6" />
                  <label>Nama Event</label>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {eventData.nama_event}
                </p>
              </div>

              {/* SPEAKER */}
              <div>
                <div className="flex items-center gap-2 font-medium text-slate-400/50 ">
                  <IconPerson className="w-6 h-6" />
                  <label>Pembicara</label>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {eventData.pembicara || ''}
                </p>
              </div>

              {/* LOCATION */}
              <div>
                <div className="flex items-center gap-2 font-medium text-slate-400/50 ">
                  <IconLocation className="w-6 h-6" />
                  <label>Lokasi / Tempat</label>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {eventData.tempat || ''}
                </p>
              </div>

              {/* CATEGORY EVENT */}
              <div>
                <div className="flex items-center gap-2 font-medium text-slate-400/50 ">
                  <IconCategory className="w-6 h-6" />
                  <label>Kategori Acara</label>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {eventData.jenis_event || ''}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (1/3 WIDTH) */}
          <div className="space-y-6">
            {/* EVENT TIME CARD */}
            <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
              <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
                Waktu Pelaksanaan
              </h2>

              {/* DATE */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-medium text-slate-400/50">
                  <IconCalendar className="w-6 h-6" />
                  <label>Jadwal Acara</label>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {eventDate}
                </p>
              </div>

              {/* TIME */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-medium text-slate-400/50">
                  <IconClock className="w-6 h-6" />
                  <label>Waktu Pelaksanaan</label>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {eventTime}
                </p>
              </div>
            </div>

            {/* PRESENCE PARAMETER CARD WITH RADIUS AND COORDINATES */}
            <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
              <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
                Parameter Presensi
              </h2>

              <div className="space-y-3">
                {/* RADIUS LATITUDE */}
                <div className="flex justify-between items-center py-1.5 ">
                  <div className="flex items-center gap-2 font-medium text-slate-400/50 ">
                    <IconLatitude className="w-6 h-6" />
                    <label>Latitude</label>
                  </div>
                  <span className="font-semibold text-slate-700">
                    {eventData.latitude}
                  </span>
                </div>

                {/* RADIUS LONGITUDE */}
                <div className="flex justify-between items-center py-1.5 ">
                  <div className="flex items-center gap-2 font-medium text-slate-400/50 ">
                    <IconLongitude className="w-6 h-6" />
                    <label>Longitude</label>
                  </div>
                  <span className="font-semibold text-slate-700">
                    {eventData.longitude}
                  </span>
                </div>

                {/* RADIUS LIMITATION */}
                <div className="flex justify-between items-center py-1.5 ">
                  <div className="flex items-center gap-2 font-medium text-slate-400/50 ">
                    <IconRadius className="w-6 h-6" />
                    <label>Batas Radius</label>
                  </div>
                  <span className="font-semibold text-emerald-600">
                    {eventData.radius} meter
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MAP AND GEOFENCE RADIUS AREA CARD */}
        <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Peta & Area Presensi
            </h2>
          </div>

          {/* google maps visualization utilizing embedded iframe */}
          <div className="relative w-full h-64 overflow-hidden border rounded-lg bg-slate-100 border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224048.53007533925!2d107.040771225!3d-6.334314299999979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69763a90bca871%3A0xc922ad78439a482b!2sMasjid%20Raya%20Puri%20Teluk%20Jambe!5e1!3m2!1sid!2sid!4v1789025082423!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Peta Lokasi Presensi"
            ></iframe>
          </div>

          {/* DETAIL INFORMATIONS */}
          <div className="flex flex-col pt-1 text-xs sm:flex-row sm:items-center sm:justify-between text-slate-500">
            <p>
              <span className="font-medium text-slate-700">Lokasi:</span>{' '}
              {eventData.tempat}
            </p>
            <p className="mt-1 sm:mt-0">
              <span className="font-medium text-slate-700">Koordinat:</span>{' '}
              {eventData.latitude}, {eventData.longitude}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
