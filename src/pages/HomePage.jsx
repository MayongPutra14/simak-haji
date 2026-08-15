import InputImage from '../components/inputs/InputImage';
import BottomNav from '../components/ui/BottomNavbar';
import { Header } from '../components/ui/Header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step2PersonalSchema } from '../utils/registerFormSchema';

const HomePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Step2PersonalSchema),
  });

  const onSubmit = (data) => {
    console.log('File yang diunggah:', data.userAvatar[0]);
  };

  return (
    <div>
      <Header />
      <BottomNav />
      <InputImage
        label="Foto Profil"
        description="Format PNG, JPG max 1 MB"
        required
        error={errors.userAvatar}
        value={watch('userAvatar')}
        {...register('userAvatar')}
      />
    </div>
  );
};

export default HomePage;
