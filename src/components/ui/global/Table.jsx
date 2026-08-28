export default function Table({
  columns = [],
  data = [],
  rowKey = 'id',
  currentPage = 1,
  itemsPerPage = 10,
  showNumbering = true,
  stickyBgClass = '',
  headerBgClass = 'bg-teal-50/70 text-white border-teal-100/80',
  isLoading = false,
  emptyMessage = 'Tidak ada data ditemukan',
  onRowClick,
}) {
  return (
    <div className="overflow-x-auto w-full rounded-xl border border-slate-200/80 shadow-xs">
      <table className="w-full text-left border-collapse">
        {/* HEADER TABLE */}
        <thead>
          <tr
            className={`${headerBgClass} border-b text-xs font-semibold uppercase`}
          >
            {/* COLUMN NUMBER */}
            {showNumbering && (
              <th scope="col" className="py-3.5 px-4 w-12 text-center shrink-0">
                No
              </th>
            )}

            {/* DYNAMIC COLOM STICKY */}
            {columns.map((col, idx) => {
              const alignClass =
                col.align === 'center'
                  ? 'text-center'
                  : col.align === 'right'
                    ? 'text-right'
                    : 'text-left';

              const stickyClass = col.isSticky
                ? `sticky left-0 z-10 ${stickyBgClass} shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]`
                : '';

              return (
                <th
                  key={col.key || idx}
                  scope="col"
                  className={`py-3.5 px-4 ${alignClass} ${stickyClass} ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* BODY TABLE */}
        <tbody className="divide-y divide-slate-100 text-sm bg-white">
          {/* STATE LOADING */}
          {isLoading ? (
            <tr>
              <td
                colSpan={(columns.length || 0) + (showNumbering ? 1 : 0)}
                className="py-12 text-center text-slate-500 font-medium"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                  Memuat data...
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            /* STATE EMPTY DATA */
            <tr>
              <td
                colSpan={(columns.length || 0) + (showNumbering ? 1 : 0)}
                className="py-12 text-center text-slate-400 font-medium"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            /* RENDER DATA */
            data.map((item, index) => {
              const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
              const isEven = index % 2 === 1;
              const rowBgClass = isEven ? 'bg-slate-50/60' : 'bg-white';

              return (
                <tr
                  key={item[rowKey] || index}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`${rowBgClass} hover:bg-slate-100/70 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {/* CEL NUMBER OTOMATIC */}
                  {showNumbering && (
                    <td className="py-3.5 px-4 text-center text-slate-500 font-medium text-xs">
                      {rowNumber}
                    </td>
                  )}

                  {/* RENDER CELL BASE ON ARRAY COLUMN */}
                  {columns.map((col, colIdx) => {
                    const alignClass =
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'right'
                          ? 'text-right'
                          : 'text-left';

                    const stickyClass = col.isSticky
                      ? `sticky left-0 z-10 ${
                          isEven ? 'bg-slate-50' : 'bg-white'
                        } shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]`
                      : '';

                    return (
                      <td
                        key={col.key || colIdx}
                        className={`py-3.5 px-4 ${alignClass} ${stickyClass} ${col.className || ''}`}
                      >
                        {/* if there is a "render" function, use that. if not, rake from value field */}
                        {col.render ? col.render(item, index) : item[col.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
