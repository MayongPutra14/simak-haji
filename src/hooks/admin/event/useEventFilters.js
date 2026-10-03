// src/hooks/admin/event/useEventFilters.js
import { useState, useMemo } from 'react';

// Hardcoded daftar bulan
export const MONTH_OPTIONS = [
  { value: 'Semua Bulan', label: 'Semua Bulan' },
  { value: '01', label: 'Januari' },
  { value: '02', label: 'Februari' },
  { value: '03', label: 'Maret' },
  { value: '04', label: 'April' },
  { value: '05', label: 'Mei' },
  { value: '06', label: 'Juni' },
  { value: '07', label: 'Juli' },
  { value: '08', label: 'Agustus' },
  { value: '09', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' },
];

export const TYPE_OPTIONS = [
  { value: 'Semua Tipe', label: 'Tipe: Semua' },
  { value: 'umum', label: 'Umum' },
  { value: 'khusus', label: 'Khusus' },
];

export const STATUS_OPTIONS = [
  { value: 'Semua Status', label: 'Status: Semua' },
  { value: 'mendatang', label: 'Mendatang' },
  { value: 'live', label: 'Live' },
  { value: 'selesai', label: 'Selesai' },
];

export const useEventFilters = (events = [], onResetPage) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState('Semua Bulan');
  const [typeFilter, setTypeFilter] = useState('Semua Tipe');
  const [zoneFilter, setZoneFilter] = useState('Semua Zona');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // Automatically get a list of unique zones from the backend data
  const uniqueZones = useMemo(() => {
    const zones = new Set(events.map((e) => e.zone).filter(Boolean));
    return ['Semua Zona', ...Array.from(zones).sort()];
  }, [events]);

  // Data Filtering Logic
  const filteredEvents = useMemo(() => {
    const safeEvents = Array.isArray(events) ? events : [];

    return safeEvents.filter((event) => {
      // 1. Search Query
      const search = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        event.eventName?.toLowerCase().includes(search) ||
        event.location?.toLowerCase().includes(search) ||
        event.speaker?.toLowerCase().includes(search) ||
        String(event.id || '').includes(search);

      // 2. Month Filter (backend date format: "YYYY-MM-DD HH:mm:ss")
      let matchesMonth = true;
      if (monthFilter !== 'Semua Bulan') {
        const eventMonth = event.date ? event.date.slice(5, 7) : '';
        matchesMonth = eventMonth === monthFilter;
      }

      // 3. Type Filter (general / specific)
      const matchesType =
        typeFilter === 'Semua Tipe' ||
        event.type?.toLowerCase() === typeFilter.toLowerCase();

      // 4. Zone Filter (A, B, C, etc.)
      const matchesZone =
        zoneFilter === 'Semua Zona' ||
        String(event.zone || '').toLowerCase() ===
          String(zoneFilter).toLowerCase();

      // 5. Status Filter (upcoming, live, completed)
      const matchesStatus =
        statusFilter === 'Semua Status' ||
        event.status?.toLowerCase() === statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesMonth &&
        matchesType &&
        matchesZone &&
        matchesStatus
      );
    });
  }, [events, searchQuery, monthFilter, typeFilter, zoneFilter, statusFilter]);

  // Handler with auto reset page
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    onResetPage?.();
  };

  const handleMonthChange = (value) => {
    setMonthFilter(value);
    onResetPage?.();
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    onResetPage?.();
  };

  const handleZoneChange = (value) => {
    setZoneFilter(value);
    onResetPage?.();
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    onResetPage?.();
  };

  const isFilterActive = useMemo(() => {
    return (
      searchQuery !== '' ||
      monthFilter !== 'Semua Bulan' ||
      typeFilter !== 'Semua Tipe' ||
      zoneFilter !== 'Semua Zona' ||
      statusFilter !== 'Semua Status'
    );
  }, [searchQuery, monthFilter, typeFilter, zoneFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setMonthFilter('Semua Bulan');
    setTypeFilter('Semua Tipe');
    setZoneFilter('Semua Zona');
    setStatusFilter('Semua Status');
    onResetPage?.();
  };

  return {
    searchQuery,
    monthFilter,
    typeFilter,
    zoneFilter,
    statusFilter,
    uniqueZones,
    filteredEvents,
    isFilterActive,
    handleSearchChange,
    handleMonthChange,
    handleTypeChange,
    handleZoneChange,
    handleStatusChange,
    handleClearFilters,
  };
};
