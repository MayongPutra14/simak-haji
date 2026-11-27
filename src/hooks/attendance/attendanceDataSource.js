import {
  getAttendanceRecapAPI as getAdminAttendanceRecapAPI,
  getEventAttendanceDetailAPI as getAdminEventAttendanceDetailAPI,
  getJamaahAttendanceHistoryAPI as getAdminJamaahAttendanceHistoryAPI,
} from '../../utils/admin/api';
import {
  getAttendanceRecapAPI as getLeaderAttendanceRecapAPI,
  getEventAttendanceDetailAPI as getLeaderEventAttendanceDetailAPI,
  getJamaahAttendanceHistoryAPI as getLeaderJamaahAttendanceHistoryAPI,
} from '../../utils/leader/api';

/**
 * ROLE → PHP ACTION ROUTER FOR THE ADMIN/LEADER ATTENDANCE PAGES.
 * Each role already has its own session-scoped PHP file, so the hook only has
 * to pick the matching client.
 */
const ADMIN_SOURCE = Object.freeze({
  getAttendanceRecap: getAdminAttendanceRecapAPI,
  getEventAttendanceDetail: getAdminEventAttendanceDetailAPI,
  getJamaahAttendanceHistory: getAdminJamaahAttendanceHistoryAPI,
});

const LEADER_SOURCE = Object.freeze({
  getAttendanceRecap: getLeaderAttendanceRecapAPI,
  getEventAttendanceDetail: getLeaderEventAttendanceDetailAPI,
  getJamaahAttendanceHistory: getLeaderJamaahAttendanceHistoryAPI,
});

export default function getAttendanceDataSource(role) {
  return String(role ?? '').toLowerCase() === 'leader'
    ? LEADER_SOURCE
    : ADMIN_SOURCE;
}
