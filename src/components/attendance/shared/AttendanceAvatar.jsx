import { useState } from 'react';
import { ATTENDANCE_STATUS } from '../../../utils/helpers/constant';
import { getInitials } from '../../../utils/helpers/attendanceRecap';

const AVATAR_BASE =
  'flex shrink-0 items-center justify-center overflow-hidden border font-bold';

const getToneClass = (status) => {
  if (!status) {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }

  return status === ATTENDANCE_STATUS.PRESENT
    ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
    : 'border-slate-200 bg-slate-100 text-slate-600';
};

/**
 * Profile photo with a name-initials fallback.
 *
 * The failed url is tracked by value, so opening a jamaah with a different
 * photo attempts the new image instead of keeping the fallback forever.
 */
export default function AttendanceAvatar({
  photoUrl,
  fullName,
  status,
  // default to small circle for table rows (/attendance/recaps/:id)
  className = 'h-8 w-8 rounded-full',
  textClassName = 'text-xs',
}) {
  const [failedPhotoUrl, setFailedPhotoUrl] = useState(null);
  const showPhoto = Boolean(photoUrl) && failedPhotoUrl !== photoUrl;

  return (
    <span
      className={`${AVATAR_BASE} ${getToneClass(status)} ${textClassName} ${className}`}
    >
      {showPhoto ? (
        <img
          src={photoUrl}
          alt={fullName || 'Avatar'}
          // fill parent dimensions without forcing aspect ratio inside img
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailedPhotoUrl(photoUrl)}
        />
      ) : (
        getInitials(fullName)
      )}
    </span>
  );
}
