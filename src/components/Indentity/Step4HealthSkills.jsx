import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RegistrationForm from '../../utils/registerFormSchema';
import { InputCheckbox } from '../ui/InputCheckbox';
import { Button } from '../ui/Button';

const Step4HealthSkills = ({ onNext, onBack, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step4SkillsSchema),
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
      <InputCheckbox
        label="Kemampuan yang dikuasai"
        description="Bisa di isi dengan beberapa kemampuan yang sesuai"
        required={true}
        options={RegistrationForm.skillOptions}
        hasOtherOption={true}
        error={errors.skill?.message}
        {...register('skill')}
      />

      <InputCheckbox
        label="Hal Positif Yang Dapat Dikontribusikan Kepada SIMAK"
        description="Bisa di isi dengan beberapa kemampuan yang sesuai"
        required={true}
        options={RegistrationForm.positiveTraitOptions}
        hasOtherOption={true}
        error={errors.positiveTrait?.message}
        {...register('positiveTrait')}
      />

      <InputCheckbox
        label="Kesehatan dan Kebutuhan Khusus"
        description="Tandai sesuai kondisi & kebutuhan calon jamaah (boleh centang lebih dari satu). Data ini diperlukan untuk kami folow up"
        required={true}
        options={RegistrationForm.healthConditionOptions}
        hasOtherOption={true}
        error={errors.healthCondition?.message}
        {...register('healthCondition')}
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

export default Step4HealthSkills;
