import { useState } from 'react';
import { attendanceAPI } from '../../utils/user/api';

// CUSTOM HOOK FOR SUBMITTING ATTENDANCE
export function useSubmitAttendance() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAttendance = async (payload) => {
    setIsSubmitting(true);
    try {
      const response = await attendanceAPI(payload);
      if (response?.status === 'success') {
        return {
          success: 'success',
          message: response.message,
          data: response.data,
        };
      }

      return {
        success: 'failed',
        message: response?.message || 'Failed to record attendance.',
      };
    } catch (err) {
      return {
        success: 'failed',
        message: err?.response?.data?.message,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitAttendance, isSubmitting };
}
