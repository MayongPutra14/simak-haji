import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IoEyeOutline, IoEyeOffOutline, IoKeyOutline } from 'react-icons/io5'; // Import icon tambahan

import InputText from '../../../ui/inputs/InputText';
import InputNumber from '../../../ui/inputs/InputNumber';
import { InputSelect } from '../../../ui/inputs';
import * as CreateUserSchema from '../../../../utils/admin/createUserSchema';

export default function Section1Account() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const generateRandomPassword = () => {
    const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let newPassword = '';

    for (let i = 0; i < 8; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setValue('password', newPassword, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setShowPassword(true);
  };

  const handleInputClick = () => {
    const currentPassword = getValues('password');
    if (!currentPassword) {
      generateRandomPassword();
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="bg-red-50 text-red-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        AKUN JAMAAH
      </h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* USER NAME */}
        <InputText
          label="Nama Lengkap"
          placeholder="Budi Susanto"
          required={true}
          error={errors.nama_lengkap?.message}
          {...register('nama_lengkap')}
        />

        {/* POSRSI NUMBER */}
        <InputNumber
          label="Nomor Porsi"
          placeholder="1000623881"
          required={true}
          maxLength={13}
          error={errors.nomor_porsi?.message}
          {...register('nomor_porsi')}
        />

        {/* WHATSAPP NUMBER */}
        <InputNumber
          label="Nomor Whatsapp"
          placeholder="1000623881"
          required={true}
          maxLength={13}
          error={errors.whatsapp?.message}
          {...register('whatsapp')}
        />

        {/* ROLE */}
        <InputSelect
          label="Role"
          required={true}
          placeholder=""
          options={CreateUserSchema.roleOptions}
          error={errors.role?.message}
          {...register('role')}
        />

        {/* PASSWORD FIELD DENGAN FITUR BARU */}
        <div className="flex flex-col">
          <div className="relative">
            <InputText
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Klik untuk generate acak"
              required={true}
              error={errors.password?.message}
              {...register('password')}
              onClick={handleInputClick}
            />

            {/* show/hide button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8.5 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label={
                showPassword ? 'Sembunyikan password' : 'Tampilkan password'
              }
            >
              {showPassword ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </button>
          </div>

          {/* Tombol Trigger Generate Manual */}
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              onClick={generateRandomPassword}
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <IoKeyOutline size={16} />
              Buat Password Otomatis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
