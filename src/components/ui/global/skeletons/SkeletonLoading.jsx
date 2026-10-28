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

      {/* TIME START*/}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>
        <div className="h-5 bg-slate-200 rounded w-36"></div>
      </div>

      {/* TIME END*/}
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

// SKELETON LOADING FOR USERS
// skeleton laoding for events menu in user
export function EventCardSkeleton() {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xs animate-pulse">
      {/* Accent Placeholder */}
      <div className="h-1 w-full bg-slate-200" />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Status Badges Placeholder */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div className="h-7 w-20 rounded-full bg-slate-200" />
          <div className="h-7 w-24 rounded-full bg-slate-200" />
        </div>

        {/* Event title & Description Placeholder */}
        <div className="mb-5 min-w-0">
          {/* Subtitle / Informasi Kegiatan */}
          <div className="h-3 w-28 rounded-md bg-slate-200/80 mb-2" />

          {/* Judul Acara dengan min-h-14 agar tinggi tetap konsisten */}
          <div className="min-h-14 flex flex-col justify-center space-y-1.5">
            <div className="h-5 w-[90%] rounded-md bg-slate-200" />
            <div className="h-5 w-[55%] rounded-md bg-slate-200" />
          </div>

          {/* Deskripsi Acara dengan min-h-10 */}
          <div className="mt-2 min-h-10 flex flex-col justify-center space-y-1.5">
            <div className="h-3.5 w-full rounded-md bg-slate-200/70" />
            <div className="h-3.5 w-[85%] rounded-md bg-slate-200/70" />
          </div>
        </div>

        {/* Event details List Placeholder */}
        <div className="mt-auto border-t border-slate-100 pt-4">
          {/* Mengikuti grid layout bawaan komponen asli */}
          <div className="grid grid-cols-1 gap-3 sm:gap-y-4">
            {/* Membuat 4-5 baris item detail simulasi */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex min-w-0 items-start gap-3 rounded-xl p-2"
              >
                {/* Icon Box */}
                <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-200/80" />

                {/* Text Lines */}
                <div className="min-w-0 flex-1 py-0.5">
                  {/* Label */}
                  <div className="h-3 w-12 rounded-sm bg-slate-200/60 mb-1.5" />
                  {/* Value */}
                  <div className="h-4 w-[65%] rounded-md bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// Skeleton loading for event dashboard in user
export function EventDashboardSkeleton() {
  const skeletonCards = Array.from({ length: 1 });

  return (
    <section className="mx-auto mt-6 flex w-[95%] flex-col pb-6 md:w-[98%] animate-pulse">
      {/* Section heading Skeleton */}
      <div className="mb-5">
        <div className="h-6 w-36 rounded-md bg-slate-200 mb-2" />
        <div className="h-4 w-64 rounded-md bg-slate-200/80" />
      </div>

      {/* Event card grid */}
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skeletonCards.map((_, index) => (
          <article
            key={index}
            className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xs"
          >
            {/* Accent Line Placeholder */}
            <div className="h-1 w-full bg-slate-200" />

            <div className="flex flex-1 flex-col p-4 sm:p-5">
              {/* Status badges Skeleton */}
              <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
                <div className="h-7 w-24 rounded-full bg-slate-200/70" />
              </div>

              {/* Event title and description Skeleton */}
              <div className="mb-5 min-w-0 border-l-[3px] border-slate-200 pl-4">
                {/* Detail Kegiatan label */}
                <div className="h-3 w-24 rounded-md bg-slate-200/80 mb-2" />
                {/* Judul Acara (2 Baris) */}
                <div className="space-y-1.5 mb-3">
                  <div className="h-5 w-[90%] rounded-md bg-slate-200" />
                  <div className="h-5 w-[60%] rounded-md bg-slate-200" />
                </div>
                {/* Deskripsi Acara */}
                <div className="space-y-1.5">
                  <div className="h-3.5 w-full rounded-md bg-slate-200/70" />
                  <div className="h-3.5 w-[85%] rounded-md bg-slate-200/70" />
                </div>
              </div>

              {/* Event information List Skeleton */}
              <div className="mb-5 mt-auto space-y-1 border-t border-slate-100 pt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex min-w-0 items-start gap-3 rounded-xl px-2 py-2"
                  >
                    {/* Icon Box Placeholder */}
                    <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-200/80" />

                    {/* Text Placeholder */}
                    <div className="min-w-0 flex-1 py-0.5">
                      {/* Label */}
                      <div className="h-3 w-12 rounded-sm bg-slate-200/60 mb-1.5" />
                      {/* Value */}
                      <div className="h-4 w-[70%] rounded-md bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action button Skeleton */}
              <div className="mt-auto border-t border-slate-100 pt-4">
                <div className="h-10 w-full rounded-lg bg-slate-200" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// SKELETON LOADING FOR QUR'AN
// List Qur'an
export function ListQuranSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER SECTION SKELETON */}
      <header className="mb-10 md:mb-12 text-center max-w-2xl mx-auto animate-pulse">
        <div className="inline-block w-40 h-4 bg-teal-100 rounded-full mb-3"></div>
        <div className="h-10 w-64 bg-teal-200 rounded-xl mx-auto mb-3"></div>
        <div className="h-4 w-full max-w-md bg-teal-100 rounded-lg mx-auto mb-2"></div>
        <div className="h-4 w-3/4 max-w-xs bg-teal-100 rounded-lg mx-auto mb-6"></div>
        <div className="h-3 w-32 bg-teal-100 rounded-lg mx-auto mb-8"></div>

        {/* Bismillah Divider Skeleton */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-teal-200"></div>
          <div className="w-36 h-6 bg-teal-100 rounded"></div>
          <div className="w-12 h-px bg-teal-200"></div>
        </div>

        {/* Search Input Skeleton */}
        <div className="h-12 w-full bg-teal-50 border border-teal-100 rounded-xl mb-6"></div>

        {/* Filter Buttons Skeleton */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="h-9 w-28 bg-teal-100 rounded-full"></div>
          <div className="h-9 w-20 bg-teal-100 rounded-full"></div>
          <div className="h-9 w-20 bg-teal-100 rounded-full"></div>
        </div>
      </header>

      {/* SURAH GRID SKELETON (Menampilkan 9 kotak tiruan kartu surat) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-teal-100 shadow-sm animate-pulse"
          >
            {/* Sisi Kiri: Nomor & Teks */}
            <div className="flex items-center space-x-4 w-full">
              {/* Indikator Nomor Lingkaran */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-teal-100"></div>

              {/* Nama Latin & Tempat Turun */}
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-teal-100 rounded w-28"></div>
                <div className="h-3 bg-teal-50 rounded w-20"></div>
              </div>
            </div>

            {/* Sisi Kanan: Nama Arab */}
            <div className="shrink-0 pl-4">
              <div className="h-6 bg-teal-100 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReadSurahSkeleton() {
  return (
    <div className="min-h-screen bg-teal-50/30 text-slate-800 font-sans pb-20">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-pulse">
        {/* HEADER SECTION SKELETON */}
        <header className="mb-12 flex flex-col items-center text-center">
          {/* Judul Arab Tiruan */}
          <div className="h-14 w-48 bg-teal-200/60 rounded-xl mb-4 mx-auto"></div>

          {/* Nama Latin & Arti */}
          <div className="space-y-2 w-full flex flex-col items-center">
            <div className="h-7 w-36 bg-teal-200/60 rounded-lg"></div>
            <div className="h-4 w-56 bg-teal-100 rounded-md"></div>
          </div>

          {/* Badge Info (Jumlah Ayat & Tempat Turun) */}
          <div className="mt-6 w-44 h-10 bg-teal-100/80 rounded-full"></div>
        </header>

        {/* LIST OF VERSES SKELETON (Membuat 5 tiruan ayat) */}
        <div className="space-y-6 md:space-y-8">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 p-4 md:p-6 bg-white rounded-2xl border border-teal-100/60 shadow-sm"
            >
              {/* Indikator Nomor Ayat */}
              <div className="shrink-0 flex items-start sm:pt-2">
                <div className="w-10 h-10 rounded-full bg-teal-100"></div>
              </div>

              {/* Konten Ayat Tiruan */}
              <div className="flex-1 flex flex-col w-full space-y-4">
                {/* Baris Teks Arab */}
                <div className="space-y-2.5 flex flex-col items-end w-full">
                  <div className="h-7 bg-teal-100/80 rounded w-full max-w-md"></div>
                  <div className="h-7 bg-teal-100/80 rounded w-3/4 max-w-sm"></div>
                </div>

                {/* Transliterasi & Terjemahan */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 bg-teal-100/60 rounded w-5/6"></div>
                  <div className="h-4 bg-teal-100/40 rounded w-full"></div>
                  <div className="h-4 bg-teal-100/40 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
