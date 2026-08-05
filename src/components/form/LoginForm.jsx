import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputLogin } from '../ui/InputLogin.jsx';
import { loginSchema } from '../../utils/loginScema.js';
import {
  MdLockOutline as IconLock,
  MdOutlinePermIdentity as IconPerson,
} from 'react-icons/md';
import { Button } from '../ui/Button.jsx';

export const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleOnSubmit = (data) => {
    console.log('Data login berhasil di tangkap:', data);
    alert('Login berhasil');
  };
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4"
    >
      {/* INPUT EMAIL */}
      <InputLogin
        label="Nomor Porsi"
        type="number"
        placeholder="1000623881"
        leftIcon={<IconPerson />}
        error={errors.email?.message}
        {...register('email')}
      />

      {/* INPUT PASSWORD */}
      <InputLogin
        label="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="✱✱✱✱✱✱"
        leftIcon={<IconLock />}
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex items-center gap-2 -mt-1 mb-4">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={(event) => setShowPassword(event.target.checked)}
          className="w-4 h-4 accent-sea-green-700 rounded cursor-pointer"
        />
        <label
          htmlFor="showPassword"
          className="text-sm text-slate-600 cursor-pointer select-none"
        >
          Tampilkan Password
        </label>
      </div>

      {/* BUTTON SUBMIT */}
      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        Masuk
      </Button>
    </form>
  );
};
