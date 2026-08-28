import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RegistrationForm from '../../../utils/registerFormSchema';
import InputRadio from '../inputs/InputRadio';
import InputText from '../inputs/InputText';
import { Button } from '../global/Button';

const Step3Background = ({ onNext, onBack, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step3BackgroundSchema),
    defaultValues: initialData,
  });

  const jobValue = useWatch({ control, name: 'job' });
  const educationValue = useWatch({ control, name: 'education' });
  const programValue = useWatch({ control, name: 'program' });
  const experienceValue = useWatch({ control, name: 'experience' });
  const companionValue = useWatch({ control, name: 'companion' });

  const handleOnSubmit = (data) => {
    onNext(data);
  };

  const handleBackWithData = () => {
    const currentValues = getValues();
    onBack(currentValues);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4"
    >
      <InputRadio
        label="Pekerjaan"
        required={true}
        hasOtherOption={true}
        options={RegistrationForm.jobOptions}
        variant="underlined"
        withCard={true}
        error={errors.job?.message}
        value={jobValue}
        {...register('job')}
      />

      <InputRadio
        label="Pendidikan Terakhir"
        required={false}
        options={RegistrationForm.educationOptions}
        error={errors.education?.message}
        variant="underlined"
        withCard={true}
        value={educationValue}
        {...register('education')}
      />

      <InputRadio
        label="Program Keberangkatan"
        required={true}
        hasOtherOption={true}
        options={RegistrationForm.programOptions}
        variant="underlined"
        withCard={true}
        error={errors.program?.message}
        value={programValue}
        {...register('program')}
      />

      <InputRadio
        label="Pengalaman Haji / Umroh"
        required={true}
        options={RegistrationForm.experienceOptions}
        variant="underlined"
        withCard={true}
        error={errors.experience?.message}
        value={experienceValue}
        {...register('experience')}
      />

      <InputRadio
        label="Berangkat Bersama Siapa"
        required={true}
        hasOtherOption={true}
        options={RegistrationForm.companionOptions}
        variant="underlined"
        withCard={true}
        error={errors.companion?.message}
        value={companionValue}
        {...register('companion')}
      />

      <InputText
        label="Nama Pendamping Utama / Mahram"
        description="Wajib diisi. Isi dengan nama anggota keluarga inti yang berangkat dalam satu rombongan/kloter dengan Anda."
        required={true}
        variant="underlined"
        withCard={true}
        error={errors.nama_mahram?.message}
        {...register('nama_mahram')}
      />

      {/* BUTTON */}
      <div className="flex items-center gap-4 w-80">
        <Button type="button" variant="primary" onClick={handleBackWithData}>
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
