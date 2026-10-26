import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { footerSectionSchema } from '../../../utils/admin/landingPageSchemas';
import { InputText, TextArea } from '../../ui/inputs';
import { IconTrash } from '../../../utils/helpers/decorations';

export default function EditFooterSection({
  initialData,
  onSave,
  isLoading = false,
}) {
  // initialize react hook form with zod validation resolver
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(footerSectionSchema),
    defaultValues: {
      content: {
        slogan: initialData?.content?.slogan || '',
        address: initialData?.content?.address || '',
        social_media: initialData?.content?.social_media || [
          { name: '', icon: '', url: '' },
        ],
      },
    },
  });

  // manage dynamic array for social media links
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content.social_media',
  });

  // sync form state with incoming initialData prop
  useEffect(() => {
    if (initialData) {
      reset({
        content: {
          slogan: initialData.content?.slogan || '',
          address: initialData.content?.address || '',
          social_media: initialData.content?.social_media?.length
            ? initialData.content.social_media
            : [{ name: '', url: '' }],
        },
      });
    }
  }, [initialData, reset]);

  // handle form submission
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
          EDIT FOOTER SECTION CONTENT
        </h2>
      </div>

      {/* GENERAL FOOTER CONTENT */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
          Konten Utama Footer
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* INPUT TEXT: SLOGAN */}
          <InputText
            label="Slogan Footer"
            placeholder="Masukkan slogan footer..."
            error={errors.content?.slogan?.message}
            {...register('content.slogan')}
          />

          {/* TEXT AREA: ADDRESS */}
          <TextArea
            label="Alamat Perusahaan / Kantor"
            placeholder="Masukkan alamat lengkap..."
            rows={3}
            error={errors.content?.address?.message}
            {...register('content.address')}
          />
        </div>
      </div>

      {/* SOCIAL MEDIA LIST */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
            Media Sosial ({fields.length})
          </h3>
          <button
            type="button"
            disabled={fields.length >= 5}
            onClick={() =>
              append({
                name: '',
                icon: '',
                url: '',
              })
            }
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              fields.length >= 5
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-sea-green-600 text-white hover:bg-sea-green-700'
            }`}
          >
            + Tambahkan Media Sosial
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
                  Media Sosial-{index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    title="REMOVE SOCIAL MEDIA ITEM"
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  >
                    <IconTrash />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* INPUT TEXT: SOCIAL MEDIA NAME */}
                <InputText
                  label="Nama Media Sosial"
                  placeholder="Contoh: Instagram"
                  error={errors.content?.social_media?.[index]?.name?.message}
                  {...register(`content.social_media.${index}.name`)}
                />

                {/* INPUT TEXT: URL */}
                <InputText
                  label="URL / Tautan"
                  placeholder="https://instagram.com/username"
                  error={errors.content?.social_media?.[index]?.url?.message}
                  {...register(`content.social_media.${index}.url`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="px-6 py-2.5 bg-sea-green-600 text-white font-medium rounded-lg hover:bg-sea-green-700 transition disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting || isLoading ? 'Memproses...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
