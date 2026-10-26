import { useCallback, useState } from 'react';
import {
  getLandingSectionAPI,
  updateLandingPageAPI,
} from '../../../utils/admin/api';
import {
  compressAndConvertToWebP,
  processAndUploadFiles,
} from '../../../utils/helpers/helpers';

// CLOUDINARY CONFIG
const CLOUD_NAME = 'llp0te3a';
const UPLOAD_PRESET = 'simak_preset';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export function useEditLandingSection() {
  const [sectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET SECTION DATA
  const getSectionData = useCallback(async (sectionKey) => {
    if (!sectionKey) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getLandingSectionAPI(sectionKey);
      if (response && response?.status === 'success')
        setSectionData(response.data);
    } catch (error) {
      const errMsg = error.message || 'Gagal mengambil data section';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // UPLOAD IMAGE TO CLOUDINARY HELPER
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    try {
      // 1. Compress and convert the file to .webp format first
      const compressedWebPFile = await compressAndConvertToWebP(file);

      const formData = new FormData();
      formData.append('file', compressedWebPFile);
      formData.append('upload_preset', UPLOAD_PRESET);

      // 2. Specify the destination folder in Cloudinary (Folder: landing_page)
      formData.append('folder', 'landing_page');

      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error?.message || 'Failed to upload image to Cloudinary',
        );
      }

      return {
        image_url: data.secure_url,
        public_id: data.public_id,
      };
    } catch (error) {
      console.error('Cloudinary compression & upload error:', error);
      throw error;
    }
  };

  // SUBMIT SECTION DATA HANDLER
  const updateSectionData = useCallback(async (formDataPayload, sectionKey) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. process and upload any File instances inside content object recursively
      const processedContent = await processAndUploadFiles(
        formDataPayload.content,
        uploadToCloudinary,
      );

      // 2. construct final payload matching backend and database requirement
      const finalPayload = {
        section_key: sectionKey,
        content: processedContent,
      };

      const result = await updateLandingPageAPI(finalPayload);
      return result;
    } catch (error) {
      console.error('Error saving landing section:', error);
      return {
        status: 'failed',
        message: error.message || 'Terjadi kesalahan saat menyimpan data.',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sectionData,
    isLoading,
    error,
    getSectionData,
    updateSectionData,
  };
}
