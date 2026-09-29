import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { InputLogin } from '../inputs/index';
import { loginSchema } from '../../../utils/helpers/loginSchema';
import Button from '../global/Button.jsx';
import { LuIdCard as IconIdCard, LuLock as IconLock } from 'react-icons/lu';

export default function LoginForm({ onSubmit }) {
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
      className="flex flex-col justify-center gap-4 bg-slate-900/40 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-md mx-auto"
    >
      <InputLogin
        label="Nomor Porsi"
        type="number"
        placeholder="1000623881"
        leftIcon={<IconIdCard className="text-emerald-300" />}
        error={errors.porsiNumber?.message}
        {...register('porsiNumber')}
      />

      <InputLogin
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="✱✱✱✱✱✱"
        leftIcon={<IconLock className="text-emerald-300" />}
        error={errors.password?.message}
        {...register('password')}
      />

      {/* TOGGLE PASSWORD */}
      <div className="flex items-center gap-2.5 my-1">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={(event) => setShowPassword(event.target.checked)}
          className="w-4 h-4 rounded cursor-pointer accent-emerald-500 bg-white/20 border-white/30 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0"
        />
        <label
          htmlFor="showPassword"
          className="text-sm cursor-pointer select-none text-slate-200 hover:text-white transition-colors"
        >
          Tampilkan Password
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-950/50 transition-all duration-200 active:scale-[0.98]"
      >
        {isSubmitting ? 'Mengecek...' : 'Masuk'}
      </Button>

      {/* LINK TO REGISTER */}
      <div className="mt-4 text-sm text-center text-slate-300">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
        >
          Daftar Sekarang
        </Link>
      </div>
    </form>
  );
}
