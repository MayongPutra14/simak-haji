import { Link } from 'react-router';
import { IconBack, IconVerified } from '../../../utils/helpers/decorations';

/**
 * Page header for the admin/leader attendance pages.
 * Renders the back link, page title, access pill and the scope slot (zona).
 */
export default function AttendancePageHeader({
  backTo,
  title,
  description,
  accessLabel,
  scopeLabel,
  scopeHint = 'Cakupan Wilayah',
}) {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4 sm:items-center">
        <Link
          to={backTo}
          aria-label="Kembali ke beranda"
          title="Kembali ke Beranda"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 bg-slate-100 text-slate-700 transition-all hover:bg-emerald-50 hover:text-emerald-700"
        >
          <IconBack className="h-5 w-5" aria-hidden="true" />
        </Link>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>

            {accessLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100/70 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                {accessLabel}
              </span>
            )}
          </div>

          {description && (
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              {description}
            </p>
          )}
        </div>
      </div>

      {scopeLabel && (
        <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-2.5 md:self-auto">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <IconVerified className="h-5 w-5" aria-hidden="true" />
          </span>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {scopeHint}
            </span>
            <span className="text-xs font-bold text-slate-800 sm:text-sm">
              {scopeLabel}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
