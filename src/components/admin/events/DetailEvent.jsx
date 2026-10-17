import { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import EventMap from './EventMap';
import Button from '../../ui/global/Button';
import { DetailField } from '../../ui/global/StatusComponents';
import {
  handleCopyHash,
  handleDownloadQR,
  handleDownloadMaterial,
} from '../../../utils/helpers/helpers';
import {
  EventInfoSkeleton,
  EventMapSkeleton,
  EventMaterialSkeleton,
  EventTimeSkeleton,
  EventQrCodeSkeleton,
  EventParametersSkeleton,
} from '../../ui/global/skeletons/index';
import {
  formatDateIndonesia,
  formatTimeIndonesia,
} from '../../../utils/helpers/dateConversion';
import {
  IconParagraph,
  IconLatitude,
  IconLongitude,
  IconRadius,
  IconCopy,
  IconCheck,
  IconDownload,
  IconEye,
  IconClock,
  IconCalendar,
  IconLocation,
  IconPerson,
  IconCategory,
  IconClip,
  IconDocs,
  IconExpand,
} from '../../../utils/helpers/decorations';

export default function DetailEvent({ eventData, isLoading = false }) {
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const BASE_URL = import.meta.env.VITE_STORAGE_BASE_URL;
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const qrRef = useRef(null);

  // date and time formatting helpers
  const eventDate = formatDateIndonesia(eventData.timeStart);
  const eventTimeStart = formatTimeIndonesia(eventData.timeStart);
  const eventTimeEnd = formatTimeIndonesia(eventData.timeEnd);

  if (isLoading) {
    return (
      <div className="min-h-screen py-4 w-[95%] mx-auto space-y-6  md:w-[98%]">
        {/* MAIN CONTENT GRID WITH 2 COLUMNS */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* LEFT COLUMN (2/3 WIDTH) */}
          <div className="space-y-4 lg:col-span-2">
            <EventInfoSkeleton />
            <EventTimeSkeleton />
            <EventMaterialSkeleton />
            <EventMapSkeleton />
          </div>

          {/* RIGHT COLUMN (1/3 WIDTH) */}
          <div className="space-y-6">
            <EventQrCodeSkeleton />
            <EventParametersSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-4 w-[95%] mx-auto space-y-6  md:w-[98%]">
      {/* MAIN CONTENT GRID WITH 2 COLUMNS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* LEFT COLUMN (2/3 WIDTH) */}
        <div className="space-y-4 lg:col-span-2">
          {/* MAIN INFORMATION CARD */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Informasi Acara
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* EVENT NAME */}
              <DetailField
                label="Nama Event"
                icon={IconClip}
                value={eventData.eventName}
              />

              {/* EVENT DESCRIPTION */}
              <DetailField
                icon={IconParagraph}
                label="Dekripsi Acara"
                value={eventData.description}
              />

              {/* SPEAKER */}
              <DetailField
                icon={IconPerson}
                label="Pembicara"
                value={eventData.speaker}
              />

              {/* LOCATION */}
              <DetailField
                icon={IconLocation}
                label="Lokasi"
                value={eventData.location}
              />

              {/* CATEGORY EVENT */}
              <DetailField
                icon={IconCategory}
                label="Kategori Event"
                value={eventData.category}
              />

              {/* EVENT STATUS */}
              <DetailField
                icon={IconCategory}
                label="Zona Event"
                value={eventData.zone}
              />

              {/* EVENT STATUS */}
              <DetailField
                icon={IconCategory}
                label="Zona Event"
                value={eventData.status}
              />
            </div>
          </div>

          {/* EVENT TIME CARD */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Waktu Pelaksanaan
            </h2>

            <div className="flex flex-col gap-4">
              {/* DATE */}
              <DetailField
                icon={IconCalendar}
                label="Jadwal Acara"
                value={eventDate}
              />

              {/* TIME */}
              <DetailField
                icon={IconClock}
                label="Waktu Pelaksanaan"
                value={`${eventTimeStart} - ${eventTimeEnd}`}
              />
            </div>
          </div>

          {/* MATERIAL EVENT */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Materi Acara
            </h2>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-700/50">
              <IconDocs className="w-4 h-4" />
              <label>File Materi</label>
            </div>

            {eventData?.material ? (
              <div className="flex flex-col gap-3 p-4 border rounded-lg border-slate-200 bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-800">
                    {eventData.eventName}
                  </p>
                  {eventData.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {eventData.description}
                    </p>
                  )}
                </div>

                {/* BUTTON ACTION */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Preview button (new Tab) */}
                  <Button
                    to={`${BASE_URL}/${eventData?.material}`}
                    variant="actions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50"
                  >
                    <IconEye className="w-4 h-4" />
                    Preview File
                  </Button>

                  {/* Download button */}
                  <Button
                    type="button"
                    onClick={() =>
                      handleDownloadMaterial(
                        eventData.material,
                        eventData.eventName,
                        BASE_URL,
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors rounded-lg cursor-pointer bg-sea-green-500 hover:bg-sea-green-600"
                  >
                    <IconDownload className="w-4 h-4" />
                    Unduh
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-sm italic font-medium text-slate-400">
                {'Tidak ada materi untuk acara ini.'}
              </p>
            )}
          </div>

          {/* MAP AND GEOFENCE RADIUS AREA CARD */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
                Peta & Area Presensi
              </h2>
            </div>

            {/* google maps visualization utilizing embedded iframe */}
            <div className="relative w-full overflow-hidden rounded-lg h-87 md:h-100 bg-slate-100">
              <EventMap
                apiKey={googleApiKey}
                latitude={eventData?.latitude}
                longitude={eventData?.longitude}
                radius={eventData?.radius}
              />
            </div>

            {/* DETAIL INFORMATIONS */}
            <div className="grid grid-cols-1 gap-3 pt-1 text-xs sm:grid-cols-2 text-slate-500">
              {/* LOCATION */}
              <DetailField label="Lokasi" value={eventData.location} />

              {/* COORDINATE */}
              <DetailField
                label="Koordinar"
                value={`${eventData.latitude}, ${eventData.longitude}`}
              />

              {/* RADIUS */}
              <DetailField
                label="Radius Persensi"
                value={`${eventData.radius} meter`}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3 WIDTH) */}
        <div className="space-y-6">
          {/* QR CODE */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
                QR Code Absensi
              </h2>
            </div>

            {eventData?.qrHash ? (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                {/* Visual QR Canvas */}
                <div
                  ref={qrRef}
                  className="p-3 bg-white border shadow-xs border-slate-200 rounded-xl"
                >
                  <QRCodeCanvas
                    value={eventData.qrHash}
                    size={150}
                    level="H"
                    marginSize={1}
                  />
                </div>

                {/* Hash Info & Copy */}
                <div className="w-full space-y-1.5">
                  <span className="block text-xs font-medium tracking-wider uppercase text-slate-400">
                    Kode QR Hash
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <code className="px-2.5 py-1 text-xs font-mono font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-md">
                      {eventData.qrHash}
                    </code>
                    <button
                      onClick={() =>
                        handleCopyHash(eventData.qrHash, setCopied)
                      }
                      type="button"
                      className="p-1 transition-colors border rounded-md text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200"
                      title="Salin Hash"
                    >
                      {copied ? (
                        <IconCheck className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <IconCopy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid w-full grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleDownloadQR(qrRef, eventData.eventName)}
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                  >
                    <IconDownload className="w-3.5 h-3.5" />
                    Unduh
                  </button>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                  >
                    <IconExpand className="w-3.5 h-3.5" />
                    Perbesar
                  </button>
                </div>
              </div>
            ) : (
              <p className="py-4 text-xs text-center text-slate-400">
                Kode QR belum diatur untuk acara ini.
              </p>
            )}
          </div>

          {/* PRESENCE PARAMETER CARD WITH RADIUS AND COORDINATES */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Parameter Presensi
            </h2>

            <div className="flex flex-col gap-4">
              <DetailField
                isFlex
                icon={IconLatitude}
                label="latitude"
                value={eventData.latitude}
              />

              <DetailField
                isFlex
                icon={IconLongitude}
                label="latitude"
                value={eventData.longitude}
              />

              {/* RADIUS */}
              <DetailField
                isFlex
                icon={IconRadius}
                label="latitude"
                value={`${eventData.radius} meter`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PREVIEW QR CODE */}
      {isModalOpen && eventData?.qrHash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-sm p-6 space-y-5 text-center bg-white shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-800">
                QR Code Presensi
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xl font-bold leading-none text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <div className="flex justify-center p-4 border bg-slate-50 border-slate-100 rounded-xl">
              <QRCodeCanvas
                value={eventData.qrHash}
                size={220}
                level="H"
                marginSize={1}
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">{eventData.eventName}</p>
              <code className="block mt-1 font-mono text-sm font-bold text-slate-700">
                {eventData.qrHash}
              </code>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-900"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
