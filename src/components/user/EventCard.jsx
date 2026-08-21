const getAttendanceStatus = (status, isAttended) => {
  if (isAttended === 1) {
    return {
      label: 'Hadir',
      badgeClass: 'bg-sea-green-100 text-sea-green-400',
    };
  }

  if (status === 'selesai' && isAttended === 0) {
    return {
      label: 'Absen',
      badgeClass: 'bg-red-100 text-red-400',
    };
  }

  return {
    label: 'Menunggu',
    badgeClass: 'bg-galliano-100 text-galliano-400',
  };
};

const EventCard = ({ event, isLoading = false }) => {
  // SKELETON LOADING

  if (isLoading) {
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

  // SHOW DATA
  const namaEvent = event?.nama_event || 'Tidak ada Judul';
  const eventStatus = event?.status || 'mendatang';
  const isAttended = event?.is_attended ?? 0;

  const attendance = getAttendanceStatus(eventStatus, isAttended);

  return (
    <div className="w-full max-w-md p-5 mx-auto  transition-all bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* TITLE EVENT */}
      <h2 className="pb-3 text-2xl font-semibold border-b border-gray-100 text-slate-700">
        {namaEvent}
      </h2>

      {/* DETAIL ATTENDANCE STATUS */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm font-normal text-slate-400">
          Status kehadiran
        </span>

        {/* BADGE CAPSULE */}
        <span
          className={`px-4 py-1.5 rounded-full text-xs font-medium ${attendance.badgeClass}`}
        >
          {attendance.label}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
