/**
 * Calculate age based on birth date. Menghitung usia akurat berdasarkan tanggal lahir
 * @param {string} birthDay - Format: 'YYYY-MM-DD'
 * @returns {number} age in a year
 */

export const hitungUmur = (birthDay) => {
  if (!birthDay) return 0;

  const currentDay = new Date();
  const birtDate = new Date(birthDay);

  let umur = currentDay.getFullYear() - birtDate.getFullYear();
  const monthDifference = currentDay.getMonth() - birtDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDay.getDate() < birtDate.getDate())
  ) {
    umur--;
  }

  return umur;
};

/**
 * Change format to Indonesia date
 * Example: '2026-08-25' become '25 Agustus 2026'
 */
export const formatTanggalIndonesia = (date) => {
  if (!date) return '-';
  const opsi = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', opsi);
};
