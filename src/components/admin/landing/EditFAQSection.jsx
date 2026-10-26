import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../ui/global/Button';
import { faqSectionSchema } from '../../../utils/admin/landingPageSchemas';
import { InputText, TextArea } from '../../ui/inputs/index';
import { IconTrash } from '../../../utils/helpers/decorations';

export default function EditFAQSection({
  initialData,
  onSave,
  isLoading = false,
}) {
  // react-hook-form setup with zod validation resolver
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(faqSectionSchema),
    defaultValues: {
      content: {
        faq_items: initialData?.content?.faq_items || [
          { id: 'f-1', question: '', answer: '' },
        ],
      },
    },
  });

  // field array controller for managing dynamic faq items
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content.faq_items',
  });

  // sync initial data from props when available
  useEffect(() => {
    if (initialData) {
      reset({
        content: {
          faq_items: initialData.content?.faq_items?.length
            ? initialData.content.faq_items
            : [{ id: `f-${Date.now()}`, question: '', answer: '' }],
        },
      });
    }
  }, [initialData, reset]);

  // form submit handler
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
          EDIT FAQ SECTION CONTENT
        </h2>
      </div>

      {/* FAQ ITEMS LIST */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
            Item FAQ ({fields.length})
          </h3>
          <button
            type="button"
            onClick={() =>
              append({
                id: `f-${Date.now()}`,
                question: '',
                answer: '',
              })
            }
            className="px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer bg-sea-green-600 text-white hover:bg-sea-green-700"
          >
            + Tambahkan FAQ
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
                  FAQ-{index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="REMOVE FAQ ITEM"
                  >
                    <IconTrash />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* INPUT TEXT: QUESTION */}
                <InputText
                  label="Pertanyaan"
                  placeholder="Masukkan pertanyaan..."
                  error={errors.content?.faq_items?.[index]?.question?.message}
                  {...register(`content.faq_items.${index}.question`)}
                />

                {/* TEXTAREA: ANSWER */}
                <TextArea
                  label="Jawaban"
                  placeholder="Masukkan jawaban..."
                  rows={4}
                  error={errors.content?.faq_items?.[index]?.answer?.message}
                  {...register(`content.faq_items.${index}.answer`)}
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
          className="px-6 py-2.5 bg-sea-green-600 text-white rounded-lg font-medium hover:bg-sea-green-700 disabled:opacity-50 transition cursor-pointer"
        >
          {isSubmitting || isLoading ? 'Memproses...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
}
