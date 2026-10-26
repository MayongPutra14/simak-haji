import { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../ui/global/Button';
import { heroEditSchema } from '../../../utils/admin/landingPageSchemas';
import { InputText, TextArea, InputNumber } from '../../ui/inputs/index';
import { IconTrash, IconCamera } from '../../../utils/helpers/decorations';

export function EditHeroSection({ initialData, onSave, isLoading = false }) {
  // LOCAL FILE PREVIEW STATE
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  // derive preview image url dynamically during render without state sync
  const previewImage =
    selectedFileUrl || initialData?.content?.background?.image_url || '';

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(heroEditSchema),
    defaultValues: initialData || {
      content: {
        background: {
          image_url: '',
          public_id: '',
          alt: '',
        },
        headline: '',
        subheadline: '',
        buttons: {
          secondary: {
            link: '',
          },
        },
        features: [
          {
            id: 'feat-1',
            title: '',
            description: '',
          },
        ],
      },
    },
  });

  // sync form values when initial data is fetched from backend
  useEffect(() => {
    if (initialData?.content) {
      // reset form with full content structure including image metadata
      reset({
        content: initialData.content,
      });
    }
  }, [initialData, reset]);

  // handle local file selection and create temporary preview url
  const handleImageChange = (file, onChangeField) => {
    if (file) {
      // create temporary preview url for selected image file
      const localPreviewUrl = URL.createObjectURL(file);
      setSelectedFileUrl(localPreviewUrl);

      // set raw file to react hook form state
      onChangeField(file);
    } else {
      setSelectedFileUrl('');
      onChangeField(null);
    }
  };

  // handle dynamic list of features array using field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content.features',
  });

  // handle form submission and pass data to parent component
  const handleSave = (formDataPayload) => {
    if (onSave) {
      onSave(formDataPayload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="w-[95%] md:w-[98%] mx-auto py-4 space-y-8 font-sans"
    >
      {/* HIDDEN IMAGE METADATA FIELDS */}
      <input type="hidden" {...register('content.background.image_url')} />
      <input type="hidden" {...register('content.background.public_id')} />

      {/* SECTION HEADER */}
      <div>
        <h2 className="bg-sea-green-200/50 text-sea-green-900 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
          EDIT HERO SECTION CONTENT
        </h2>
      </div>

      {/* BACKGROUND IMAGE SETTINGS */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
          BACKGROUND IMAGE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* IMAGE PREVIEW AND INPUT */}
          <Controller
            name="content.background.file"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <div className="flex items-center gap-4">
                <div className="relative group shrink-0">
                  <img
                    src={
                      previewImage ||
                      'https://placehold.co/600x400?text=No+Background+Image'
                    }
                    alt="Background Preview"
                    className="object-cover border-4 shadow-md w-36 h-24 md:w-48 md:h-32 rounded-2xl border-teal-400/30"
                  />
                  <label
                    htmlFor="heroBgImageInput"
                    className="absolute inset-0 flex flex-col items-center justify-center text-xs font-medium text-white transition-opacity opacity-0 cursor-pointer bg-black/50 rounded-2xl group-hover:opacity-100"
                  >
                    <IconCamera className="w-6 h-6 mb-1" />
                    Ganti Gambar
                  </label>

                  <input
                    type="file"
                    id="heroBgImageInput"
                    ref={ref}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleImageChange(file, onChange);
                    }}
                  />
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p className="font-medium text-gray-700">
                    Format: JPG, PNG, WEBP
                  </p>
                  <p>Klik pada gambar untuk mengunggah berkas baru.</p>
                  {errors.content?.background?.file?.message && (
                    <p className="text-red-500">
                      {errors.content.background.file.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          />

          {/* ALTERNATIVE TEXT INPUT */}
          <div className="space-y-4">
            <InputText
              label="Teks Alternatif Gambar Latar"
              placeholder="Mekah dengan jamaah yang padat"
              error={errors.content?.background?.alt?.message}
              {...register('content.background.alt')}
            />
          </div>
        </div>
      </div>

      {/* HEADLINE AND SUBHEADLINE */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
          HEADLINE & SUBHEADLINE
        </h3>
        <InputText
          label="Headline Text"
          placeholder='BERHAJI BERSAMA KAMI "AMANAH DAN TERPERCAYA"'
          description='gunakan tanda petik dua ("...") pada kata yang ingin ditekankan pada laman web.'
          error={errors.content?.headline?.message}
          {...register('content.headline')}
        />

        <TextArea
          label="Deskripsi"
          placeholder="SIMAK hadir dari hati yang bergerak untuk membantu sesama..."
          rows={4}
          error={errors.content?.subheadline?.message}
          {...register('content.subheadline')}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
          Tombol Aksi
        </h3>
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <h4 className="font-bold text-sea-green-700">Tombol Whatsapp</h4>
          <div>
            <InputNumber
              label="Nomor Whatsapp"
              placeholder="89782307741"
              description="Input angka tanpa menggunakan +62 atau 0"
              maxLength={13}
              error={errors.content?.buttons?.secondary?.link?.message}
              {...register('content.buttons.secondary.link')}
            />
          </div>
        </div>
      </div>

      {/* FEATURES LIST */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center ">
          <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
            Badge ({fields.length}/3)
          </h3>
          <button
            type="button"
            onClick={() =>
              append({
                id: `feat-${Date.now()}`,
                description: '',
              })
            }
            disabled={fields.length >= 3}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              fields.length >= 3
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-sea-green-600 text-white hover:bg-sea-green-700'
            }`}
          >
            Tambahkan Badge
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="p-4 border border-gray-200 rounded-lg space-y-4 relative bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Badge-{index + 1}
                  </span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="REMOVE FEATURE ITEM"
                    >
                      <IconTrash />
                    </button>
                  )}
                </div>

                <TextArea
                  label="Deskripsi"
                  placeholder="Bersatu meraih ridho ALLAH SWT"
                  error={
                    errors.content?.features?.[index]?.description?.message
                  }
                  {...register(`content.features.${index}.description`)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          isLoading={isSubmitting || isLoading}
        >
          {isSubmitting ? 'Memproses...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
}
