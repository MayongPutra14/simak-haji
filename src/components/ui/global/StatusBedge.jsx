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
/**
 * Universal Badge Component for Status (Events or Documents)
 * @param {string} [label] - Optional text label above the badge (renders a card layout if provided)
 * @param {string} status - The status value from the backend (e.g., completed, upcoming, live, complete, pending, etc.)
 * @param {boolean} [isLabelFade=true] - Determines whether the label is styled with a faded appearance (defaults to true)
 */

export const StatusBadge = ({ label, isLabelFade = true, status }) => {
  if (!status) {
    return label ? (
      <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <span
          className={
            isLabelFade
              ? 'text-xs font-semibold text-slate-400'
              : 'text-xs font-medium text-slate-400'
          }
        >
          {label}
        </span>
        <span className="text-xs font-normal text-slate-300">-</span>
      </div>
    ) : (
      <span className="text-xs font-normal text-slate-300">-</span>
    );
  }

  const normalized = String(status).toLowerCase().trim();

  // Pemetaan warna universal (Event & Dokumen)
  const statusStyles = {
    // Event Category
    selesai: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    mendatang: 'bg-rose-50 text-rose-700 border-rose-200',
    live: 'bg-amber-50 text-amber-700 border-amber-200',

    // Document Completeness
    lengkap: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ok: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    menunggu: 'bg-rose-50 text-rose-700 border-rose-200',
    proses: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const defaultStyle = 'bg-slate-100 text-slate-600 border-slate-200';
  const currentStyle = statusStyles[normalized] || defaultStyle;

  const badgeElement = (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${currentStyle}`}
    >
      {status === true ? 'Aktif' : status === false ? 'Tidak Aktif' : status}
    </span>
  );

  if (label) {
    const labelFadeClass = isLabelFade
      ? 'text-xs font-semibold text-slate-400 flex items-center gap-1'
      : 'text-xs font-medium text-slate-400';

    return (
      <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <span className={labelFadeClass}>{label}</span>
        <div>{badgeElement}</div>
      </div>
    );
  }

  return badgeElement;
};
