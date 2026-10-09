// src/hooks/useModal.js
import { useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    icon: null,
    iconBgColor: '',
    iconColor: '',
    buttonColor: '',
    onConfirm: null,
  });

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const showModal = ({
    title = 'Informasi',
    description = '',
    icon = null,
    iconBgColor = 'bg-blue-100',
    iconColor = 'text-blue-500',
    buttonColor = 'bg-blue-500 hover:bg-blue-600 text-white',
    onConfirm = null,
  }) => {
    setModal({
      isOpen: true,
      title,
      description,
      icon,
      iconBgColor,
      iconColor,
      buttonColor,
      onConfirm,
    });
  };

  return {
    modal,
    closeModal,
    showModal,
  };
};
