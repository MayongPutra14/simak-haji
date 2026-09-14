export const getAttendanceStatus = (status, isAttended) => {
  if (isAttended === 1) {
    return {
      label: 'Hadir',
      badgeClass: 'bg-sea-green-100 text-sea-green-400',
    };
  }

  return {
    label: 'Absen',
    badgeClass: 'bg-red-100 text-red-400',
  };
};

export const getEventStatus = (status) => {
  if (status === 'live') {
    return {
      label: 'Live',
      badgeClass: 'bg-galliano-100 text-galliano-400',
    };
  }

  if (status === 'selesai') {
    return {
      label: 'Selesai',
      badgeClass: 'bg-slate-100 text-slate-400',
    };
  }

  return {
    label: 'mendatang',
    badgeClass: 'bg-sea-green-100 text-sea-green-400',
  };
};

export const getStatusConfig = (status) => {
  const currentStatus = status.toLowerCase();
  if (currentStatus === 'live')
    return {
      label: 'Live',
      color: 'bg-yellow-100 text-yellow-700 animate-pulse duration-300',
    };
  if (currentStatus === 'completed')
    return { label: 'Selesai', color: 'bg-green-100 text-green-700' };
  return { label: 'Belum Dimulai', color: 'bg-red-100 text-red-700' };
};

export const getButtonLabel = (status, isAttended) => {
  if (status.toLowerCase() === 'live' && isAttended === 0) {
    return 'Absen via QR';
  }
  return 'Materi Bacaan';
};
