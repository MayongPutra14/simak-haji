import { useNavigate } from 'react-router';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserSchema } from '../../utils/admin/createUserSchema';
import { Button } from '../ui/global/Button';
import {
  Section1Account,
  Section2PersonalData,
  Section3Background,
  Section4HealthSkill,
  Section5Reference,
  Section6HajjData,
  Section7ControlProcess,
  Section8Placement,
} from './components/index';

const CreateUser = ({ onSubmitHandler, isLoading }) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(CreateUserSchema),
    shouldFocusError: true,
    defaultValues: {
      porsionNumber: '',
      password: '',
      confirmPassword: '',
      fatherName: '',
      birthDate: '',
      gender: '',
      birthPlace: '',
      address: '',
      subDistrict: '',
      village: '',
      profileImage: '',
      job: '',
      education: '',
      depature: '',
      experience: '',
      companion: '',
      mahramName: '',
      expertise: [],
      contribution: [],
      health: [],
      referenceName: '',
      referencePhone: '',
      referenceOrigin: '',
      currPorsionPosition: '',
      currPorstionStatus: '',
      currPorsionPositionBackup: '',
      currPorstionStatusBackup: '',
      zone: '',
      googleFormStatus: '',
      photoStatus: '',
      spphStatus: '',
      mutationStatus: '',
      biometricStatus: '',
      puskesmasStatus: '',
      mcuStatus: '',
      paymentStatus: '',
      passport: '',
      visa: '',
      plotNumber: '',
      batch: '',
      group: '',
      team: '',
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-[95%] md:w-[98%]  p-6 mx-auto mt-5 bg-white border shadow-sm md:p-8 rounded-xl border-slate-200">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          Registrasi Akun Baru
        </h1>

        <form
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          className="space-y-8"
        >
          <Section1Account />

          <Section2PersonalData />

          <Section3Background />

          <Section4HealthSkill />

          <Section5Reference />

          <Section6HajjData />

          <Section7ControlProcess />

          <Section8Placement />

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="kembali"
              variant="primary"
              onClick={handleBack}
              isLoading={isLoading}
            >
              Kembali
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Input Data
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateUser;
