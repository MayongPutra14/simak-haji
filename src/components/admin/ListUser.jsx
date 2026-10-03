import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Table from '../ui/global/Table';
import Button from '../ui/global/Button';
import StatisticContainer from '../ui/global/StatisticContainer';
import Modal from '../ui/global/Modal';
import useDeleteUser from '../../hooks/admin/user/useDeleteUser';
import { ListAdminUsersColumns } from '../../features/admin/ListAdminUsersColumns';
import { SkeletonTableAdminUsers } from '../ui/global/skeletons/index';
import { UpdateQuotaSection } from '../ui/inputs/UpdateQuotaProvince';
import {
  ADMIN_DOC_FIELDS,
  useUserFilters,
} from '../../hooks/admin/user/useUsersFilter';
import InlineFilterBar from './components/InlineFilterBar';
import { UserStatisticsSection } from './components/statistics/UserStatisticSection';
import { calculateDocumentCompletenessSummary } from '../../utils/helpers/statsCalculators';
import { SearchInput } from '../ui/inputs';
import {
  IoWarningOutline as IconWarning,
  IoLocation as IconLocation,
  IoDocument as IconDocument,
} from 'react-icons/io5';
import {
  MdAdd as IconAdd,
  MdOutlineNavigateNext as IconNav,
  MdPeople as IconPeople,
  MdTimelapse as IconTimeLapes,
} from 'react-icons/md';
import { calculateUniqueZone } from '../../utils/helpers/statsCalculators';

