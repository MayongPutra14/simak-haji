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

// SKELETON LOADING DETAIL EVENT

// SKELETON INFO
export function EventInfoSkeleton() {
  return (
    <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100 animate-pulse">
      {/* Title Skeleton */}
      <div className="flex items-center pl-3 border-l-4 border-slate-200">
        <div className="h-7 bg-slate-200 rounded-md w-48"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* EVENT NAME */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </div>
          <div className="mt-2 h-5 bg-slate-200 rounded w-3/4"></div>
        </div>

        {/* EVENT DESCRIPTION */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="mt-2 h-5 bg-slate-200 rounded w-5/6"></div>
        </div>

        {/* SPEAKER */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </div>
          <div className="mt-2 h-5 bg-slate-200 rounded w-1/2"></div>
        </div>

        {/* LOCATION */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-28"></div>
          </div>
          <div className="mt-2 h-5 bg-slate-200 rounded w-2/3"></div>
        </div>

        {/* CATEGORY EVENT */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-28"></div>
          </div>
          <div className="mt-2 h-5 bg-slate-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

// SKELETON TIME
export const EventTimeSkeleton = () => {
  return (
    <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100 animate-pulse">
      <div className="flex items-center pl-3 border-l-4 border-slate-200">
        <div className="h-7 bg-slate-200 rounded-md w-48"></div>
      </div>

      {/* DATE */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-28"></div>
        </div>
        <div className="h-5 bg-slate-200 rounded w-40"></div>
      </div>

      {/* TIME */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>
        <div className="h-5 bg-slate-200 rounded w-36"></div>
      </div>
    </div>
  );
};

// SKELETON MATERIAL EVENT
export const EventMaterialSkeleton = () => {
  return (
    <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100 animate-pulse">
      <div className="flex items-center pl-3 border-l-4 border-slate-200">
        <div className="h-7 bg-slate-200 rounded-md w-36"></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-24"></div>
      </div>

      {/* BOX MATERIAL */}
      <div className="flex flex-col gap-3 p-4 border rounded-lg border-slate-200 bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 w-full sm:w-2/3">
          <div className="h-5 bg-slate-200 rounded w-1/2"></div>
          <div className="h-3 bg-slate-200 rounded w-5/6"></div>
        </div>

        {/* BUTTON SKELETON */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-10 bg-slate-200 rounded-lg w-28"></div>
          <div className="h-10 bg-slate-200 rounded-lg w-24"></div>
        </div>
      </div>
    </div>
  );
};

// SKELETON MAP & PRESENSI AREA
export const EventMapSkeleton = () => {
  return (
    <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100 animate-pulse">
      <div className="flex items-center pl-3 border-l-4 border-slate-200">
        <div className="h-7 bg-slate-200 rounded-md w-52"></div>
      </div>

      {/* MAP AREA PLACEHOLDER */}
      <div className="relative w-full rounded-lg h-87 md:h-100 bg-slate-200"></div>

      {/* DETAIL INFORMATIONS */}
      <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

// ATTENDANCE QR CODE SKELETON
export const EventQrCodeSkeleton = () => {
  return (
    <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100 animate-pulse">
      {/* Title Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center pl-3 border-l-4 border-slate-200">
          <div className="h-7 bg-slate-200 rounded-md w-44"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {/* QR Canvas Box Placeholder */}
        <div className="p-3 bg-white border shadow-xs border-slate-200 rounded-xl">
          <div className="w-37.5 h-37.5 bg-slate-200 rounded-lg"></div>
        </div>

        {/* QR Hash Info & Copy Placeholder */}
        <div className="w-full space-y-2 flex flex-col items-center">
          <div className="h-3 bg-slate-200 rounded w-24"></div>
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="h-6 bg-slate-200 rounded-md w-36"></div>
            <div className="w-6 h-6 bg-slate-200 rounded-md"></div>
          </div>
        </div>

        {/* Action Buttons Placeholder */}
        <div className="grid w-full grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <div className="h-8 bg-slate-200 rounded-lg"></div>
          <div className="h-8 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

// PRESENCE PARAMETERS SKELETON
export const EventParametersSkeleton = () => {
  return (
    <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-100 animate-pulse">
      {/* Title Skeleton */}
      <div className="flex items-center pl-3 border-l-4 border-slate-200">
        <div className="h-7 bg-slate-200 rounded-md w-48"></div>
      </div>

      <div className="space-y-3">
        {/* LATITUDE PARAMETER */}
        <div className="flex justify-between items-center py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>

        {/* LONGITUDE PARAMETER */}
        <div className="flex justify-between items-center py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>

        {/* RADIUS LIMITATION PARAMETER */}
        <div className="flex justify-between items-center py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};
