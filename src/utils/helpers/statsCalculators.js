// Administration Completeness Calculation (Horizontal Bar)
export const calculateAdministrationStats = (users = []) => {
  if (!users.length) return [];

  const adminFields = [
    { key: 'statusGoogleForm', label: 'G-Form', color: '#6366F1' },
    { key: 'statusPhoto', label: 'Photo', color: '#06B6D4' },
    { key: 'statusSpph', label: 'SPPH', color: '#10B981' },
    { key: 'statusMutasi', label: 'Mutasi', color: '#F59E0B' },
    { key: 'statusBiometrik', label: 'Biometrik', color: '#EC4899' },
    { key: 'statusPuskesmas', label: 'Puskesmas', color: '#8B5CF6' },
    { key: 'statusMCU', label: 'MCU', color: '#3B82F6' },
    { key: 'statusPelunasan', label: 'Pelunasan', color: '#14B8A6' },
    { key: 'statusPassport', label: 'Passport', color: '#F97316' },
    { key: 'statusVisa', label: 'Visa', color: '#E11D48' },
  ];

  const totalUsers = users.length;

  return adminFields.map(({ key, label, color }) => {
    const okCount = users.filter((u) => u[key]?.toLowerCase() === 'ok').length;
    const percentage = Math.round((okCount / totalUsers) * 100);

    return {
      name: label,
      percentage: percentage,
      okCount: okCount,
      total: totalUsers,
      color: color,
    };
  });
};

// Zone Distribution Calculation (Pie / Donut Chart)
export const calculateZoneStats = (users = []) => {
  const zones = ['A', 'B', 'C', 'D', 'E', 'F'];
  const totalUsers = users.length;

  const zoneColors = {
    A: '#10B981', // Emerald
    B: '#3B82F6', // Blue
    C: '#8B5CF6', // Purple
    D: '#F59E0B', // Amber
    E: '#EC4899', // Pink
    F: '#64748B', // Slate
  };

  return zones.map((zone) => {
    const count = users.filter((u) => u.zone === zone).length;
    const percentage = totalUsers ? Math.round((count / totalUsers) * 100) : 0;

    return {
      name: `Zona ${zone}`,
      zoneKey: zone,
      value: count,
      percentage: percentage,
      color: zoneColors[zone],
    };
  });
};

//  Calculator Unique Zone
export const calculateUniqueZone = (users = []) => {
  const uniqueZone = new Set(users.map((user) => user.zone));

  const totalUniqueZone = uniqueZone.size;

  return totalUniqueZone;
};

// Completness dokcuments calculator
export const calculateDocumentCompletenessSummary = (users = []) => {
  if (!users.length) {
    return {
      completeCount: 0,
      completePercentage: 0,
      incompleteCount: 0,
      incompletePercentage: 0,
    };
  }

  const documentKeys = [
    'statusGoogleForm',
    'statusPhoto',
    'statusSpph',
    'statusMutasi',
    'statusBiometrik',
    'statusPuskesmas',
    'statusMCU',
    'statusPelunasan',
    'statusPassport',
    'statusVisa',
  ];

  let completeCount = 0;

  users.forEach((user) => {
    const isAllOk = documentKeys.every(
      (key) => user[key]?.toLowerCase() === 'ok',
    );
    if (isAllOk) {
      completeCount++;
    }
  });

  const totalUsers = users.length;
  const incompleteCount = totalUsers - completeCount;

  const completePercentage = Math.round((completeCount / totalUsers) * 100);
  const incompletePercentage = 100 - completePercentage;

  return {
    completeCount,
    completePercentage,
    incompleteCount,
    incompletePercentage,
  };
};
