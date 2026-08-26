import z from 'zod';

export const createUserSchema = z.object({});

export const gender = [
  { label: 'Laki-laki', value: 'laki-laki' },
  { label: 'Perempuan', value: 'perempuan' },
];

export const educationOptions = [
  // --- PENDIDIKAN DASAR & MENENGAH ---
  { label: 'SD', value: 'SD' },
  { label: 'SLTP / SMP', value: 'SLTP' },
  { label: 'SLTA / SMA / SMK', value: 'SLTA' },

  // --- PENDIDIKAN TINGGI ---
  { label: 'Diploma (D1/D2/D3/D4)', value: 'Diploma' },
  { label: 'Strata 1 (S1)', value: 'S1' },
  { label: 'Strata 2 (S2)', value: 'S2' },
  { label: 'Strata 3 (S3)', value: 'S3' },
];

export const statusPortionOptions = [
  { label: 'Cadangan 1', value: 'cadangan 1' },
  { label: 'Cadangan 2', value: 'cadangan 2' },
  { label: 'Cadangan 3', value: 'cadangan 3' },
];

export const statusControlProcessOptions = [
  { label: 'Lengkap', value: 'lengkap' },
  { label: 'Menunggu', value: 'menunggu' },
  { label: 'Gagal', value: 'gagal' },
];
