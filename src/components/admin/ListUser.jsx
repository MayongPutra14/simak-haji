import { useState, useMemo } from 'react';
import Table from '../ui/global/Table';
import {
  MdWallet as IconWallet,
  MdAdd as IconAdd,
  MdOutlineArrowDropDown as IconFilter,
  MdOutlineNavigateNext as IconNav,
  MdPeople as IconPeople,
} from 'react-icons/md';
import { IoWarningOutline as IconWarning } from 'react-icons/io5';
import SearcInput from '../ui/global/SeacrhInput';
import { Button } from '../ui/global/Button';
import StatisticContainer from '../ui/global/StatisticContainer';
import Modal from '../ui/global/Modal';
import { ListAdminUsersColumns } from '../../features/admin/ListAdminUsersColumns';
import useDeleteAdminUser from '../../hooks/admin/useDeleteUser';

// SKELETON TABLE
function SkeletonTable() {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 border-b border-slate-100"
        >
          <div className="flex items-center space-x-3 w-1/4">
            <div className="w-16 h-10 bg-slate-200 rounded-full" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />
          </div>
          <div className="h-4 bg-slate-200 rounded w-1/6 hidden sm:block" />
          <div className="h-4 bg-slate-200 rounded w-1/6 hidden sm:block" />
          <div className="h-6 bg-slate-200 rounded-full w-16" />
          <div className="h-8 bg-slate-200 rounded w-20" />
        </div>
      ))}
    </div>
  );
}

export default function ListUser({
  users = [],
  isLoading = false,
  error = null,
  onRefresh,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // OPTIMIZATION: ELIMINATE LOCALUSERS STATE AND DERIVE DATA DIRECTLY FROM USERS PROP
  const { deleteUser, isDeleting, deleteError, setDeleteError } =
    useDeleteAdminUser();

  const itemsPerPage = 10;

  // HANDLER FOR SEARCH INPUT CHANGE WITH PAGE RESET
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // RESET CURRENT PAGE ON USER INPUT EVENT INSTEAD OF USEEFFECT
  };

  // HANDLER FOR FILTER STATUS CHANGE WITH PAGE RESET
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // RESET CURRENT PAGE ON USER INPUT EVENT INSTEAD OF USEEFFECT
  };

  // FILTER USERS DATA DERIVED DIRECTLY FROM PROPS
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.portionNumber?.includes(searchQuery);

      const matchesStatus =
        statusFilter === 'Semua Status' || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  // CALCULATION FOR PAGINATION
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  // HANDLER DELETE USER
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const result = await deleteUser(deleteTarget.id);

    if (result.success) {
      setDeleteTarget(null);
      if (onRefresh) await onRefresh();
    }
  };

  const handleCloseModal = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
    setDeleteError(null);
  };

  // HANDLE CLEAR SEARCH AND FILTER WITH PAGE RESET
  const handleClearSearch = () => {
    setSearchQuery('');
    setStatusFilter('Semua Status');
    setCurrentPage(1); // RESET PAGE DIRECTLY ON CLEAR EVENT
  };

  // COLUMNS DEFINITION WITH INCLUDED DEPENDENCIES
  const columns = useMemo(
    () =>
      ListAdminUsersColumns({
        onDelete: (user) => {
          setDeleteTarget(user);
          setDeleteError(null);
        },
      }),
    [setDeleteError], // INCLUDED SETDELETEERROR TO RESOLVE ESLINT WARNING
  );

  return (
    <div className="min-h-screen bg-white w-[95%] md:w-[98%] mx-auto p-4 my-4 rounded-xl shadow-md">
      <div className="space-y-6">
        {/* FILTER, ADD NEW JAMAAH, AND SEARCH BAR */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1 max-w-2xl">
            <SearcInput
              placeHolder="Cari jamaah..."
              searchQuery={searchQuery}
              onChange={handleSearchChange}
            />

            <div className="relative min-w-35">
              <select
                value={statusFilter}
                onChange={handleFilterChange}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 cursor-pointer focus:outline-none focus:border-sea-green-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Alumni">Alumni</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-slate-400">
                <IconFilter className="w-5 h-5" />
              </div>
            </div>
          </div>

          <Button
            icon={<IconAdd />}
            className="sm:w-auto px-4 py-2"
            variant="primary"
            type="button"
            to="/admin/users/create"
          >
            Tambah Jamaah
          </Button>
        </section>

        {/* BASIC STATISTIC */}
        <section className="grid grid-cols-2 gap-4 sm:max-w-md">
          <StatisticContainer
            label="Total Pengguna"
            value={users.length.toLocaleString('id-ID')} // Menggunakan localUsers.length agar statistik terupdate
            icon={IconPeople}
            bgClass="bg-emerald-300 border-emerald-200"
            shadowColorClass="hover:shadow-emerald-200/80"
            textColorClass="text-white"
            labelColorClass="text-white"
            iconColorClass="text-white"
            iconBgClass="bg-emerald-50/60"
          />

          <StatisticContainer
            label="Total Infaq"
            value="Rp 12.500.000"
            icon={IconWallet}
            bgClass="bg-gradient-to-br from-sea-green-600 to-teal-800 border-transparent"
            shadowColorClass="hover:shadow-teal-600/40"
            textColorClass="text-white"
            labelColorClass="text-teal-100"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
          />
        </section>

        {/* TABLE */}
        <section className="bg-white rounded-xl border-none shadow-xs overflow-hidden">
          {isLoading ? (
            <SkeletonTable />
          ) : error ? (
            <div className="p-12 text-center text-rose-600 space-y-2">
              <p className="font-semibold">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 flex flex-col items-center text-center space-y-4">
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
            <div className="p-12 text-center space-y-4">
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
                onClick={handleClearSearch}
                className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Bersihkan pencarian
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
            <footer className="px-4 py-3 border-t border-slate-100 flex items-center justify-between bg-white text-xs text-slate-500">
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

              <div className="sm:hidden font-medium text-slate-600">
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

                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant="navigation"
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="min-w-7 h-7 text-xs"
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
          title="Hapus Data Jamaah?"
          description={
            <>
              Apakah Anda yakin ingin menghapus{' '}
              <span className="font-semibold text-slate-700">
                {deleteTarget?.name}
              </span>
              ? Data yang dihapus akan hilang permanen.
              {/* Alert jika terjadi error dari Backend */}
              {deleteError && (
                <span className="block mt-2 p-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-normal border border-rose-200">
                  {deleteError}
                </span>
              )}
            </>
          }
          buttonText={isDeleting ? 'Menghapus...' : 'Hapus'}
          buttonColor="bg-galliano-600 hover:bg-galliano-700 text-white disabled:opacity-50 cursor-pointer"
          onConfirm={confirmDelete}
          isLoading={isDeleting} // Pastikan komponen Modal mendukung state loading ini
          showCancelButton={true}
          cancelButtonText="Batal"
        />
      )}
    </div>
  );
}
