import { useState, useMemo } from 'react';

export const ADMIN_DOC_FIELDS = [
  { key: 'statusGoogleForm', label: 'G-Form' },
  { key: 'statusPhoto', label: 'Photo' },
  { key: 'statusSpph', label: 'SPPH' },
  { key: 'statusMutasi', label: 'Mutasi' },
  { key: 'statusBiometrik', label: 'Biometrik' },
  { key: 'statusPuskesmas', label: 'Puskesmas' },
  { key: 'statusMCU', label: 'MCU' },
  { key: 'statusPelunasan', label: 'Pelunasan' },
  { key: 'statusPassport', label: 'Passport' },
  { key: 'statusVisa', label: 'Visa' },
];

const INITIAL_DOC_FILTERS = ADMIN_DOC_FIELDS.reduce((acc, field) => {
  acc[field.key] = 'Semua';
  return acc;
}, {});

export const useUserFilters = (users, onResetPage) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('Semua Zona');
  const [yearFilter, setYearFilter] = useState('Semua Tahun');
  const [docFilters, setDocFilters] = useState(INITIAL_DOC_FILTERS);

  // 1. AUTOMATICALLY GET THE ZONE LIST FROM BACKEND DATA
  const uniqueZones = useMemo(() => {
    // Set will remove duplicates. filter(Boolean) discards null/undefined data
    const zones = new Set(users.map((u) => u.zone).filter(Boolean));
    return ['Semua Zona', ...Array.from(zones).sort()];
  }, [users]);

  // 2. AUTOMATICALLY GET THE YEAR LIST FROM BACKEND DATA
  const uniqueYears = useMemo(() => {
    const years = new Set(users.map((u) => u.statusPortion).filter(Boolean));
    return ['Semua Tahun', ...Array.from(years).sort()];
  }, [users]);

  // 3. FILTER LOGIC (Runs independently or combined)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // 1. Amankan pencarian dari nilai null/undefined
      const name = user.fullName || '';
      const portion = String(user.portionNumber || '');
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        name.toLowerCase().includes(search) || portion.includes(search);

      // 2. Gunakan String() agar aman jika backend mengirim angka (Integer)
      const matchesZone =
        zoneFilter === 'Semua Zona' || String(user.zone) === String(zoneFilter);

      const matchesYear =
        yearFilter === 'Semua Tahun' ||
        String(user.statusPortion) === String(yearFilter);

      const matchesDocs = ADMIN_DOC_FIELDS.every(({ key }) => {
        const filterVal = docFilters[key];
        if (filterVal === 'Semua') return true;
        return user[key]?.toLowerCase() === filterVal.toLowerCase();
      });

      return matchesSearch && matchesZone && matchesYear && matchesDocs;
    });
  }, [users, searchQuery, zoneFilter, yearFilter, docFilters]);

  // 4. HANDLERS THAT AUTOMATICALLY RESET PAGE TO 1
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    onResetPage();
  };

  const handleZoneChange = (value) => {
    setZoneFilter(value);
    onResetPage();
  };

  const handleYearChange = (value) => {
    setYearFilter(value);
    onResetPage();
  };

  const handleDocFilterChange = (key, value) => {
    setDocFilters((prev) => ({ ...prev, [key]: value }));
    onResetPage?.();
  };

  const isFilterActive = useMemo(() => {
    const hasActiveDoc = Object.values(docFilters).some((v) => v !== 'Semua');
    return (
      zoneFilter !== 'Semua Zona' ||
      yearFilter !== 'Semua Tahun' ||
      searchQuery !== '' ||
      hasActiveDoc
    );
  }, [zoneFilter, yearFilter, searchQuery, docFilters]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setZoneFilter('Semua Zona');
    setYearFilter('Semua Tahun');
    setDocFilters(INITIAL_DOC_FILTERS);
    onResetPage();
  };

  return {
    searchQuery,
    zoneFilter,
    yearFilter,
    docFilters,
    uniqueZones,
    uniqueYears,
    filteredUsers,
    isFilterActive,
    handleSearchChange,
    handleZoneChange,
    handleYearChange,
    handleDocFilterChange,
    handleClearFilters,
  };
};
