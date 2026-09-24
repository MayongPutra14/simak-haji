import { updatePasswordAPI } from '../../utils/user/api';

export const useUpdatePassword = () => {
  const updatePassword = async (userId, newPassword) => {
    const response = await updatePasswordAPI(userId, newPassword);

    return response;
  };

  return { updatePassword };
};
