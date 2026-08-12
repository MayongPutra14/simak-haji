import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { InputLogin } from '../ui/InputLogin.jsx';
import { loginSchema } from '../../utils/loginSchema.js';
import { Button } from '../ui/Button.jsx';
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

      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        {isSubmitting ? 'Mengecek...' : 'Masuk'}
      </Button>

      {/* LINK TO REGISTER */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="text-sea-green-600 font-semibold underline"
        >
          Daftar Sekarang
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
