import { useState } from 'react';
import { loginApi } from '../../utils/user/api';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutateLogin = async (data) => {
    setIsLoading(true);
    try {
      const result = await loginApi(data);
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return { mutateLogin, isLoading };
};
