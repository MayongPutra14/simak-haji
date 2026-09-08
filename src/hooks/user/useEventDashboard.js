import { useState } from 'react';
import { useDashboardEvent } from '../../features/eventsDashboard/useDashboardEvent';
import {
  calculateDistance,
  getUserLocation,
} from '../../utils/helpers/geoLocation';

export const useEventDashboard = (user) => {
  const { eventData, isLoading } = useDashboardEvent(user?.id);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  const defaultModalState = {
    isOpen: false,
    title: '',
    description: '',
    buttonText: 'Tutup',
    cancelButtonText: 'Batal',
    showCancelButton: false,
    onConfirm: null,
    onCancel: null,
  };

  const [modalConfig, setModalConfig] = useState(defaultModalState);

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  const showModal = (config) => {
    setModalConfig({
      ...defaultModalState,
      isOpen: true,
      onConfirm: closeModal,
      onCancel: closeModal,
      ...config,
    });
  };

  const handleActionClick = async () => {
    if (!eventData) return;

    const currentStatus = eventData.status?.toLowerCase();

    // 1. CHECK EVENT STATUS
    if (currentStatus !== 'live') {
      if (currentStatus === 'completed') {
        return showModal({
          title: 'Acara Selesai',
          description:
            'Acara telah selesai, Anda tidak dapat mengakses materi.',
        });
      }
      return showModal({
        title: 'Belum Dimulai',
        description: 'Acara belum dimulai. Mohon untuk menunggu.',
      });
    }

    // 2. CHECKING PRESENTION
    if (eventData.isAttended === 0) {
      return showModal({
        title: 'Belum Absen',
        description: 'Silahkan Absen terlebih dahulu untuk mengakses materi.',
        buttonText: 'Scan QR Sekarang',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        onConfirm: () => {
          closeModal();
        },
      });
    }

    // 3. GEOLOCATION CHECK (RADIUS)
    try {
      setIsCheckingLocation(true);

      const userLoc = await getUserLocation(7000);

      const distance = calculateDistance(
        userLoc.latitude,
        userLoc.longitude,
        parseFloat(eventData.latitude),
        parseFloat(eventData.longitude),
      );

      if (distance > eventData.radius) {
        return showModal({
          title: 'Di Luar Jangkauan',
          description: `Anda berada di luar lokasi event. Jarak Anda saat ini ${Math.round(distance)} meter dari titik acara (Batas: ${eventData.radius}m).`,
        });
      }

      // IF PASSED ALL OF CHECKING
      showModal({
        title: 'Akses Berhasil',
        description: 'Membuka materi bacaan event...',
        buttonText: 'Lanjut',
        onConfirm: () => {
          closeModal();
          // TODO: Arahkan/Download materi
        },
      });
    } catch (_error) {
      showModal({
        title: 'Akses Lokasi Gagal',
        description:
          'Mohon izinkan akses lokasi (GPS) pada browser Anda untuk memverifikasi kehadiran.',
      });
    } finally {
      setIsCheckingLocation(false);
    }
  };

  return {
    eventData,
    isLoading: isLoading || isCheckingLocation,
    modalConfig,
    closeModal,
    handleActionClick,
  };
};
