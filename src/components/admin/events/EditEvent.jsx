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

export default function EditEvent({
  initialData,
  onSave,
  onCancel,
  isLoading,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EventSchemas.EventSchema),
    // Menggunakan 'values' agar form terisi otomatis dan bereaksi saat initialData berubah
    values: initialData ? { ...initialData } : undefined,
  });

  const onSubmitForm = (data) => {
    if (onSave) {
      onSave(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="w-[95%] md:w-[98%] mx-auto py-4 space-y-6 font-sans"
    >
      {/* 1. TOP ACTION CONTROL BAR */}
      <div className="sticky z-30 flex px-5 py-4 border border-teal-100 shadow-md top-22 bg-white/90 backdrop-blur-md rounded-2xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* BUTTON BACK */}
          <Button
            type="button"
            fontColor="text-slate-600"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold transition-colors border cursor-pointer rounded-xl bg-slate-100 hover:bg-slate-200 border-slate-300"
          >
            Kembali
          </Button>

          {/* BUTTON SAVE */}
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="px-5 py-2 text-xs font-semibold transition-colors shadow-sm cursor-pointer bg-sea-green-700 rounded-xl hover:bg-sea-green-900"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {/* 2. FORM SECTIONS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* INFORMASI ACARA */}
        <div className="p-6 bg-white border shadow-sm border-sea-green-100 rounded-3xl lg:col-span-2">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-900">
              Informasi Acara
            </h2>
          </div>
          <div className="grid grid-cols-1 space-y-3 sm:grid-cols-2 gap-x-4">
            <InputText
              label="Nama Acara"
              placeholder="Perkenalan Organisasi SIMAK"
              error={errors.eventName?.message}
              {...register('eventName')}
            />

            <InputText
              label="Deskripsi Acara"
              placeholder="Pembahasan tata cara ihram..."
              error={errors.description?.message}
              {...register('description')} // Telah diperbaiki dari sebelumnya (eventName)
            />

            <InputText
              label="Lokasi / Tempat Acara"
              placeholder="Masjid Agung Karawang"
              error={errors.venue?.message}
              {...register('venue')}
            />

            <InputText
              label="Pembicara"
              placeholder="Ust. Fulan"
              error={errors.speaker?.message}
              {...register('speaker')} // Telah diperbaiki dari sebelumnya (venue)
            />

            <InputSelect
              label="Jenis Acara"
              required={true}
              placeholder="-- Pilih Jenis Acara --"
              options={EventSchemas.eventCategoryOptions}
              error={errors.eventCategory?.message}
              {...register('eventCategory')}
            />

            <InputSelect
              label="ZONA TARGET"
              required={true}
              placeholder="-- Pilih Zona Target --"
              options={EventSchemas.zonaOptions}
              error={errors.targetZone?.message}
              {...register('targetZone')}
            />
          </div>
        </div>

        {/* WAKTU PELAKSANAAN */}
        <div className="p-6 bg-white border shadow-sm border-sea-green-100 rounded-3xl lg:col-span-2">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-900">
              Waktu Pelaksanaan
            </h2>
          </div>
          <div className="grid grid-cols-1 space-y-3 sm:grid-cols-2 gap-x-4">
            <InputDate
              label="Tanggal Pelaksanaan Acara"
              required={true}
              error={errors.eventDate?.message}
              {...register('eventDate')}
            />

            <Controller
              name="eventTime"
              control={control}
              rules={{ required: 'Jam pelaksanaan acara wajib diisi' }}
              render={({ field }) => (
                <InputTime
                  label="Jam Pelaksanaan Acara"
                  required={true}
                  error={errors.eventTime?.message}
                  value={field.value || ''}
                  onChange={field.onChange}
                  ref={field.ref}
                />
              )}
            />
          </div>
        </div>

        {/* LOKASI & PRESENSI */}
        <div className="p-6 bg-white border shadow-sm border-sea-green-100 rounded-3xl lg:col-span-2 lg:col-start-1">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-900">
              Lokasi & Presensi
            </h2>
          </div>
          <div className="grid grid-cols-1 space-y-3 sm:grid-cols-2 gap-x-4">
            <InputText
              label="Latitude"
              placeholder="-6.4512442"
              required={true}
              error={errors.latitude?.message}
              {...register('latitude')}
            />

            <InputText
              label="Longitude"
              placeholder="106.90123"
              required={true}
              error={errors.longitude?.message}
              {...register('longitude')}
            />

            <InputText
              label="Radius Absen (Meter)"
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
                    value = `${parts[0]}.${parts.slice(1).join('')}`;
                  }
                  e.target.value = value;
                },
              })}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
