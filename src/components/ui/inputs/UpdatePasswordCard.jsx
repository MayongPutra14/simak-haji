import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IoEyeOutline as IconEye,
  IoEyeOffOutline as IconEyeOff,
} from 'react-icons/io5';
import InputText from './InputText';
import Button from '../global/Button';
import { updatePasswordSchemas } from '../../../utils/admin/createUserSchema';
import { useUpdatePassword } from '../../../hooks/global/useUpdatePassword';

export default function UpdatePasswordCard({ userId, logout }) {
  // Vsibility toggle password
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updatePassword } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updatePasswordSchemas),
  });

  const handleOnSUbmit = async (data) => {
    const response = await updatePassword(userId, data.newPassword);

    if (response.status === 'success') {
      alert(response.message);
      reset();
      logout();
    } else {
      alert(response.message);
    }
  };
  return (
    <div className="p-6 bg-white border md:max-w-md border-rose-100 shadow-sm rounded-3xl hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-rose-100 bg-rose-50/50 -mx-6 -mt-6 p-6 rounded-t-3xl">
        <h2 className="text-lg font-bold text-rose-700">Update Password</h2>
        <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
      </div>

      <form onSubmit={handleSubmit(handleOnSUbmit)} className="space-y-4">
        {/* INPUT NEW PASSWORD */}
        <div className="relative">
          <InputText
            label="Password Baru"
            placeholder=""
            required={true}
            type={showNewPassword ? 'text' : 'password'}
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-8.5 text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Toggle password visibility"
          >
            {showNewPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>

        {/* ICON EYE */}
        <div className="relative">
          <InputText
            label="Confirm Password"
            placeholder=""
            required={true}
            type={showConfirmPassword ? 'text' : 'password'}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8.5 text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Toggle confirm password visibility"
          >
            {showConfirmPassword ? (
              <IconEyeOff size={20} />
            ) : (
              <IconEye size={20} />
            )}
          </button>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </div>
  );
}
