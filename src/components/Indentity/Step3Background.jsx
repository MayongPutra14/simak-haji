import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RegistrationForm from '../../utils/registerFormSchema';
import { InputRadio } from '../ui/InputRadio';
import { Button } from '../ui/Button';

const Step3Background = ({ onNext, onBack, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step3BackgroundSchema),
    defaultValues: initialData,
  });

  const handleOnSubmit = (data) => {
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4"
    >
      <InputRadio
        label="Pekerjaan"
        required={true}
        options={RegistrationForm.jobOptions}
        error={errors.job?.message}
        {...register('job')}
      />

      <InputRadio
        label="Pendidikan Terakhir"
        options={RegistrationForm.educationOptions}
        error={errors.education?.message}
        {...register('education')}
      />

      <InputRadio
        label="Program Keberangkatan"
        required={true}
        options={RegistrationForm.programOptions}
        error={errors.program?.message}
        {...register('program')}
      />

      <InputRadio
        label="Pengalaman Haji / Umroh"
        required={true}
        options={RegistrationForm.experienceOptions}
        error={errors.experience?.message}
        {...register('experience')}
      />

      <InputRadio
        label="Berangkat Bersama Siapa"
        required={true}
        options={RegistrationForm.companionOptions}
        error={errors.companion?.message}
        {...register('companion')}
      />

      {/* BUTTON */}
      <div className="flex justify-between">
        <Button type="button" variant="primary" onClick={onBack}>
          Kembali
        </Button>
        <Button type="submit" variant="primary">
          Selanjutnya
        </Button>
      </div>
    </form>
  );
};

export default Step3Background;
