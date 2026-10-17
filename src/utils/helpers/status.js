export const getAttendanceStatus = (status, isAttended) => {
  if (isAttended === 1) {
    return {
      label: 'Hadir',
      badgeClass: 'bg-sea-green-100 text-sea-green-700',
    };
  }

  return {
    label: 'Absen',
    badgeClass: 'bg-red-100 text-red-700',
  };
};

export const getEventStatus = (status) => {
  if (status === 'live') {
    return {
      label: 'Live',
      badgeClass: 'bg-galliano-100 text-galliano-700',
    };
  }

  if (status === 'selesai') {
    return {
      label: 'Selesai',
      badgeClass: 'bg-sea-green-100 text-sea-green-700',
    };
  }

  return {
    label: 'mendatang',
    badgeClass: 'bg-slate-100 text-slate-700',
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
  return { label: 'Mendatang', color: 'bg-red-100 text-red-700' };
};

export const getDocumentStatus = (value) => {
  if (value?.trim().length > 0 && value?.toLowerCase() !== 'menunggu') {
    return 'Ok';
  }

  return 'Menunggu';
};

export const getButtonLabel = (status, isAttended) => {
  if (status.toLowerCase() === 'live' && isAttended === 0) {
    return 'Absen via QR';
  }
  return 'Materi Bacaan';
};

// EVENT ACTION TYPES
export const EVENT_ACTION_TYPES = {
  SCAN: 'SCAN',
  MATERIAL: 'MATERIAL',
  NONE: 'NONE',
};

// HELPER FUNCTIONS

/**
 * evaluates event state and returns action configuration
 * @param {string} status - event status ('live' | 'mendatang' | 'selesai')
 * @param {boolean|number} isAttended - user attendance status
 * @returns {object} button configuration object containing label, disabled state, and action type
 */
export const getEventActionConfig = (status = '', isAttended = false) => {
  const normalizedStatus = String(status).toLowerCase();
  const hasAttended = Boolean(isAttended);

  // live event and user has not attended yet
  if (normalizedStatus === 'live' && !hasAttended) {
    return {
      label: 'Absen via QR',
      disabled: false,
      actionType: EVENT_ACTION_TYPES.SCAN,
    };
  }

  // live event and user has already attended
  if (normalizedStatus === 'live' && hasAttended) {
    return {
      label: 'Buka Materi',
      disabled: false,
      actionType: EVENT_ACTION_TYPES.MATERIAL,
    };
  }

  // upcoming event
  if (normalizedStatus === 'mendatang') {
    return {
      label: 'Belum Dimulai',
      disabled: true,
      actionType: EVENT_ACTION_TYPES.NONE,
    };
  }

  // completed event (locked material)
  return {
    label: 'Materi Terkunci',
    disabled: true,
    actionType: EVENT_ACTION_TYPES.NONE,
  };
};
