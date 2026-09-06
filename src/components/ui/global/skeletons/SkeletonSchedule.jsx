// Loading for user schedule menu
export function SkeletonScheduleUserMenu() {
  return (
    <div className="w-full max-w-md p-5 mx-auto transition-all bg-white border border-gray-200 shadow-sm rounded-xl animate-pulse">
      {/* SKELETOn TITLE */}
      <div className="w-3/4 mb-3 rounded-md h-7 bg-slate-200" />
      <div className="w-full pb-3 border-b border-gray-100" />

      {/* SKELETON STATUS */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-4 rounded-md bg-slate-200 w-28" />
        <div className="w-24 rounded-full h-7 bg-slate-200" />
      </div>
    </div>
  );
}

// Loading for event dashboard user
export function SkeletonScheduleUserDashboard() {
  return (
    <div className="w-[95%] max-w-md mx-auto mt-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse">
      <div className="w-1/2 h-6 mb-4 rounded bg-slate-200"></div>
      <div className="w-3/4 h-4 mb-3 rounded bg-slate-200"></div>
      <div className="w-2/3 h-4 rounded bg-slate-200"></div>
    </div>
  );
}
