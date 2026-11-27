import {
  IconChevronBack,
  IconChevronNext,
} from '../../../utils/helpers/decorations';
import { getPaginationWindow } from '../../../utils/helpers/attendanceRecap';

const NAV_BUTTON_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-xl border text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40';

/**
 * Pagination footer for the attendance pages.
 *
 * `pagination` is the normalized object from the hooks:
 * { page, perPage, total, totalPages, from, to, hasNextPage, hasPreviousPage }.
 * The active page uses `aria-current="page"`.
 */
export default function AttendancePagination({
  pagination,
  onPageChange,
  itemLabel = 'kegiatan',
  className = '',
}) {
  if (!pagination || pagination.total === 0) return null;

  const { page, totalPages, total, from, to } = pagination;
  const hasPreviousPage = pagination.hasPreviousPage ?? page > 1;
  const hasNextPage = pagination.hasNextPage ?? page < totalPages;
  const pageItems = getPaginationWindow(page, totalPages);

  const goToPage = (target) => {
    if (!onPageChange || target === page) return;

    onPageChange(target);
  };

  return (
    <nav
      aria-label="Navigasi halaman rekap"
      className={`flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 sm:flex-row sm:px-6 ${className}`}
    >
      <p className="text-xs text-slate-500 sm:text-sm">
        Menampilkan{' '}
        <strong className="font-semibold text-slate-800">
          {from}-{to}
        </strong>{' '}
        dari <strong className="font-semibold text-slate-800">{total}</strong>{' '}
        {itemLabel}
      </p>

      <div className="inline-flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => goToPage(page - 1)}
          disabled={!hasPreviousPage}
          aria-label="Halaman sebelumnya"
          title="Halaman Sebelumnya"
          className={`${NAV_BUTTON_CLASS} border-slate-200 bg-white text-slate-600 hover:bg-slate-100`}
        >
          <IconChevronBack className="h-4 w-4" aria-hidden="true" />
        </button>

        {pageItems.map((item) =>
          typeof item === 'number' ? (
            <button
              key={item}
              type="button"
              onClick={() => goToPage(item)}
              aria-current={item === page ? 'page' : undefined}
              aria-label={`Halaman ${item}`}
              className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-xs font-bold transition-colors ${
                item === page
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item}
            </button>
          ) : (
            <span
              key={item}
              aria-hidden="true"
              className="px-1 text-xs text-slate-400"
            >
              &hellip;
            </span>
          ),
        )}

        <button
          type="button"
          onClick={() => goToPage(page + 1)}
          disabled={!hasNextPage}
          aria-label="Halaman berikutnya"
          title="Halaman Selanjutnya"
          className={`${NAV_BUTTON_CLASS} border-slate-200 bg-white text-slate-600 hover:bg-slate-100`}
        >
          <IconChevronNext className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
