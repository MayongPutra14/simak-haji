import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ requiredError: 'Email tidak boleh kosong' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string({ requiredError: 'Password tidak boleh kosong ' })
    .min(1, { message: 'Password tidak boleh kosong' })
    .min(5, { message: 'Password minimal 6 karakter' }),
});
