import { useState } from 'react';
import { createAdminUsersData } from '../../utils/admin/adminAPI';

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitUserData = async (rawFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Initialize FormData to handle both Text + File data
      const formData = new FormData();

      // 2. Map specific/custom fields from the Form
      formData.append('is_completed', 'true');

      // 3. Append standard data (String / Number) to FormData
      Object.keys(rawFormValues).forEach((key) => {
        const value = rawFormValues[key];

        // Image / file handler
        if (value instanceof File) {
          formData.append(key, value, value.name);
        }
        // Array handler(change stirg input to arrya)
        else if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item) formData.append(`${key}[]`, item);
          });
        }
        //  STRING / NUMBER / BOOLEAN handler
        else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      // 4. Send data to the API
      const result = await createAdminUsersData(formData);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred while saving data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitUserData, isLoading, error };
};
