import { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aboutSectionSchema } from '../../../utils/admin/landingPageSchemas';
import Button from '../../ui/global/Button';
import { IconCamera, IconTrash } from '../../../utils/helpers/decorations';
import { InputText, InputNumber, TextArea } from '../../ui/inputs/index';
import { DynamicCardsList } from '../../ui/global/HelperComponents';

export default function EditAboutSection({
  initialData,
  onSave,
  isLoading = false,
}) {
  // Local image preview state indexed by form field path
  const [previews, setPreviews] = useState({});

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(aboutSectionSchema),
    defaultValues: initialData || {
      content: {
        story_blocks: [],
        closing_cta: {
          title: '',
          description: '',
          buttons: {
            secondary: {
              link: '',
            },
          },
        },
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

  const {
    fields: blockFields,
    append: appendBlock,
    remove: removeBlock,
  } = useFieldArray({
    control,
    name: 'content.story_blocks',
  });

  // Maximum allowed story blocks
  const MAX_BLOCKS = 3;

  // Handle local image file updates
  const handleImageChange = (file, onChange, fieldName) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [fieldName]: previewUrl }));
      onChange(file);
    }
  };

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
          EDIT ABOUT SECTION CONTENT
        </h2>
      </div>

      {/* STORY BLOCKS MANAGEMENT */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
            STORY BLOCKS ({blockFields.length}/{MAX_BLOCKS})
          </h3>
          <button
            type="button"
            onClick={() =>
              appendBlock({
                title: '',
                description: '',
                quote: '',
                media: { image_url: '', public_id: '', alt: '', caption: '' },
              })
            }
            disabled={blockFields.length >= MAX_BLOCKS}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              blockFields.length >= MAX_BLOCKS
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-sea-green-600 text-white hover:bg-sea-green-700'
            }`}
          >
            Tambahkan Story Block
          </button>
        </div>

        <div className="space-y-6">
          {blockFields.map((block, index) => {
            const blockErrors = errors?.content?.story_blocks?.[index];
            const fieldImageName = `content.story_blocks.${index}.media.file`;
            const currentPreview =
              previews[fieldImageName] || block.media?.image_url;

            // Media uploads are ONLY for Block 1 & 2 (index 0 and 1)
            const isMediaSupported = index === 0 || index === 1;

            // Goal Cards are ONLY for Block 3 (index 2)
            const isCardsSupported = index === 2;

            return (
              <div
                key={block.id}
                className="p-5 border border-gray-200 rounded-xl space-y-6 bg-gray-50/50 relative"
              >
                {/* BLOCK HEADER & ACTION */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-bold text-sea-green-800 text-md">
                    Story Block {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Hapus Story Block"
                  >
                    <IconTrash />
                  </button>
                </div>

                {/* HIDDEN MEDIA METADATA FIELDS (Block 1 & 2 only) */}
                {isMediaSupported && (
                  <>
                    <input
                      type="hidden"
                      {...register(
                        `content.story_blocks.${index}.media.image_url`,
                      )}
                    />
                    <input
                      type="hidden"
                      {...register(
                        `content.story_blocks.${index}.media.public_id`,
                      )}
                    />
                  </>
                )}

                {/* TITLE & QUOTE INPUTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputText
                    label="Judul Block"
                    placeholder="Mengenal Lebih Dekat Tim & Layanan Kami"
                    error={blockErrors?.title?.message}
                    {...register(`content.story_blocks.${index}.title`)}
                  />
                  <InputText
                    label="Kutipan / Quote (Opsional)"
                    placeholder="Inovasi lahir dari keberanian..."
                    error={blockErrors?.quote?.message}
                    {...register(`content.story_blocks.${index}.quote`)}
                  />
                </div>

                {/* DESCRIPTION */}
                <TextArea
                  label="Deskripsi Block"
                  placeholder="Kami adalah sekelompok profesional yang berfokus..."
                  rows={3}
                  error={blockErrors?.description?.message}
                  {...register(`content.story_blocks.${index}.description`)}
                />

                {/* MEDIA / IMAGE SECTION (Only Block 1 & Block 2) */}
                {isMediaSupported && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                    <h4 className="font-semibold text-slate-700 text-sm border-l-4 border-sea-green-500 pl-2">
                      MEDIA / GAMBAR BLOCK
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <Controller
                        name={fieldImageName}
                        control={control}
                        render={({ field: { onChange, ref } }) => (
                          <div className="flex items-center gap-4">
                            <div className="relative group shrink-0">
                              <img
                                src={
                                  currentPreview ||
                                  'https://placehold.co/600x400?text=No+Block+Image'
                                }
                                alt="Media Preview"
                                className="object-cover border-4 shadow-md w-36 h-24 md:w-48 md:h-32 rounded-2xl border-slate-400/30"
                              />
                              <label
                                htmlFor={`storyBlockImage-${index}`}
                                className="absolute inset-0 flex flex-col items-center justify-center text-xs font-medium text-white transition-opacity opacity-0 cursor-pointer bg-black/50 rounded-2xl group-hover:opacity-100"
                              >
                                <IconCamera className="w-6 h-6 mb-1" />
                                Ganti Gambar
                              </label>

                              <input
                                type="file"
                                id={`storyBlockImage-${index}`}
                                ref={ref}
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  handleImageChange(
                                    file,
                                    onChange,
                                    fieldImageName,
                                  );
                                }}
                              />
                            </div>

                            <div className="text-xs text-gray-500 space-y-1">
                              <p className="font-medium text-gray-700">
                                Format: JPG, PNG, WEBP
                              </p>
                              <p>
                                Klik pada gambar untuk mengunggah berkas baru.
                              </p>
                              {blockErrors?.media?.file?.message && (
                                <p className="text-red-500">
                                  {blockErrors.media.file.message}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      />

                      <div className="space-y-3">
                        <InputText
                          label="Teks Alternatif Gambar (Alt)"
                          placeholder="Foto Tim Kami"
                          error={blockErrors?.media?.alt?.message}
                          {...register(
                            `content.story_blocks.${index}.media.alt`,
                          )}
                        />
                        <InputText
                          label="Keterangan Gambar (Caption)"
                          placeholder="Suasana kolaborasi di studio kami"
                          error={blockErrors?.media?.caption?.message}
                          {...register(
                            `content.story_blocks.${index}.media.caption`,
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* NESTED GOAL CARDS LIST (Only Block 3) */}
                {isCardsSupported && (
                  <DynamicCardsList
                    nestIndex={index}
                    control={control}
                    register={register}
                    errors={errors}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CLOSING CTA SECTION */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-700 text-lg border-l-5 border-sea-green-500 pl-2">
          Call To Action
        </h3>

        <InputText
          label="Judul"
          placeholder="Mari Buat Proyek Impian Anda Bersama Kami"
          error={errors.content?.closing_cta?.title?.message}
          {...register('content.closing_cta.title')}
        />

        <TextArea
          label="Deskripsi"
          placeholder="Hubungi tim kami hari ini dan dapatkan sesi diskusi mendalam..."
          rows={3}
          error={errors.content?.closing_cta?.description?.message}
          {...register('content.closing_cta.description')}
        />

        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <h4 className="font-bold text-sea-green-700">Tombol Whatsapp</h4>
          <InputNumber
            label="Nomor Whatsapp"
            placeholder="089781507741"
            error={
              errors.content?.closing_cta?.buttons?.secondary?.link?.message
            }
            {...register('content.closing_cta.buttons.secondary.link')}
          />
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
