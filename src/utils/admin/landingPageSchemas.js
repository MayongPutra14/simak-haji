import { z } from 'zod';

// Schema for goal cards (Block #3)
const cardSchema = z.object({
  number: z
    .number({ invalid_type_error: 'Nomor urut harus berupa angka' })
    .min(1, 'Nomor urut minimal 1'),
  title: z.string().min(1, 'Judul kartu wajib diisi'),
  description: z.string().min(1, 'Deskripsi kartu wajib diisi'),
  badge: z.string().min(1, 'Teks badge wajib diisi'),
});

// Schema for individual story block
const storyBlockSchema = z.object({
  title: z.string().min(1, 'Judul block wajib diisi'),
  description: z.string().min(1, 'Deskripsi block wajib diisi'),
  quote: z.string().optional(),
  media: z
    .object({
      image_url: z.string().optional(),
      public_id: z.string().optional(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      file: z.any().optional(),
    })
    .optional(),
  cards: z.array(cardSchema).max(4, 'Maksimal 4 kartu').optional(),
});

export const heroEditSchema = z.object({
  content: z
    .object({
      background: z
        .object({
          file: z.any().optional(),
          alt: z.string().optional(),
          image_url: z.string().optional(),
          public_id: z.string().optional(),
        })
        .optional(),
      headline: z.string().optional(),
      subheadline: z.string().optional(),
      buttons: z
        .object({
          secondary: z
            .object({
              link: z
                .string()
                .regex(/^[0-9]*$/, 'Nomor WhatsApp hanya boleh berisi angka')
                .optional(),
            })
            .optional(),
        })
        .optional(),

      features: z
        .array(
          z.object({
            id: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .max(3, 'Maksimal 3 badge yang diperbolehkan')
        .optional(),
    })
    .optional(),
});

// Main validation schema with conditional index rules
export const aboutSectionSchema = z.object({
  content: z.object({
    story_blocks: z
      .array(storyBlockSchema)
      .max(3, 'Maksimal hanya 3 story blocks')
      .superRefine((blocks, ctx) => {
        blocks.forEach((block, index) => {
          // Rule for Block 1 & 2 (Index 0 and 1): Media/Image and Alt are mandatory
          if (index === 0 || index === 1) {
            const hasExistingImage =
              block.media?.image_url && block.media.image_url.trim() !== '';
            const hasNewFile =
              block.media?.file instanceof File ||
              (block.media?.file && block.media.file.length > 0);

            if (!hasExistingImage && !hasNewFile) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Gambar block wajib diisi',
                path: [index, 'media', 'file'],
              });
            }

            if (!block.media?.alt || block.media.alt.trim() === '') {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Teks alternatif gambar (Alt) wajib diisi',
                path: [index, 'media', 'alt'],
              });
            }
          }

          // Rule for Block 3 (Index 2): Must have at least 1 goal card
          if (index === 2) {
            if (!block.cards || block.cards.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Story Block 3 minimal harus memiliki 1 kartu tujuan',
                path: [index, 'cards'],
              });
            }
          }
        });
      }),

    closing_cta: z.object({
      title: z.string().min(1, 'Judul CTA wajib diisi'),
      description: z.string().min(1, 'Deskripsi CTA wajib diisi'),
      buttons: z.object({
        secondary: z.object({
          link: z.string().min(1, 'Link tombol sekunder wajib diisi'),
        }),
      }),
    }),
  }),
});

// TESTIMONIAL SCHEMA
// AUTHOR SCHEMA
const authorSchema = z.object({
  name: z.string().min(1, 'Nama pembuat testimoni wajib diisi'),
  departure_year: z.string().min(1, 'Tahun keberangkatan wajib diisi'),
});

// SINGLE TESTIMONIAL ITEM SCHEMA
const testimonialItemSchema = z.object({
  id: z.string().optional(),
  quote: z.string().min(1, 'Kutipan testimoni wajib diisi'),
  author: authorSchema,
});

// TESTIMONIAL SECTION SCHEMA
export const testimonialSectionSchema = z.object({
  content: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    testimonials_list: z.array(testimonialItemSchema).optional(),
  }),
});

// GALLERY SCHEMA
// IMAGE OBJECT SCHEMA
const imageObjectSchema = z.object({
  url: z.string().optional(),
  public_id: z.string().optional(),
  alt: z.string().optional(),
  file: z.any().optional(),
});

// SINGLE DOCUMENTATION ITEM SCHEMA
const documentationItemSchema = z.object({
  id: z.string().optional(),
  label: z
    .string({
      required_error: 'Label wajib diisi',
    })
    .min(1, 'Label tidak boleh kosong'),
  image: imageObjectSchema.optional(),
});

// EDIT DOCUMENTATION SECTION SCHEMA
export const editDocumentationSectionSchema = z.object({
  content: z
    .object({
      title: z
        .string({
          required_error: 'Judul wajib diisi',
        })
        .min(1, 'Judul tidak boleh kosong'),
      description: z
        .string({
          required_error: 'Deskripsi wajib diisi',
        })
        .min(1, 'Deskripsi tidak boleh kosong'),
      documentation_items: z
        .array(documentationItemSchema)
        .min(1, 'Minimal harus ada 1 item dokumentasi'),
    })
    .optional(),
});

// FAQ
// SINGLE FAQ ITEM SCHEMA
const faqItemSchema = z.object({
  id: z.string().optional(),
  // question field validation
  question: z.string().min(1, 'Pertanyaan wajib diisi'),
  // answer field validation
  answer: z.string().min(1, 'Jawaban wajib diisi'),
});

// FAQ SECTION FORM SCHEMA
export const faqSectionSchema = z.object({
  content: z.object({
    // array of faq items validation
    faq_items: z.array(faqItemSchema).min(1, 'Minimal harus ada 1 FAQ item'),
  }),
});

// FOOTER
// SOCIAL MEDIA ITEM SCHEMA
const socialMediaSchema = z.object({
  name: z.string().min(1, 'Nama media sosial wajib diisi'),
  url: z
    .string()
    .min(1, 'URL media sosial wajib diisi')
    .url('Format URL tidak valid'),
});

// FOOTER SECTION CONTENT SCHEMA
export const footerSectionSchema = z.object({
  content: z.object({
    slogan: z.string().optional(),
    address: z.string().optional(),
    social_media: z.array(socialMediaSchema).optional(),
  }),
});
