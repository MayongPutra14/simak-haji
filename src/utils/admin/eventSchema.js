import z from 'zod';

// regex latitude and longitude for coma(.) and minus (-)
const coordinateRegex = /^-?\d*(\.\d*)?$/;

export const EventSchema = z.object({
  eventName: z.string().min(1, 'Nama acara wajib diisi'),
  description: z.string().nullable().optional(),
  venue: z.string().min(1, 'Lokasi acara wajib diisi'),
  speaker: z.string().min(1, 'Nama pembicara wajib diisi'),
  eventCategory: z.string().min(1, 'Jenis event wajib diisi'),
  targetZone: z.string().nullable().optional(),
  latitude: z
    .string()
    .min(1, { message: 'Latitude wajib diisi' })
    .refine((val) => coordinateRegex.test(val), {
      message:
        'Format koordinat tidak valid (input hanya boleh angka dan gunakan titik untuk desimal)',
    })
    .transform((val) => parseFloat(val)),
  longitude: z
    .string()
    .min(1, { message: 'Longitude wajib diisi' })
    .refine((val) => coordinateRegex.test(val), {
      message:
        'Format koordinat tidak valid (input hanya boleh angka dan gunakan titik untuk desimal)',
    })
    .transform((val) => parseFloat(val)),
  radius: z
    .string()
    .min(1, { message: 'Radius wajib diisi' })
    .refine((val) => /^\d*(\.\d*)?$/.test(val), {
      message: 'Radius harus berupa angka valid (gunakan titik untuk desimal)',
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: 'Radius harus lebih besar dari 0',
    }),
  eventDate: z.iso.date({
    error: (issue) =>
      issue.input === undefined || issue.input === ''
        ? 'Tanggal acara wajib diisi'
        : 'Format tanggal tidak valid',
  }),
  eventTime: z.iso.time({
    error: (issue) =>
      issue.input === undefined || issue.input === ''
        ? 'Waktu acara wajib diisi'
        : 'Format waktu tidak valid',
  }),
});

export const eventCategoryOptions = [
  { label: 'Umum', value: 'umum' },
  { label: 'Zona', value: 'zona' },
];

export const zonaOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
];
