import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Table from '../ui/global/Table';
import SearcInput from '../ui/inputs/SeacrhInput';
import Button from '../ui/global/Button';
import StatisticContainer from '../ui/global/StatisticContainer';
import Modal from '../ui/global/Modal';
import useDeleteUser from '../../hooks/admin/user/useDeleteUser';
import { ListAdminUsersColumns } from '../../features/admin/ListAdminUsersColumns';
import { SkeletonTableAdminUsers } from '../ui/global/skeletons/index';
import { HiStatusOnline as IconOnline } from 'react-icons/hi';
import {
  MdAdd as IconAdd,
  MdOutlineArrowDropDown as IconFilter,
  MdOutlineNavigateNext as IconNav,
  MdPeople as IconPeople,
} from 'react-icons/md';
import { IoWarningOutline as IconWarning } from 'react-icons/io5';

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
  const navigate = useNavigate();

  // OPTIMIZATION: ELIMINATE LOCALUSERS STATE AND DERIVE DATA DIRECTLY FROM USERS PROP
  const { deleteUser, isDeleting, deleteError, setDeleteError } =
    useDeleteUser();

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

    if (result.status === 'success') {
      setDeleteTarget(null);
      if (onRefresh) await onRefresh();

      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
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
        onViewDetail: (user) => {
          navigate(`/admin/users/detail/${user.id}`);
        },
        onEdit: (user) => {
          navigate(`/admin/users/edit/${user.id}`);
        },
      }),
    [setDeleteError, navigate], // INCLUDED SETDELETEERROR TO RESOLVE ESLINT WARNING
  );

  return (
    <div className="min-h-screen bg-white w-[95%] md:w-[98%] mx-auto p-4 my-4 rounded-xl shadow-md">
      <div className="space-y-6">
        {/* FILTER, ADD NEW JAMAAH, AND SEARCH BAR */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-stretch flex-1 max-w-2xl gap-3 sm:flex-row sm:items-center">
            <SearcInput
              placeHolder="Cari jamaah..."
              searchQuery={searchQuery}
              onChange={handleSearchChange}
            />

            <div className="relative min-w-35">
              <select
                value={statusFilter}
                onChange={handleFilterChange}
                className="w-full py-2 pl-3 pr-8 text-sm bg-white border rounded-lg appearance-none cursor-pointer border-slate-200 text-slate-700 focus:outline-none focus:border-sea-green-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Alumni">Alumni</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                <IconFilter className="w-5 h-5" />
              </div>
            </div>
          </div>

          <Button
            icon={<IconAdd />}
            className="px-4 py-2 sm:w-auto"
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
            label="Total Jamaah Aktif"
            value={users.filter((user) => user.status === 'Aktif').length}
            icon={IconOnline}
            bgClass="bg-gradient-to-br from-sea-green-600 to-teal-800 border-transparent"
            shadowColorClass="hover:shadow-teal-600/40"
            textColorClass="text-white"
            labelColorClass="text-teal-100"
            iconColorClass="text-white"
            iconBgClass="bg-white/20 backdrop-blur-xs"
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
                <span className="block p-2 mt-2 text-xs font-normal border rounded-lg bg-rose-50 text-rose-600 border-rose-200">
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
