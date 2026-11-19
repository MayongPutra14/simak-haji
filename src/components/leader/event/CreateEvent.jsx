import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as EventSchemas from '../../../utils/schemas/eventSchema';
import Button from '../../ui/global/Button';
import EventMap from '../../ui/global/EventMap';
import { IconLock } from '../../../utils/helpers/decorations';
import {
  InputText,
  InputDate,
  InputTime,
  InputSelect,
  InputFile,
  TextArea,
} from '../../ui/inputs/index';

export default function CreateEvent({ role = 'leader', zone, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(EventSchemas.EventSchema),
    defaultValues: {
      radius: '100',
    },
  });
  // WATCH CHANGE VALUE latitude, longitude, dan radius TO SINCHRONIZE TO MAP
  const watchLat = useWatch({ control, name: 'latitude' });
  const watchLng = useWatch({ control, name: 'longitude' });
  const watchRadius = useWatch({ control, name: 'radius' });
  const watchEventCategory = useWatch({ control, name: 'category' });
  const isLeader = role === 'leader';

  useEffect(() => {
    // Normalize category value to lowercase
    const categoryLower = watchEventCategory?.toLowerCase();

    if (categoryLower === 'leader' && isLeader && zone) {
      setValue('zone', zone);
    } else if (categoryLower && categoryLower !== 'leader') {
      setValue('zone', '');
    }
  }, [watchEventCategory, setValue, isLeader, zone]);

  // CALLBACK WHEN MAP CLICKED
  function handleSelectLocation(lat, lng) {
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });
  }

  function onSubmitForm(formData) {
    const payload = new FormData();
    const normalizedCategory = (formData.category || 'jamaah').toLowerCase();

    // Basic Event Information (CamelCase & English)
    payload.append('eventName', formData.eventName || '');
    payload.append('description', formData.description || '');
    payload.append('location', formData.location || '');
    payload.append('speaker', formData.speaker || '');
    payload.append('category', formData.category || 'jamaah');
    payload.append('status', formData.status || 'upcoming');

    // Target Zone (conditional based on category)
    if (normalizedCategory === 'leader') {
      payload.append('zone', formData.zone || '');
    } else {
      payload.append('zone', '');
    }

    // Formatting Date & Time -> timeStart & timeEnd
    const datePart = formData.eventDate || '';
    const timeStartPart = formData.eventTimeStart || '';
    const timeEndPart = formData.eventTimeEnd || '';
    let formattedTimeStart = '';
    let formattedTimeEnd = '';

    if (datePart && timeStartPart) {
      formattedTimeStart = `${datePart} ${timeStartPart}:00`;
    } else if (datePart) {
      formattedTimeStart = `${datePart} 00:00:00`;
    }

    if (datePart && timeEndPart) {
      formattedTimeEnd = `${datePart} ${timeEndPart}:00`;
    } else if (datePart) {
      formattedTimeEnd = `${datePart} 00:00:00`;
    }

    payload.append('timeStart', formattedTimeStart);
    payload.append('timeEnd', formattedTimeEnd);

    // Geo-location & Radius
    payload.append('latitude', parseFloat(formData.latitude) || 0);
    payload.append('longitude', parseFloat(formData.longitude) || 0);
    payload.append('radius', parseInt(formData.radius, 10) || 100);

    // Handling File Upload (Material)
    if (formData.material) {
      const rawFile = formData.material;
      let fileToUpload = null;

      if (rawFile instanceof FileList && rawFile.length > 0) {
        fileToUpload = rawFile[0];
      } else if (rawFile instanceof File) {
        fileToUpload = rawFile;
      } else if (Array.isArray(rawFile) && rawFile[0] instanceof File) {
        fileToUpload = rawFile[0];
      }

      if (fileToUpload) {
        payload.append('material', fileToUpload);
      }
    }

    // Send data to parent component
    if (onSubmit) {
      onSubmit(payload);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-10 w-[95%] md:w-[98%]  p-6 mx-auto my-5 bg-white border shadow-sm md:p-8 rounded-xl border-slate-200"
    >
      {/* EVENT INFORMATION */}
      <div className="space-y-4">
        <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
          Informasi Acara
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* EVENT NAME */}
          <InputText
            label="Nama Event"
            required
            placeholder="Perkenalan Organisasi SIMAK"
            error={errors.eventName?.message}
            {...register('eventName')}
          />

          {/* EVENT DESCRIPTION */}
          <TextArea
            label="Deskripsi Event"
            placeholder="Hadiri acara ini untuk menambah wawasan Anda seputar ibadah haji"
            rows={5}
            error={errors.description?.message}
            {...register('description')}
          />

          {/* SPEAKER */}
          <InputText
            label="Pembicara"
            placeholder="Surya Kencana S.Pd M.Si"
            error={errors.speaker?.message}
            {...register('speaker')}
          />

          {/* LOCATION */}
          <InputText
            label="Lokasi / Tempat Acara"
            required
            placeholder="Masjid Agung Karawang"
            error={errors.location?.message}
            {...register('location')}
          />

          {/* EVENT CATEGORY */}
          <div className="relative flex flex-col">
            <label className="text-sm md:text-normal font-semibold text-slate-700">
              Kategori Event
            </label>
            <input
              type="text"
              value="Leader"
              readOnly
              disabled
              className="w-full pl-3 pr-9 py-2 text-sm font-medium text-slate-500 bg-slate-100/70 border border-slate-200/70 rounded-xl opacity-75 cursor-not-allowed select-none mt-1"
              {...register('category')}
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconLock className="w-4 h-4" />
            </div>

            <p className="mt-1 text-xs text-red-500">
              *Kategori diisi otomatis berdasarkan wilayah kepemimpinan Anda.
            </p>
          </div>

          {/* ZONE */}
          <div className="relative felx flex-col">
            <label className="text-sm md:text-normal font-semibold text-slate-700">
              Zona Event
            </label>
            <input
              type="text"
              value={zone || ''}
              readOnly
              disabled
              className="w-full pl-3 pr-9 py-2 text-sm font-medium text-slate-500 bg-slate-100/70 border border-slate-200/70 rounded-xl opacity-75 cursor-not-allowed select-none mt-1"
              {...register('zone')}
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconLock className="w-4 h-4" />
            </div>

            <p className="mt-1 text-xs text-red-500">
              *Zona diisi otomatis berdasarkan wilayah kepemimpinan Anda.
            </p>
          </div>

          {/* EVENT STATUS */}
          <InputSelect
            label="Jenis Event"
            required={true}
            placeholder="-- Pilih Status Acara --"
            options={EventSchemas.eventStatusOptions}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>
      </div>

      {/* EVENT TIME */}
      <div className="space-y-4">
        <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
          Waktu Pelaksanaan
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* EVENT DATE */}
          <InputDate
            label="Tanggal Pelaksanaan Acara"
            required={true}
            error={errors.eventDate}
            {...register('eventDate')}
          />

          {/* EVENT TIME START*/}
          <Controller
            name="eventTimeStart"
            control={control}
            rules={{ required: 'Waktu mulai acara wajib diisi' }}
            render={({ field }) => (
              <InputTime
                label="Waktu Mulai Acara"
                required={true}
                error={errors.eventTimeStart}
                value={field.value || ''}
                onChange={field.onChange}
                ref={field.ref}
              />
            )}
          />

          {/* EVENT TIME END*/}
          <Controller
            name="eventTimeEnd"
            control={control}
            rules={{ required: 'Jam pelaksanaan acara wajib diisi' }}
            render={({ field }) => (
              <InputTime
                label="Waktu Selesai Acara"
                required={true}
                error={errors.eventTimeEnd}
                value={field.value || ''}
                onChange={field.onChange}
                ref={field.ref}
              />
            )}
          />
        </div>
      </div>

      {/* EVENT MATERIAL */}
      <div className="space-y-4">
        <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
          Materi Acara
        </h2>
        <InputFile
          label="Upload Materi"
          description="Format yang didukung: .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx (Max. 10MB)"
          error={errors.material?.message}
          {...register('material')}
        />
      </div>

      {/* EVENT LOCATION MAP */}
      <div className="space-y-4">
        <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
          Lokasi Event & Radius Presensi
        </h2>
        {/* RADIUS */}
        <InputText
          label="Radius Absen (Meter)"
          placeholder="150"
          required={true}
          error={errors.radius?.message}
          {...register('radius', {
            onChange: (e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              e.target.value = value;
            },
          })}
        />

        <div>
          <div className="mb-3">
            <label className="text-sm font-semibold md:text-normal text-slate-700">
              Peta Lokasi
            </label>
          </div>
          <EventMap
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            latitude={watchLat}
            longitude={watchLng}
            radius={watchRadius}
            onSelectLocation={handleSelectLocation}
            error={errors.latitude?.message || errors.longitude?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* LATITUDE */}
          <InputText type="hidden" {...register('latitude')} />

          {/* LONGITUDE */}
          <InputText type="hidden" {...register('longitude')} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button to="/leader/events" variant="primary" disabled={isSubmitting}>
          Kembali
        </Button>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Input Data'}
        </Button>
      </div>
    </form>
  );
}
