import LogoSimak from '../components/ui/global/LogoSimak';
import RegisterForm from '../components/ui/form/RegisterForm';
import { motion } from 'motion/react';

const RegisterFormFragment = ({ onSubmit }) => {
  return (
    <motion.div
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="w-full"
    >
      <LogoSimak
        title="Registrasi Jemaah Baru SIMAK"
        subtitle="Siapkan dokumen Anda dan isi data diri dengan lengkap"
      />

      <RegisterForm onSubmit={onSubmit} />
    </motion.div>
  );
};

export default RegisterFormFragment;
