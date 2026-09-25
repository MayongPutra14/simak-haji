export const titleCase = (text) => {
  if (!text) return '';

  const cleanText = text.toLowerCase().replace(/_/g, ' ');

  if (cleanText === 'pernah umrah') {
    return 'Pernah umrah';
  }

  return cleanText
    .toLowerCase()
    .replace(/_/g, ' ')
    .split(' ')
    .map((kata) => {
      const kataKapital = kata.charAt(0).toUpperCase() + kata.slice(1);
      return kataKapital.replace(/\.[a-z]/g, (match) => match.toUpperCase());
    })
    .join(' ');
};
