import { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../ui/global/Button';
import { editDocumentationSectionSchema } from '../../../utils/admin/landingPageSchemas';
import { InputText, TextArea } from '../../ui/inputs/index';
import { IconTrash, IconCamera } from '../../../utils/helpers/decorations';

export default function EditGallerySection({
  initialData,
  onSave,
  isLoading = false,
}) {
  // state for storing uploaded image preview urls
  const [imagePreviews, setImagePreviews] = useState({});

  // react hook form initialization
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editDocumentationSectionSchema),
    defaultValues: {
      content: {
        title: initialData?.content?.title || '',
        description: initialData?.content?.description || '',
        documentation_items: initialData?.content?.documentation_items || [
          {
            id: 'doc-1',
            label: '',
            image: { url: '', public_id: '', alt: '' },
          },
        ],
      },
    },
  });

  // field array for dynamic documentation items
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content.documentation_items',
  });

  // synchronize form data when initialData prop changes
  useEffect(() => {
    if (initialData?.content) {
      const items = initialData.content.documentation_items?.length
        ? initialData.content.documentation_items
        : [
          {
            id: `doc-${Date.now()}`,
            label: '',
            image: { url: '', public_id: '', alt: '' },
          },
        ];

      reset({
        content: {
          title: initialData.content.title || '',
          description: initialData.content.description || '',
          documentation_items: items,
        },
      });

      // initialize preview images from initial data urls
      const initialPreviews = {};
      items.forEach((item, index) => {
        if (item?.image?.url) {
          initialPreviews[index] = item.image.url;
        }
      });
      setImagePreviews(initialPreviews);
    }
  }, [initialData, reset]);

  // handle local file selection and create object preview url
  const handleImageChange = (file, index, onChangeCallback) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({
        ...prev,
        [index]: previewUrl,
      }));
      onChangeCallback(file);
    }
  };

  // handle remove item and re-index image previews state
  const handleRemoveItem = (index) => {
    remove(index);
    setImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  // form submission handler
  const handleSave = (data) => {
    if (onSave) {
      onSave(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="w-[95%] md:w-[98%] mx-auto py-4 space-y-8 font-sans"
    >
      {/* SECTION HEADER */}
      <div>
        <h2 className="bg-sea-green-200/50 text-sea-green-900 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
          EDIT DOCUMENTATION SECTION CONTENT
        </h2>
      </div>

      {/* MAIN SECTION CONTENT */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
          Informasi Utama Section
        </h3>

        <div className="space-y-4">
          {/* INPUT TEXT: TITLE */}
          <InputText
            label="Judul Section"
            placeholder="Masukkan judul section..."
            error={errors.content?.title?.message}
            {...register('content.title')}
          />

          {/* TEXT AREA: DESCRIPTION */}
          <TextArea
            label="Deskripsi Section"
            placeholder="Masukkan deskripsi singkat section..."
            rows={4}
            error={errors.content?.description?.message}
            {...register('content.description')}
          />
        </div>
      </div>

      {/* DOCUMENTATION ITEMS LIST */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
            Item Dokumentasi ({fields.length})
          </h3>
          <button
            type="button"
            onClick={() =>
              append({
                id: `doc-${Date.now()}`,
                label: '',
                image: { url: '', public_id: '', alt: '' },
              })
            }
            className="px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer bg-sea-green-600 text-white hover:bg-sea-green-700"
          >
            + Tambahkan Dokumentasi
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-gray-200 rounded-lg space-y-4 relative bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  Dokumentasi-{index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="REMOVE DOCUMENTATION ITEM"
                  >
                    <IconTrash />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* INPUT IMAGE WITH PREVIEW */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto Dokumentasi
                  </label>
                  <Controller
                    name={`content.documentation_items.${index}.image.file`}
                    control={control}
                    render={({ field: { onChange, ref } }) => (
                      <div className="flex items-center gap-4">
                        <div className="relative group shrink-0">
                          <img
                            src={
                              imagePreviews[index] ||
                              field.image?.url ||
                              'https://placehold.co/600x400?text=No+Image'
                            }
                            alt={
                              field.image?.alt ||
                              `Preview Documentation ${index + 1}`
                            }
                            className="object-cover border-4 shadow-md w-36 h-24 md:w-48 md:h-32 rounded-2xl border-teal-400/30"
                          />
                          <label
                            htmlFor={`docImageInput-${index}`}
                            className="absolute inset-0 flex flex-col items-center justify-center text-xs font-medium text-white transition-opacity opacity-0 cursor-pointer bg-black/50 rounded-2xl group-hover:opacity-100"
                          >
                            <IconCamera className="w-6 h-6 mb-1" />
                            Ganti Gambar
                          </label>

                          <input
                            type="file"
                            id={`docImageInput-${index}`}
                            ref={ref}
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              handleImageChange(file, index, onChange);
                            }}
                          />
                        </div>

                        <div className="text-xs text-gray-500 space-y-1">
                          <p className="font-medium text-gray-700">
                            Format: JPG, PNG, WEBP
                          </p>
                          <p>Klik pada gambar untuk mengunggah berkas baru.</p>
                          {errors.content?.documentation_items?.[index]?.image
                            ?.file?.message && (
                            <p className="text-red-500">
                              {
                                errors.content.documentation_items[index].image
                                  .file.message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  />
                </div>

                {/* INPUT TEXT: LABEL */}
                <InputText
                  label="Label / Keterangan Foto"
                  placeholder="Masukkan keterangan foto..."
                  error={
                    errors.content?.documentation_items?.[index]?.label?.message
                  }
                  {...register(`content.documentation_items.${index}.label`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          isLoading={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Memproses...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
}
