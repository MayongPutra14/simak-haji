// Skeleton Loading for ProfileDetail.jsx

// this is for image profile container
export function SkeletonProfileImage() {
  return (
    <div className="bg-sea-green-900 animate-pulse rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6">
      <div className="w-28 h-28 rounded-full bg-sea-green-700"></div>
      <div className="flex-1 space-y-3 text-center md:text-left">
        <div className="h-7 bg-sea-green-700 rounded w-48 mx-auto md:mx-0"></div>
        <div className="h-4 bg-sea-green-700 rounded w-32 mx-auto md:mx-0"></div>
        <div className="h-4 bg-sea-green-700 rounded w-40 mx-auto md:mx-0"></div>
      </div>
    </div>
  );
}

// this is for card key and value
export function SkeletonCardProfileDetail({
  _title,
  rows = 4,
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-teal-100 shadow-sm animate-pulse ${className}`}
    >
      <div className="h-5 bg-slate-200 rounded-md w-1/3 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="h-3 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
