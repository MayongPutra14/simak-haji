import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { InputLogin } from '../inputs/index';
import { loginSchema } from '../../../utils/loginSchema.js';
import Button from '../global/Button.jsx';
import { LuIdCard as IconIdCard, LuLock as IconLock } from 'react-icons/lu';

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4 bg-white w-[90%] max-w-md mx-auto p-6 rounded-2xl"
    >
      <InputLogin
        label="Nomor Porsi"
        type="number"
        placeholder="1000623881"
        leftIcon={<IconIdCard />}
        error={errors.porsiNumber?.message}
        {...register('porsiNumber')}
      />

      <InputLogin
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="✱✱✱✱✱✱"
        leftIcon={<IconLock />}
        error={errors.password?.message}
        {...register('password')}
      />

      {/* TOGGLE PASSWORD */}
      <div className="flex items-center gap-2 mb-4 -mt-1">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={(event) => setShowPassword(event.target.checked)}
          className="w-4 h-4 rounded cursor-pointer accent-sea-green-700"
        />
        <label
          htmlFor="showPassword"
          className="text-sm cursor-pointer select-none text-slate-600"
        >
          Tampilkan Password
        </label>
      </div>

      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        {isSubmitting ? 'Mengecek...' : 'Masuk'}
      </Button>

      {/* LINK TO REGISTER */}
      <div className="mt-6 text-sm text-center text-gray-600">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="font-semibold underline text-sea-green-600"
        >
          Daftar Sekarang
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
