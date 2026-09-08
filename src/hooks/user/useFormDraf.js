import { useState, useEffect } from 'react';

const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

const useFormDraft = (userId) => {
  const STORAGE_KEY = `identity_form_draft_${userId || 'guest'}`;

  const [formData, _setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { currentStep: 1, data: {} };

    try {
      const { data, timestamp, currentStep } = JSON.parse(saved);
      if (Date.now() - timestamp > EXPIRATION_TIME) {
        localStorage.removeItem(STORAGE_KEY);
        return { currentStep: 1, data: {} };
      }
      return { currentStep: currentStep || 1, data: data || {} };
    } catch {
      return { currentStep: 1, data: {} };
    }
  });

  const [currentStep, setCurrentStep] = useState(formData.currentStep);
  const [formState, setFormState] = useState(formData.data);

  // DELETE DEAFT 'GUEST' WHEN USER HAS AUTHENTICATED (userId valid)
  useEffect(() => {
    if (userId) {
      localStorage.removeItem('identity_form_draft_guest');
    }
  }, [userId]);

  // AUTOMATIC SAVING DATA TO LOCAL STORAGE WHENEVER DATA CHANGE
  useEffect(() => {
    // skip saving process if form state is empty at step 1
    if (Object.keys(formState).length === 0 && currentStep === 1) return;

    try {
      // CREATE SHALLOW COPY TO PREVENT MUTATING REACT STATE
      const cleanDataToSave = { ...formState };

      // SANITIZE FILE OBJECTS FROM STORAGE PAYLOAD
      Object.keys(cleanDataToSave).forEach((key) => {
        if (cleanDataToSave[key] instanceof File) {
          delete cleanDataToSave[key]; // remove file reference from storage payload only
        }
      });

      const payload = {
        data: cleanDataToSave,
        currentStep,
        timestamp: Date.now(),
      };

      // PERSIST SANITIZED DATA TO LOCAL STORAGE
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error('Failed to save data into localstorage:', error);
    }
  }, [formState, currentStep, STORAGE_KEY]);

  // FUCNTION TO CLEAR DRAFT (when submit form)
  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('identity_form_draft_guest');
    setFormState({});
    setCurrentStep(1);
  };

  return {
    currentStep,
    setCurrentStep,
    formData: formState,
    setFormData: setFormState,
    clearDraft,
  };
};

export default useFormDraft;
