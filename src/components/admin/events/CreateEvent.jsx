import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as EventSchemas from '../../../utils/admin/eventSchema';
import Button from '../../ui/global/Button';
import {
  InputText,
  InputDate,
  InputTime,
  InputSelect,
} from '../../ui/inputs/index';

export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(EventSchemas.EventSchema),
  });

  const handleOnSubmit = () => {};
  return (
    <div className="w-[95%] md:w-[98%]  p-6 mx-auto mt-5 bg-white border shadow-sm md:p-8 rounded-xl border-slate-200">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-10">
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
              error={errors.eventName?.message}
              {...register('eventName')}
            />

            {/* LOCATION */}
            <InputText
              label="Lokasi / Tempat Acara"
              placeholder="Masjid Agung Karawang"
              error={errors.venue?.message}
              {...register('venue')}
            />

            {/* LOCATION */}
            <InputText
              label="Pembicara"
              placeholder="Masjid Agung Karawang"
              error={errors.venue?.message}
              {...register('venue')}
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

        <div className="space-y-4">
          <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
            Lokasi & Presensi
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* LATITUDE */}
            <InputText
              label="Latitude"
              placeholder="-645.12442"
              required={true}
              error={errors.latitude?.message}
              {...register('latitude')}
            />

            {/* LONGITUDE */}
            <InputText
              label="Longitude"
              placeholder="106.90123"
              required={true}
              error={errors.longitude?.message}
              {...register('longitude')}
            />

            {/* RADIUS */}
            <InputText
              label="Radius Absen"
              placeholder="150"
              required={true}
              error={errors.radius?.message}
              {...register('radius', {
                onChange: (e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, '');

                  // Mencegah titik ganda
                  const parts = value.split('.');
                  if (parts.length > 2) {
                    value = `${parts[0]} '.' ${parts.slice(1).join('')}`;
                  }
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
    </div>
  );
}
