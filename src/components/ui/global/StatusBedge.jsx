// Helper Component: Display Key and Value with Fallback Handling
export const DetailField = ({ label, value }) => {
  const isEmpty =
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0);

  return (
    <div className="flex flex-col gap-1 my-1">
      {/* Key: Slate 300 */}
      <span className="text-xs font-medium tracking-wide text-slate-400/70">
        {label}:
      </span>
      {/* Value: Slate 600 or Fallback Italic */}
      {isEmpty ? (
        <span className="text-sm italic font-light text-slate-400">
          Belum ada data / Belum diisi
        </span>
      ) : Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {value.map((item, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 border border-teal-200"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-sm font-semibold text-slate-600 wrap-break-words">
          {value}
        </span>
      )}
    </div>
  );
};

// Helper Component: Status Badge
export const StatusBadge = ({ label, isLabelFade = true, status }) => {
  // 1. Pemetaan warna sesuai nilai status
  const statusStyles = {
    // Hijau
    ok: 'bg-emerald-100 text-emerald-800 border-emerald-200',

    // Biru (Proses)
    menunggu: 'bg-rose-100 text-rose-800 border-rose-200',

    // Merah (Gagal/Batal)
    gagal: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  // 2. Fallback jika status tidak ditemukan di daftar (Default: Amber/Kuning)
  const defaultStyle = 'bg-amber-100 text-amber-800 border-amber-200';

  const currentStyle = statusStyles[status?.toLowerCase()] || defaultStyle;

  const labelFade = isLabelFade
    ? 'text-xs font-semibold text-slate-400 flex items-center gap-1'
    : 'text-xs font-medium text-slate-400';

  return (
    <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
      <span className={labelFade}>{label}</span>
      <div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${currentStyle}`}
        >
          {status === true
            ? 'Aktif'
            : status === false
              ? 'Tidak Aktif'
              : status || 'Belum diisi'}
        </span>
      </div>
    </div>
  );
};

// Helper component/function to render status badges
export const StatusCellBedge = (value) => {
  if (!value) {
    return <span className="text-slate-300 font-normal">-</span>;
  }

  const normalized = String(value).toLowerCase().trim();

  // If status is "ok" or "selesai" or "lengkap"
  if (normalized === 'ok') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sea-green-100 text-sea-green-700 border border-sea-green-300 capitalize">
        {value}
      </span>
    );
  }

  // If status is "menunggu" or "proses"
  if (normalized === 'menunggu') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 capitalize">
        {value}
      </span>
    );
  }

  // Default fallback badge
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 capitalize">
      {value}
    </span>
  );
};