export default function ListUser({
  users = [],
  isLoading = false,
  error = null,
  onRefresh,
}) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { deleteUser, isDeleting, deleteError, setDeleteError } =
    useDeleteUser();
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 10;
  // URL PARAMS HELPER
  const setPageInUrl = useCallback(
    (newPage) => {
      setSearchParams((prevParams) => {
        prevParams.set('page', newPage);
        return prevParams;
      });
    },
    [setSearchParams],
  );

  // CALLING CUSTOM HOOK FILTER
  const {
    searchQuery,
    zoneFilter,
    yearFilter,
    uniqueZones,
    uniqueYears,
    filteredUsers,
    docFilters,
    isFilterActive,
    handleDocFilterChange,
    handleSearchChange,
    handleZoneChange,
    handleYearChange,
    handleClearFilters,
  } = useUserFilters(users, () => setPageInUrl(1));

  // Generic Configuration InlineFIlterBar.jsx
  const filterConfigs = useMemo(() => {
    // 1. Dropdown Zona
    const zoneConfig = {
      key: 'zone',
      value: zoneFilter,
      onChange: handleZoneChange,
      options: uniqueZones.map((z) => ({
        value: z,
        label: z === 'Semua Zona' ? z : `Zona ${z}`,
      })),
    };

    // 2. Dropdown Tahun
    const yearConfig = {
      key: 'year',
      value: yearFilter,
      onChange: handleYearChange,
      options: uniqueYears.map((y) => ({
        value: y,
        label: y === 'Semua Tahun' ? y : `Tahun ${y}`,
      })),
    };

    // 3. Dropdown for 10 Status Document (G-Form, Photo, SPPH, dll.)
    const docConfigs = ADMIN_DOC_FIELDS.map(({ key, label }) => ({
      key,
      value: docFilters[key],
      onChange: (value) => handleDocFilterChange(key, value),
      options: [
        { value: 'Semua', label: `${label}: Semua` },
        { value: 'ok', label: `${label}: OK` },
        { value: 'menunggu', label: `${label}: Menunggu` },
      ],
    }));

    return [zoneConfig, yearConfig, ...docConfigs];
  }, [
    zoneFilter,
    yearFilter,
    docFilters,
    uniqueZones,
    uniqueYears,
    handleZoneChange,
    handleYearChange,
    handleDocFilterChange,
  ]);

  // CALCULATION FOR PAGINATION
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const docSummary = useMemo(
    () => calculateDocumentCompletenessSummary(users),
    [users],
  );

  // HANDLER DELETE USER (Tetap dipertahankan)
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const result = await deleteUser(deleteTarget.id);

    if (result.status === 'success') {
      setDeleteTarget(null);
      if (onRefresh) await onRefresh();

      if (currentData.length === 1 && currentPage > 1) {
        setPageInUrl((prev) => prev - 1);
      }
    }
  };

  const handleCloseModal = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
    setDeleteError(null);
  };

  // COLUMNS DEFINITION
  const columns = useMemo(
    () =>
      ListAdminUsersColumns({
        onDelete: (user) => {
          setDeleteTarget(user);
          setDeleteError(null);
        },
        onViewDetail: (user) => {
          navigate(`/admin/users/detail/${user.id}`);
        },
        onEdit: (user) => {
          navigate(`/admin/users/edit/${user.id}`);
        },
      }),
    [setDeleteError, navigate],
  );

  const getPaginationPages = (currentPage, totalPages) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (
        pages[pages.length - 1] !== '...' &&
        (i < currentPage - 1 || i > currentPage + 1)
      ) {
        pages.push('...');
      }
    }
    return pages;
  };

  const paginationPages = getPaginationPages(currentPage, totalPages);
  return (
    <div className="min-h-screen">
      <div className="space-y-6 w-[95%] md:w-[98%] mx-auto p-4 my-4 shadow-md rounded-xl">
        {/* HEADER AREA: Inline Filter & Button Add */}
        <section className="flex flex-col w-full gap-3 md:flex-row md:items-center md:justify-between">
          {/* SEARCH INPUT */}
          <div className="w-full md:w-[70%]">
            <SearchInput
              placeHolder="Cari nama atau no. porsi..."
              searchQuery={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* BUTTON ADD NEW USER */}
          <Button
            className="flex items-center justify-center w-full gap-2 px-4 py-2 md:w-auto shrink-0"
            variant="primary"
            to="/admin/users/create"
          >
            <IconAdd className="w-5 h-5" />
            <span>Tambah Jamaah</span>
          </Button>
        </section>

        {/* UPDATE NEW PROVINCE QUOTA */}
        <UpdateQuotaSection onRefresh={onRefresh} />

        {/* BASIC STATISTIC */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatisticContainer
            label="Total Jamaah"
            value={users.length.toLocaleString('id-ID')}
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
            value={calculateUniqueZone(users)}
            icon={IconLocation}
            bgClass="bg-gradient-to-br from-orange-400 to-amber-500 border-transparent"
            shadowColorClass="hover:shadow-orange-600/40"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
          />

          <StatisticContainer
            label="Dokumen Lengkap"
            value={`${docSummary.completePercentage}%`}
            icon={IconDocument}
            bgClass="bg-gradient-to-br from-blue-500 to-sky-600 border-transparent"
            shadowColorClass="hover:shadow-blue-600/40"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
          />

          <StatisticContainer
            label="Belum Lengkap"
            value={`${docSummary.incompletePercentage}%`}
            icon={IconTimeLapes}
            bgClass="bg-gradient-to-br from-pink-500 to-rose-600 border-transparent"
            shadowColorClass="hover:shadow-pink-600/40"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
          />
        </section>

        {/* INLINE FILTERS BAR */}
        <section className="w-full">
          <InlineFilterBar
            filters={filterConfigs}
            isFilterActive={isFilterActive}
            onClear={handleClearFilters}
          />
        </section>

        {/* TABLE */}
        <section className="w-full min-w-0 overflow-hidden bg-white border-none shadow-xs rounded-xl">
          {isLoading ? (
            <SkeletonTableAdminUsers />
          ) : error ? (
            <div className="p-12 space-y-2 text-center text-rose-600">
              <p className="font-semibold">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center p-12 space-y-4 text-center">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">
                  Belum ada pengguna
                </h3>
                <p className="text-sm text-slate-500">
                  Belum ada pengguna yang terdaftar di dalam sistem.
                </p>
              </div>
              <Button type="button" variant="primary" icon={<IconAdd />}>
                Tambah Jamaah
              </Button>
            </div>
          ) : currentData.length === 0 ? (
            <div className="p-12 space-y-4 text-center">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">
                  Pengguna tidak ditemukan
                </h3>
                <p className="text-sm text-slate-500">
                  Tidak ada pengguna yang cocok dengan pencarian Anda.
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
                pengguna
              </div>

              <div className="font-medium sm:hidden text-slate-600">
                {currentPage} / {totalPages}
              </div>

              <div className="flex items-center gap-1">
                {/* PREVIOUS PAGE BUTTON */}
                <Button
                  aria-label="Halaman sebelumnya"
                  variant="navigation"
                  className="p-1.5"
                  disabled={currentPage === 1}
                  // UPDATE: Calculate the previous page using the currentPage variable
                  onClick={() => setPageInUrl(Math.max(currentPage - 1, 1))}
                >
                  <IconNav className="w-4 h-4 rotate-180" />
                  Previous
                </Button>

                {/* PAGINATION NUMBERS */}
                <div className="items-center hidden gap-1 sm:flex">
                  {paginationPages.map((page, index) => {
                    if (page === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-xs text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <Button
                        key={page}
                        variant="navigation"
                        // UPDATE: Pass the target page directly to the URL helper
                        onClick={() => setPageInUrl(page)}
                        isActive={currentPage === page}
                        className="text-xs min-w-7 h-7"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                {/* NEXT PAGE BUTTON */}
                <Button
                  aria-label="Halaman berikutnya"
                  variant="navigation"
                  className="p-1.5"
                  disabled={currentPage === totalPages}
                  // UPDATE: Calculate the next page using the currentPage variable
                  onClick={() =>
                    setPageInUrl(Math.min(currentPage + 1, totalPages))
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

      {/* CHARTS */}
      <div className="space-y-6 w-[95%] md:w-[98%] mx-auto p-4 mt-16 shadow-md rounded-xl">
        <h2 className="pb-2 text-2xl font-bold border-b-2 w-fit border-b-slate-700 text-slate-700">
          Statistik Administrasi
        </h2>
        <UserStatisticsSection users={users} />
      </div>

      {/* DELETE MODAL */}
      {deleteTarget && (
        <Modal
          isOpen={Boolean(deleteTarget)}
          onClose={handleCloseModal}
          icon={<IconWarning className="w-6 h-6" />}
          iconBgColor="bg-galliano-100"
          iconColor="text-galliano-600"
          title="Hapus Data Jamaah?"
          description={
            <>
              Apakah Anda yakin ingin menghapus{' '}
              <span className="font-semibold text-slate-700">
                {deleteTarget?.name}
              </span>
              ? Data yang dihapus akan hilang permanen.
              {deleteError && (
                <span className="block p-2 mt-2 text-xs font-normal border rounded-lg bg-rose-50 text-rose-600 border-rose-200">
                  {deleteError}
                </span>
              )}
            </>
          }
          buttonText={isDeleting ? 'Menghapus...' : 'Hapus'}
          buttonColor="bg-galliano-600 hover:bg-galliano-700 text-white disabled:opacity-50 cursor-pointer"
          onConfirm={confirmDelete}
          isLoading={isDeleting}
          showCancelButton={true}
          cancelButtonText="Batal"
        />
      )}
    </div>
  );
}
