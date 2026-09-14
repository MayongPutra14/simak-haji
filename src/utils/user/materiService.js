export const fetchMateriData = async (materiId) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    id: materiId || 'MTR-10293',
    title: 'Materi Workshop Frontend Security',
    pdfUrl: '/dummy-materi.pdf',
    startTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    isEventActive: true,
  };
};
