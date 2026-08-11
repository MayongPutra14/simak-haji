import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputLogin } from '../ui/InputLogin.jsx';
import { loginSchema } from '../../utils/loginSchema.js';
import { Button } from '../ui/Button.jsx';
import { LuIdCard as IconIdCard, LuLock as IconLock } from 'react-icons/lu';

import axios from 'axios';

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleOnSubmit = async (data) => {
    setLoginError('');

    try {
      const formData = new FormData();
      formData.append('nomor_porsi', data.porsiNumber);
      formData.append('password', data.password);

      const response = await axios.post(
        'http://localhost/simak_api/login.php',
        formData,
      );

      if (response.data.status === 'success') {
        const userData = response.data.data;

        // 3. Simpan data user ke localStorage (Sesi Login - Fitur 4)
        localStorage.setItem('user', JSON.stringify(userData));

        if (onSubmit) {
          await onSubmit(userData);
        }

        // 4. Redirect ke Dashboard masing-masing role
        if (userData.role === 'admin') {
          navigate('/admin-dashboard'); // Arahkan ke Dashboard Admin
        } else {
          navigate('/user-dashboard'); // Arahkan ke Dashboard User
        }
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      console.error('Gagal terhubung ke server', error);
      setLoginError('Terjadi kesalahan jaringan atau server.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4 bg-white w-[90%] max-w-md mx-auto p-6 rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Masuk ke Akun
      </h2>

      {loginError && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm text-center">
          {loginError}
        </div>
      )}

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

      <div className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="text-sea-green-600 font-semibold underline"
        >
          daftar
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
