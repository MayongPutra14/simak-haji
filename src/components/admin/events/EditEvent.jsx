import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../ui/global/Button';
import * as UpdateEventSchemas from '../../../utils/admin/eventSchema';
import EventMap from './EventMap';
import { parseDateTimeForInput } from '../../../utils/helpers/dateConversion';
import { handleDownloadMaterial } from '../../../utils/helpers/helpers';
import { IconEye, IconDownload } from '../../../utils/helpers/decorations';
import {
  InputText,
  InputDate,
  InputTime,
  InputSelect,
  TextArea,
  InputFile,
} from '../../ui/inputs/index';
import {
  EventInfoSkeleton,
  EventMapSkeleton,
  EventMaterialSkeleton,
  EventTimeSkeleton,
} from '../../ui/global/skeletons/index';

export default function EditEvent({
  initialData,
  onSave,
  onCancel,
  isLoading,
}) {
  const formattedValues = useMemo(() => {
    if (!initialData) return undefined;

    // extract and parse datetime string from backend
    const { eventDate, eventTime } = parseDateTimeForInput(initialData.date);

    return {
      ...initialData,
      eventDate,
      eventTime,
      radius: initialData.radius ? String(initialData.radius) : '',
    };
  }, [initialData]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UpdateEventSchemas.UpdateEventSchemas),
    // automatically populate form when initialData changes
    values: formattedValues,
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const watchLat = useWatch({ control, name: 'latitude' });
  const watchLng = useWatch({ control, name: 'longitude' });
  const watchRadius = useWatch({ control, name: 'radius' });

  // CALLBACK WHEN MAP CLICKED
  const handleSelectLocation = (lat, lng) => {
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });
  };

  function onSubmitForm(data) {
    const formData = new FormData();

    // COMBINE DATE AND TIME FOR BACKEND DATETIME FIELD
    if (data.eventDate && data.eventTime) {
      const combinedDateTime = `${data.eventDate} ${data.eventTime}:00`;
      formData.append('date', combinedDateTime);
    }

    // PROCESS FORM FIELDS INTO FORMDATA
    Object.keys(data).forEach((key) => {
      // skip internal date/time split fields to avoid duplicate payload
      if (key === 'eventDate' || key === 'eventTime') return;

      const value = data[key];

      // HANDLE FILE UPLOAD FIELDS
      if (key === 'material') {
        if (value instanceof FileList && value.length > 0) {
          // extract binary file from filelist
          formData.append(key, value[0]);
        } else if (value instanceof File) {
          // append direct file object
          formData.append(key, value);
        }
        // ignore string path or legacy material object if no new file is uploaded
      }
      // HANDLE PRIMITIVE VALUES (EXCLUDE NULL, UNDEFINED, AND NESTED OBJECTS)
      else if (
        value !== null &&
        value !== undefined &&
        typeof value !== 'object'
      ) {
        formData.append(key, value);
      }
    });

    if (onSave) {
      onSave(formData);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-4 w-[95%] mx-auto space-y-6  md:w-[98%]">
        {/* MAIN CONTENT GRID WITH 2 COLUMNS */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN LIST */}
          <div className="space-y-6">
            <EventInfoSkeleton />
          </div>

          {/* RIGHT COLUMN LIST */}
          <div className="space-y-6">
            <EventTimeSkeleton />
            <EventMaterialSkeleton />
          </div>
        </div>
        <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
          <EventMapSkeleton />
        </div>
      </div>
    );
  }

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
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold transition-colors border cursor-pointer rounded-xl bg-slate-100 hover:bg-slate-200 border-slate-300"
          >
            Kembali
          </Button>

          {/* BUTTON SAVE */}
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-semibold transition-colors shadow-sm cursor-pointer bg-sea-green-700 rounded-xl hover:bg-sea-green-900"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {/* LEFT COLUMN LIST */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* MAIN INFORMATION CARD */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Informasi Acara
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* EVENT NAME */}
              <InputText
                label="Nama Event"
                isLabelFade={true}
                variant="editProfile"
                placeholder="Perkenalan Mengenai Tanah Suci"
                error={errors.eventName?.message}
                {...register('eventName')}
              />

              {/* EVENT DESCRIPTION */}
              <TextArea
                label="Deskripsi Event"
                isLabelFade
                variant="editProfile"
                rows={5}
                error={errors.description?.message}
                {...register('description')}
              />

              {/* SPEAKER */}
              <InputText
                label="Pembicara"
                isLabelFade={true}
                variant="editProfile"
                placeholder="Dandri Proginawa S.Pd"
                error={errors.speaker?.message}
                {...register('speaker')}
              />

              {/* LOCATION NAME */}
              <InputText
                label="Lokasi"
                isLabelFade
                variant="editProfile"
                placeholder="Masjid Ar - Rohmah"
                error={errors.location?.message}
                {...register('location')}
              />

              {/* EVENT CATEGORY */}
              <InputSelect
                label="Kategori Acara"
                isLabelFade
                placeholder="-- Pilih Kategori --"
                variant="editProfile"
                options={UpdateEventSchemas.eventCategoryOptions}
                error={errors.category?.message}
                {...register('category')}
              />

              {/* EVENT ZONE */}
              <InputSelect
                label="Zona Event"
                isLabelFade
                placeholder="-- Pilih Zona --"
                variant="editProfile"
                options={UpdateEventSchemas.zonaOptions}
                error={errors.zone?.message}
                {...register('zone')}
              />

              {/* EVENT STATUS */}
              <InputSelect
                label="Status Event"
                isLabelFade
                placeholder="-- Pilih Kategori --"
                variant="editProfile"
                options={UpdateEventSchemas.eventStatusOptions}
                error={errors.status?.message}
                {...register('status')}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN LIST */}
        <div className="space-y-6">
          {/* EVENT TIME CARD */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Waktu Pelaksanaan
            </h2>
            {/* DATE */}
            <div className="space-y-3">
              <InputDate
                label="Tanggal Pelaksanaan Acara"
                isLabelFade
                error={errors.eventDate?.message}
                {...register('eventDate')}
              />
            </div>

            {/* TIME */}
            <div className="space-y-3">
              {/* EVENT TIME */}
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

          {/* EVENT MATERIAL */}
          <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
            <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
              Materi Acara
            </h2>

            <div className="text-xs font-semibold text-slate-400 items-center ">
              <label>File Materi Saat Ini</label>
            </div>

            {/* OLD FILE */}
            {initialData?.material ? (
              <div className="flex flex-col gap-3 p-4 border rounded-lg border-slate-200 bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-800">
                    {initialData.eventName}
                  </p>
                  {initialData.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {initialData.description}
                    </p>
                  )}
                </div>

                {/* BUTTON ACTION */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Preview button (new Tab) */}
                  <Button
                    to={`${BASE_URL}/${initialData.material.file_path}`}
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
                        initialData.material,
                        initialData.eventName,
                        BASE_URL,
                      )
                    }
                    className="inline-flex cursor-pointer items-center justify-center gap-2 text-sm font-medium text-white transition-colors rounded-lg bg-sea-green-500 hover:bg-sea-green-600"
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

            {/* NEW FILE INPUT */}
            <InputFile
              label="Update Materi Baru"
              isLabelFade
              description="Format yang didukung: .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx (Max. 10MB)"
              error={errors.material?.message}
              {...register('material')}
            />
          </div>
        </div>
      </div>

      {/* EVENT LOCATION */}
      <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="pl-3 text-2xl font-semibold border-l-4 text-slate-700 border-l-sea-green-300">
            Peta & Area Presensi
          </h2>
        </div>
        {/* RADIUS */}
        <InputText
          label="Radius Absen (Meter)"
          isLabelFade
          placeholder="150"
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
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              Peta Lokasi
            </label>
          </div>
          <EventMap
            apiKey={googleApiKey}
            latitude={watchLat}
            longitude={watchLng}
            radius={watchRadius}
            onSelectLocation={handleSelectLocation}
            error={errors.latitude?.message || errors.longitude?.message}
          />
        </div>
      </div>
    </form>
  );
}
