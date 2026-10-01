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
} from '../../ui/inputs/index';

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

  // CALLBACK WHEN MAP CLICKED
  const handleSelectLocation = (lat, lng) => {
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            label="Nama Acara"
            placeholder="Perkenalan Organisasi SIMAK"
            error={errors.eventName?.message}
            {...register('eventName')}
          />

          {/* DESCRIPTION */}
          <InputText
            label="Deskripsi Acara"
            placeholder=" Pembahasan tata cara ihram, fiqih wanita saat haji, dan tips menjaga kesehatan."
            error={errors.description?.message}
            {...register('description')}
          />

          {/* LOCATION */}
          <InputText
            label="Lokasi / Tempat Acara"
            placeholder="Masjid Agung Karawang"
            error={errors.venue?.message}
            {...register('venue')}
          />

          {/* SPEAKER */}
          <InputText
            label="Pembicara"
            placeholder="Masjid Agung Karawang"
            error={errors.speaker?.message}
            {...register('speaker')}
          />

          {/* EVENT CATEGORY */}
          <InputSelect
            label="Jenis Acara"
            required={true}
            placeholder=""
            options={EventSchemas.eventCategoryOptions}
            error={errors.eventCategory?.message}
            {...register('eventCategory')}
          />

          {/* ZONA TARGET */}
          <InputSelect
            label="ZONA TARGET"
            required={true}
            placeholder=""
            options={EventSchemas.zonaOptions}
            error={errors.targetZone?.message}
            {...register('targetZone')}
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

          {/* EVENT TIME */}
          <Controller
            name="eventTime"
            control={control}
            rules={{ required: 'Jam pelaksanaan acara wajib diisi' }}
            render={({ field }) => (
              <InputTime
                label="Jam Pelaksanaan Acara"
                required={true}
                error={errors.eventTime}
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
          description="Format yang didukung: .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx (Max. 5MB)"
          error={errors.eventMaterial?.message}
          {...register('eventMaterial')}
        />
      </div>

      {/* EVENT LOCATION MAP */}
      <div className="space-y-4">
        <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
          Lokasi Event & Radius Presensi
        </h2>

        <EventMap
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          latitude={watchLat}
          longitude={watchLng}
          radius={watchRadius}
          onSelectLocation={handleSelectLocation}
          error={errors.latitude?.message || errors.longitude?.message}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* LATITUDE */}
          <InputText type="hidden" {...register('latitude')} />

          {/* LONGITUDE */}
          <InputText type="hidden" {...register('longitude')} />

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
        </div>
      </div>

      <div className="flex gap-2 justify-end items-center">
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
