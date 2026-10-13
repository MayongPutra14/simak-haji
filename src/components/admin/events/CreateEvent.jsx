import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as EventSchemas from '../../../utils/admin/eventSchema';
import Button from '../../ui/global/Button';
import EventMap from './EventMap';
import {
  InputText,
  InputDate,
  InputTime,
  InputSelect,
  InputFile,
  TextArea,
} from '../../ui/inputs/index';
import { useEffect } from 'react';

export default function CreateEvent({ onSubmit }) {
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

  useEffect(() => {
    if (!watchEventCategory) {
      setValue('zone', '');
    }
  }, [watchEventCategory, setValue]);

  // CALLBACK WHEN MAP CLICKED
  function handleSelectLocation(lat, lng) {
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });
  }

  function onSubmitForm(formData) {
    const payload = new FormData();

    // Basic Event Information (CamelCase & English)
    payload.append('eventName', formData.eventName || '');
    payload.append('description', formData.description || '');
    payload.append('location', formData.location || '');
    payload.append('speaker', formData.speaker || '');
    payload.append('category', formData.category || 'jamaah');
    payload.append('status', formData.status || 'upcoming');

    // Target Zone (conditional based on category)
    if (formData.category === 'leader') {
      payload.append('zone', formData.zone || formData.zonaTarget || '');
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
            placeholder="Masjid Agung Karawang"
            error={errors.location?.message}
            {...register('location')}
          />

          {/* EVENT CATEGORY */}
          <InputSelect
            label="Kategori Event"
            required={true}
            placeholder="-- Pilih Kategori Acara --"
            options={EventSchemas.eventCategoryOptions}
            error={errors.category?.message}
            {...register('category')}
          />

          {/* ZONE */}
          <InputSelect
            label="Zona Event"
            required={true}
            placeholder="-- Pilih Zona --"
            options={EventSchemas.zonaOptions}
            error={errors.zone?.message}
            disabled={!watchEventCategory}
            {...register('zone', {
              onChange: () => {
                if (!watchEventCategory) {
                  setValue('zone', '');
                }
              },
            })}
          />

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
        <Button to="/admin/events" variant="primary" disabled={isSubmitting}>
          Kembali
        </Button>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Input Data'}
        </Button>
      </div>
    </form>
  );
}
