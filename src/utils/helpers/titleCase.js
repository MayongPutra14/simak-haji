export const titleCase = (teks) => {
  if (!teks) return '';

  return teks
    .toLowerCase()
    .split(' ')
    .map((kata) => {
      // 1. Kapitalkan huruf pertama dari kata tersebut
      const kataKapital = kata.charAt(0).toUpperCase() + kata.slice(1);

      // 2. Tangani huruf setelah tanda titik (untuk gelar seperti S.Pd., M.Si.)
      return kataKapital.replace(/\.[a-z]/g, (match) => match.toUpperCase());
    })
    .join(' ');
};
