// EditTestimonialSection.jsx
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testimonialSectionSchema } from '../../../utils/admin/landingPageSchemas';
import { InputText, InputNumber, TextArea } from '../../ui/inputs/index';
import { IconTrash } from '../../../utils/helpers/decorations';
import Button from '../../ui/global/Button';

export default function EditTestimonialSection({
  initialData,
  onSave,
  isLoading = false,
}) {
  // initialize form hook with zod validation resolver
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(testimonialSectionSchema),
    defaultValues: {
      content: {
        title: initialData?.content?.title || '',
        description: initialData?.content?.description || '',
        testimonials_list: initialData?.content?.testimonials_list || [
          {
            id: 'testi-1',
            quote: '',
            author: { name: '', departure_year: '' },
          },
        ],
      },
    },
  });

  // manage dynamic array for testimonials list
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content.testimonials_list',
  });

  // sync form data when initialData props change
  useEffect(() => {
    if (initialData) {
      reset({
        content: {
          title: initialData?.content?.title || '',
          description: initialData?.content?.description || '',
          testimonials_list: initialData?.content?.testimonials_list?.length
            ? initialData?.content?.testimonials_list
            : [
              {
                id: `testi-${Date.now()}`,
                quote: '',
                author: { name: '', departure_year: '' },
              },
            ],
        },
      });
    }
  }, [initialData, reset]);

  // handle form submit action
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
          EDIT TESTIMONIAL SECTION CONTENT
        </h2>
      </div>

      {/* GENERAL INFORMATION SECTION */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
          Informasi Utama
        </h3>
        <div className="space-y-4">
          {/* INPUT TEXT: TITLE */}
          <InputText
            label="Judul Section"
            placeholder="Masukkan judul section..."
            error={errors.content?.title?.message}
            {...register('content.title')}
          />

          {/* TEXTAREA: DESCRIPTION */}
          <TextArea
            label="Deskripsi Section"
            placeholder="Masukkan deskripsi section..."
            rows={3}
            error={errors.content?.description?.message}
            {...register('content.description')}
          />
        </div>
      </div>

      {/* TESTIMONIALS LIST SECTION */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
            Daftar Testimonial ({fields.length})
          </h3>
          <button
            type="button"
            disabled={fields.length >= 4}
            onClick={() =>
              append({
                id: `testi-${Date.now()}`,
                quote: '',
                author: { name: '', departure_year: '' },
              })
            }
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              fields.length >= 4
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-sea-green-600 text-white hover:bg-sea-green-700'
            }`}
          >
            + Tambahkan Testimonial
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
                  Testimonial-{index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="REMOVE TESTIMONIAL ITEM"
                  >
                    <IconTrash />
                  </button>
                )}
              </div>

              {/* TEXTAREA: QUOTE */}
              <TextArea
                label="Kutipan / Testimonial"
                placeholder="Masukkan pesan testimonial jamaah..."
                rows={3}
                error={
                  errors.content?.testimonials_list?.[index]?.quote?.message
                }
                {...register(`content.testimonials_list.${index}.quote`)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* INPUT TEXT: AUTHOR NAME */}
                <InputText
                  label="Nama Jamaah"
                  placeholder="Contoh: Ahmad Fauzi"
                  error={
                    errors.content?.testimonials_list?.[index]?.author?.name
                      ?.message
                  }
                  {...register(
                    `content.testimonials_list.${index}.author.name`,
                  )}
                />

                {/* INPUT NUMBER: DEPARTURE YEAR */}
                <InputNumber
                  label="Tahun Keberangkatan"
                  placeholder="Contoh: 2024"
                  error={
                    errors.content?.testimonials_list?.[index]?.author
                      ?.departure_year?.message
                  }
                  {...register(
                    `content.testimonials_list.${index}.author.departure_year`,
                  )}
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
          className="px-6 py-2.5 rounded-lg text-sm font-medium bg-sea-green-600 text-white hover:bg-sea-green-700 disabled:bg-gray-400 transition cursor-pointer"
        >
          {isSubmitting || isLoading ? 'Memproses...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
}
