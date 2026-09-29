import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../global/Button';
import { InputNumber } from '.';
import { updateQuotaProvince } from '../../../utils/admin/api';
import Modal from '../global/Modal';
import { MdUpdate as IconUpdate } from 'react-icons/md';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

export const UpdateQuotaSection = ({ onRefresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      provinceQuota: '',
    },
  });

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

  const showErrorModal = (errorMessage) => {
    setModal({
      isOpen: true,
      title: 'Update gagal',
      description:
        errorMessage || 'Update kuota provinsi gagal, silahkan coba lagi',
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-700 text-white',
      onConfirm: null,
    });
  };

  const showSuccessModal = () => {
    setModal({
      isOpen: true,
      title: 'Update berhasil',
      description:
        'Update kuota provinsi berhasil, silahkan pastikan data sudah sesuai',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: null,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const onSubmit = async (data) => {
    const response = await updateQuotaProvince(data);
    if (response.status === 'success') {
      showSuccessModal();
      reset();
      if (onRefresh) onRefresh();
    } else {
      showErrorModal(response.message);
      reset();
    }
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 sm:justify-start"
      >
        <div className="md:max-w-md">
          <InputNumber
            label="Update Kuota Haji "
            placeholder="27890"
            className="w-30"
            error={errors.provinceQuota?.message}
            {...register('provinceQuota', {
              required: 'Kuota provinsi tidak boleh kosong',
              valueAsNumber: true,
            })}
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          isLoading={isSubmitting}
          className="flex items-center md:max-w-md"
        >
          <IconUpdate className="w-5 h-5 " />
          Update Kuota
        </Button>
      </form>

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onConfirm || closeModal}
        title={modal.title}
        description={modal.description}
        icon={modal.icon}
        iconBgColor={modal.iconBgColor}
        iconColor={modal.iconColor}
        buttonText="Tutup"
        buttonColor={modal.buttonColor}
      />
    </section>
  );
};
