// SKELETON TABLE
export function SkeletonTableAdminUsers() {
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
