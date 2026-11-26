import {
  getAttendanceRecapMock,
  getEventAttendanceDetailMock,
  getJamaahAttendanceHistoryMock,
} from '../../data/mock/attendanceRecap';
import {
  getAttendanceRecapAPI as getAdminAttendanceRecapAPI,
  getEventAttendanceDetailAPI as getAdminEventAttendanceDetailAPI,
  getJamaahAttendanceHistoryAPI as getAdminJamaahAttendanceHistoryAPI,
} from '../../utils/admin/api';
import { ATTENDANCE_USE_MOCK } from '../../utils/helpers/constant';
import {
  getAttendanceRecapAPI as getLeaderAttendanceRecapAPI,
  getEventAttendanceDetailAPI as getLeaderEventAttendanceDetailAPI,
  getJamaahAttendanceHistoryAPI as getLeaderJamaahAttendanceHistoryAPI,
} from '../../utils/leader/api';

/**
 * SINGLE SWITCH BETWEEN THE PHASE 2 MOCK AND THE REAL PHP ACTIONS.
 * Flip `ATTENDANCE_USE_MOCK` in `src/utils/helpers/constant.js` to `false`.
 */
const MOCK_SOURCE = Object.freeze({
  getAttendanceRecap: getAttendanceRecapMock,
  getEventAttendanceDetail: getEventAttendanceDetailMock,
  getJamaahAttendanceHistory: getJamaahAttendanceHistoryMock,
});

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

export const getAttendanceDataSource = (role) => {
  if (ATTENDANCE_USE_MOCK) return MOCK_SOURCE;

  return String(role ?? '').toLowerCase() === 'leader'
    ? LEADER_SOURCE
    : ADMIN_SOURCE;
};

export default getAttendanceDataSource;
