import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { InputNumber, InputText } from '../../ui/inputs';
import { IconTrash } from '../../../utils/helpers/decorations';
import Button from '../../ui/global/Button';

export default function EditStatisticSection({
  initialData,
  onSave,
  isLoading = false,
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      content: {
        stats_items: initialData?.content?.stats_items || [
          { id: 'stat-1', value: '', label: '' },
        ],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content.stats_items',
  });

  // Sync data dari props saat initialData tersedia
  useEffect(() => {
    if (initialData) {
      reset({
        content: {
          stats_items: initialData.content?.stats_items?.length
            ? initialData.content.stats_items
            : [{ id: `stat-${Date.now()}`, value: '', label: '' }],
        },
      });
    }
  }, [initialData, reset]);

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
          EDIT STATISTIC SECTION CONTENT
        </h2>
      </div>

      {/* STATS ITEMS LIST */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
            Item Statistik ({fields.length} / 4)
          </h3>
          <button
            type="button"
            disabled={fields.length >= 4}
            onClick={() =>
              append({
                id: `stat-${Date.now()}`,
                value: '',
                label: '',
              })
            }
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              fields.length >= 3
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-sea-green-600 text-white hover:bg-sea-green-700'
            }`}
          >
            + Tambahkan Statistik
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
                  Statistik-{index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="REMOVE STATISTIC ITEM"
                  >
                    <IconTrash />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* INPUT NUMBER: VALUE */}
                <InputNumber
                  label="Nilai Angka"
                  placeholder="500"
                  error={errors.content?.stats_items?.[index]?.value?.message}
                  {...register(`content.stats_items.${index}.value`, {
                    required: 'Nilai angka wajib diisi',
                  })}
                />

                {/* INPUT TEXT: LABEL */}
                <InputText
                  label="Label Statistik"
                  placeholder="Klien Aktif"
                  error={errors.content?.stats_items?.[index]?.label?.message}
                  {...register(`content.stats_items.${index}.label`, {
                    required: 'Label statistik wajib diisi',
                  })}
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
