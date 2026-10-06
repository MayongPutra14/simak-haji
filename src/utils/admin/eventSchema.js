import z from 'zod';

// regex latitude and longitude for coma(.) and minus (-)
const coordinateRegex = /^-?\d*(\.\d*)?$/;

// material settings
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
const ACCEPTED_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
];

export const EventSchema = z.object({
  eventName: z.string().min(1, 'Nama acara wajib diisi'),
  description: z.string().nullable().optional(),
  venue: z.string().min(1, 'Lokasi acara wajib diisi'),
  speaker: z.string().min(1, 'Nama pembicara wajib diisi'),
  eventCategory: z.string().min(1, 'Jenis event wajib diisi'),
  targetZone: z.string().nullable().optional(),
  eventMaterial: z.union(
    [
      // Case 1: User uploads a new file (Reading FileList from React Hook Form)
      z.custom(
        (val) => {
          // Check if this is a FileList and contains at least 1 file
          if (!(val instanceof FileList) || val.length === 0) return false;

          const file = val[0]; // Get the first file

          // Validate size (maximum 5 MB)
          if (file.size > MAX_FILE_SIZE) return false;

          // Validate file extension
          const fileExtension = file.name.split('.').pop()?.toLowerCase();
          return ACCEPTED_EXTENSIONS.includes(fileExtension || '');
        },
        {
          message:
            'Material file is required. Allowed formats are PDF/Word/PPT/Excel, with a maximum size of 5 MB.',
        },
      ),
      // Case 2: Accepts an existing file URL string (if in edit mode)
      z.string().min(1, { message: 'Material file is required.' }),
    ],
    {
      required_error: 'Material file is required.',
    },
  ),
  latitude: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim().length > 0, { message: 'Latitude wajib diisi' })
    .refine((val) => coordinateRegex.test(val), {
      message:
        'Format koordinat tidak valid (input hanya boleh angka dan gunakan titik untuk desimal)',
    })
    .transform((val) => parseFloat(val)),
  longitude: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim().length > 0, {
      message: 'Longitude wajib diisi',
    })
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
  { label: 'Khusus', value: 'khusus' },
];

export const zonaOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
];
