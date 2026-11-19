import { z } from 'zod';

export const loginSchema = z.object({
  porsiNumber: z
    .string()
    .length(10, 'Nomor porsi harus persis 10 digit')
    .regex(/^[0-9]+$/, 'Nomor porsi hanya boleh berisi angka'),
  password: z
    .string({ requiredError: 'Password tidak boleh kosong ' })
    .min(1, { message: 'Password tidak boleh kosong' })
    .min(5, { message: 'Password minimal 6 karakter' }),
});
