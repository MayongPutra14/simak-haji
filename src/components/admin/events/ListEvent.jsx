import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Table from '../../ui/global/Table';
import SearcInput from '../../ui/inputs/SeacrhInput';
import Button from '../../ui/global/Button';
import StatisticContainer from '../../ui/global/StatisticContainer';
import Modal from '../../ui/global/Modal';
import InlineFilterBar from '../components/InlineFilterBar';
import { ListAdminEventColumns } from '../../../features/admin/ListAdminEventColumns';
import { SkeletonTableAdminUsers } from '../../ui/global/skeletons/index';
import { calculateUniqueZone } from '../../../utils/helpers/statsCalculators';
import {
  useEventFilters,
  MONTH_OPTIONS,
  TYPE_OPTIONS,
  STATUS_OPTIONS,
} from '../../../hooks/admin/event/useEventFilters';
import {
  IconOnline,
  IconAdd,
  IconNav,
  IconPeople,
  IconSpecial,
  IconWarning,
} from '../../../utils/helpers/decorations';

export default function ListEvents({
  events = [],
  isLoading = false,
  error = null,
  onDelete,
}) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [localDeleteError, setLocalDeleteError] = useState(null);

  const itemsPerPage = 10;

  // Function reset page
  const handleResetPage = useCallback(() => setCurrentPage(1), []);

  // Custom Hook Filter
  const {
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
  } = useEventFilters(events, handleResetPage);

  // Generic Configuration InlineFilterBar.jsx
  const filterConfigs = useMemo(
    () => [
      {
        key: 'month',
        value: monthFilter,
        onChange: handleMonthChange,
        options: MONTH_OPTIONS,
      },
      {
        key: 'zone',
        value: zoneFilter,
        onChange: handleZoneChange,
        options: uniqueZones.map((z) => ({
          value: z,
          label: z === 'Semua Zona' ? z : `${z}`,
        })),
      },
      {
        key: 'status',
        value: statusFilter,
        onChange: handleStatusChange,
        options: STATUS_OPTIONS,
      },
      {
        key: 'category',
        value: typeFilter,
        onChange: handleTypeChange,
        options: TYPE_OPTIONS,
      },
    ],
    [
      monthFilter,
      typeFilter,
      zoneFilter,
      statusFilter,
      uniqueZones,
      handleMonthChange,
      handleTypeChange,
      handleZoneChange,
      handleStatusChange,
    ],
  );

  // CALCULATION FOR PAGINATION
  const totalItems = filteredEvents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  // HANDLER DELETE EVENT
  async function confirmDelete() {
    if (!deleteTarget || !onDelete) return;

    setLocalDeleteError(null);
    const result = await onDelete(deleteTarget.id);

    if (result.status === 'success') {
      setDeleteTarget(null);

      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } else {
      setLocalDeleteError(result?.message || 'Gagal menghapus event');
    }
  }

  function handleCloseModal() {
    if (isLoading) return;
    setDeleteTarget(null);
    setLocalDeleteError(null);
  }

  // COLUMNS DEFINITION
  const columns = useMemo(
    () =>
      ListAdminEventColumns({
        onDelete: (event) => {
          setDeleteTarget(event);
          setLocalDeleteError(null);
        },
        onViewDetail: (event) => {
          navigate(`/admin/events/detail/${event.id}`);
        },
        onEdit: (event) => {
          navigate(`/admin/events/edit/${event.id}`);
        },
      }),
    [navigate],
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6 w-[95%] md:w-[98%] mx-auto p-4 my-4 rounded-xl shadow-md">
        {/* HEADER AREA: Inline Filter & Button Add */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* SEARCH INPUT */}
          <div className="w-full md:w-[70%]">
            <SearcInput
              placeHolder="Cari event, lokasi, pembicara..."
              searchQuery={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* BUTTON ADD NEW EVENT */}
          <Button
            className="flex items-center justify-center w-full gap-2 px-4 py-2 md:w-auto shrink-0"
            variant="primary"
            to="/admin/events/create"
          >
            <IconAdd className="w-5 h-5" />
            Tambah Acara
          </Button>
        </section>

        {/* BASIC STATISTIC */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
          <StatisticContainer
            label="Total Event"
            value={events.length.toLocaleString('id-ID')}
            icon={IconPeople}
            bgClass="bg-emerald-300 border-emerald-200"
            shadowColorClass="hover:shadow-emerald-200/80"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-emerald-50/60"
          />

          <StatisticContainer
            label="Total Zona Aktif"
            icon={IconOnline}
            value={calculateUniqueZone(events)}
            bgClass="bg-gradient-to-br from-orange-400 to-amber-500 border-transparent"
            shadowColorClass="hover:shadow-orange-600/40"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
          />

          <StatisticContainer
            label="Event Umum"
            value={events.filter((e) => e.category === 'jamaah').length}
            icon={IconSpecial}
            bgClass="bg-gradient-to-br from-blue-500 to-sky-600 border-transparent"
            shadowColorClass="hover:shadow-blue-600/40"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
          />

          <StatisticContainer
            label="Event Khusus"
            value={events.filter((e) => e.category === 'leader').length}
            icon={IconSpecial}
            bgClass="bg-gradient-to-br from-pink-500 to-rose-600 border-transparent"
            shadowColorClass="hover:shadow-pink-600/40"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
          />
        </section>

        <section className="w-full">
          <InlineFilterBar
            filters={filterConfigs}
            isFilterActive={isFilterActive}
            onClear={handleClearFilters}
          />
        </section>

        {/* TABLE */}
        <section className="overflow-hidden bg-white border-none shadow-xs rounded-xl">
          {isLoading ? (
            <SkeletonTableAdminUsers />
          ) : error ? (
            <div className="p-12 space-y-2 text-center text-rose-600">
              <p className="font-semibold">{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center p-12 space-y-4 text-center">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">
                  Belum ada acara
                </h3>
                <p className="text-sm text-slate-500">
                  Belum ada data acara yang terdaftar di dalam sistem.
                </p>
              </div>
              <Button
                type="button"
                variant="primary"
                icon={<IconAdd />}
                to="/admin/events/create"
              >
                Tambah Acara
              </Button>
            </div>
          ) : currentData.length === 0 ? (
            <div className="p-12 space-y-4 text-center">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">
                  Acara tidak ditemukan
                </h3>
                <p className="text-sm text-slate-500">
                  Tidak ada data acara yang cocok dengan kriteria pencarian
                  Anda.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Bersihkan Filter & Pencarian
              </button>
            </div>
          ) : (
            <Table
              columns={columns}
              data={currentData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              stickyBgClass="bg-sea-green-500"
              headerBgClass="bg-sea-green-500 text-white"
            />
          )}

          {/* PAGINATION FOOTER */}
          {currentData.length > 0 && (
            <footer className="flex items-center justify-between px-4 py-3 text-xs bg-white border-t border-slate-100 text-slate-500">
              <div className="hidden sm:block">
                Menampilkan{' '}
                <span className="font-medium text-slate-700">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{' '}
                –{' '}
                <span className="font-medium text-slate-700">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{' '}
                dari{' '}
                <span className="font-medium text-slate-700">
                  {totalItems.toLocaleString('id-ID')}
                </span>{' '}
                acara
              </div>

              <div className="font-medium sm:hidden text-slate-600">
                {currentPage} / {totalPages}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  aria-label="Halaman sebelumnya"
                  variant="navigation"
                  className="p-1.5"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  <IconNav className="w-4 h-4 rotate-180" />
                  Previous
                </Button>

                <div className="items-center hidden gap-1 sm:flex">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant="navigation"
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="text-xs min-w-7 h-7"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  aria-label="Halaman berikutnya"
                  variant="navigation"
                  className="p-1.5"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  Next
                  <IconNav className="w-4 h-4" />
                </Button>
              </div>
            </footer>
          )}
        </section>
      </div>

      {/* DELETE MODAL */}
      {deleteTarget && (
        <Modal
          isOpen={Boolean(deleteTarget)}
          onClose={handleCloseModal}
          icon={<IconWarning className="w-6 h-6" />}
          iconBgColor="bg-galliano-100"
          iconColor="text-galliano-600"
          title="Hapus Data Acara?"
          description={
            <>
              Apakah Anda yakin ingin menghapus{' '}
              <span className="font-semibold text-slate-700">
                {deleteTarget?.nama_event}
              </span>
              ? Data yang dihapus akan hilang permanen.
              {localDeleteError && (
                <span className="block p-2 mt-2 text-xs font-normal border rounded-lg bg-rose-50 text-rose-600 border-rose-200">
                  {localDeleteError}
                </span>
              )}
            </>
          }
          buttonText={isLoading ? 'Menghapus...' : 'Hapus'}
          buttonColor="bg-galliano-600 hover:bg-galliano-700 text-white disabled:opacity-50 cursor-pointer"
          onConfirm={confirmDelete}
          isLoading={isLoading}
          showCancelButton={true}
          cancelButtonText="Batal"
        />
      )}
    </div>
  );
}
