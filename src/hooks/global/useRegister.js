import { registerAPI } from '../../utils/user/api';

export const useRegister = () => {
  const register = async (data) => {
    const response = await registerAPI(data);

    return response;
  };

  return {
    register,
  };
};
