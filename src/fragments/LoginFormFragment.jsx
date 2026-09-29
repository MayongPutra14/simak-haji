import LoginForm from '../components/ui/form/LoginForm';
import LogoSimak from '../components/ui/global/LogoSimak';
import { motion } from 'motion/react';

export default function LoginFormFragment({ onSubmit }) {
  return (
    <motion.div
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="w-full"
    >
      <LogoSimak
        title="Dashboard Layanan SIMAK"
        subtitle="Silahkan masuk untuk mengakses akun Anda"
      />

      {/* Form Section */}
      <LoginForm onSubmit={onSubmit} />
    </motion.div>
  );
}
