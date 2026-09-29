import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputLogin as InputRegistration } from '../inputs/index';
import { registrationSchema } from '../../../utils/helpers/registerFormSchema';
import Button from '../global/Button.jsx';
import { MdOutlinePermIdentity as IconPerson } from 'react-icons/md';
import {
  LuIdCard as IconIdCard,
  LuPhone as IconPhone,
  LuLock as IconLock,
} from 'react-icons/lu';

const RegisterForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4 bg-slate-900/40 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-md mx-auto"
    >
      {/* INPUT NAME */}
      <InputRegistration
        label="Nama Lengkap"
        type="text"
        placeholder="Masukan Nama lengkap"
        leftIcon={<IconPerson />}
        error={errors.name?.message}
        {...register('name')}
      />

      {/* INPUT PORSI NUMBER */}
      <InputRegistration
        label="Nomor Porsi"
        type="number"
        placeholder="1000623881"
        leftIcon={<IconIdCard />}
        error={errors.porsiNumber?.message}
        {...register('porsiNumber')}
      />

      {/* INPUT NOMOR WHATSAPP */}
      <InputRegistration
        label="Nomor WhatsApp"
        type="number"
        placeholder="089633415543"
        leftIcon={<IconPhone />}
        error={errors.whatsappNumber?.message}
        {...register('whatsappNumber')}
      />

      {/* INPUT PASSWORD */}
      <InputRegistration
        label="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="✱✱✱✱✱✱"
        leftIcon={<IconLock />}
        error={errors.password?.message}
        {...register('password')}
      />

      {/* SHOW PASSWORD CHECKBOX */}
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
          className="text-sm cursor-pointer select-none text-slate-200 hover:text-white transition-colors"
        >
          Tampilkan Password
        </label>
      </div>

      {/* BUTTON SUBMIT */}
      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        {isSubmitting ? 'Memproses...' : 'Daftar'}
      </Button>

      {/* LINK TO LOGIN */}
      <div className="mt-4 text-sm text-center text-slate-300">
        Sudah punya akun?{' '}
        <Link
          to="/login"
          className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
        >
          masuk
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
