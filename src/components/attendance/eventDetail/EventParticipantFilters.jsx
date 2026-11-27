import SeacrhInput from '../../ui/inputs/SeacrhInput';
import InlineFilterBar from '../../ui/global/InlineFilterBar';
import AttendanceStatusTabs from '../shared/AttendanceStatusTabs';
import { IconLocation } from '../../../utils/helpers/decorations';

/**
 * Participant toolbar: search, status tabs with scoped counts, and the zone
 * control. Admins get a derived zone select; leaders see their locked zone.
 */
export default function EventParticipantFilters({
  search,
  status,
  statusOptions,
  isFilterActive,
  zoneFilterConfigs,
  isZoneFilterVisible,
  lockedZone,
  onSearchChange,
  onStatusChange,
  onClearFilters,
}) {
  return (
    <section
      aria-label="Pencarian dan filter peserta kegiatan"
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* SEARCH INPUT WRAPPER */}
        <div className="min-w-0 flex-1">
          <SeacrhInput
            placeHolder="Cari nama jamaah atau wilayah..."
            searchQuery={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        {/* STATUS TABS + ZONE CONTROL */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <AttendanceStatusTabs
            options={statusOptions}
            value={status}
            onChange={onStatusChange}
          />

          {isZoneFilterVisible ? (
            <div className="w-full sm:w-auto sm:min-w-48">
              <InlineFilterBar
                filters={zoneFilterConfigs}
                isFilterActive={isFilterActive}
                onClear={onClearFilters}
              />
            </div>
          ) : (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <IconLocation className="h-3.5 w-3.5" aria-hidden="true" />
              Zona {lockedZone || '-'}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
