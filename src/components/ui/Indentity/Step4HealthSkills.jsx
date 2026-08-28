import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RegistrationForm from '../../../utils/registerFormSchema';
import { InputCheckbox } from '../inputs/InputCheckbox';
import { Button } from '../global/Button';

const Step4HealthSkills = ({ onNext, onBack, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step4SkillsSchema),
    defaultValues: initialData,
  });

  // WATCH ALL OF CHECKBOX
  const skillValue = useWatch({ control, name: 'skill' });
  const positiveTraitValue = useWatch({ control, name: 'positiveTrait' });
  const healthConditionValue = useWatch({ control, name: 'healthCondition' });

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
      <InputCheckbox
        label="Kemampuan yang dikuasai"
        description="Bisa di isi dengan beberapa kemampuan yang sesuai"
        required={true}
        options={RegistrationForm.skillOptions}
        hasOtherOption={true}
        error={errors.skill?.message}
        value={skillValue}
        {...register('skill')}
      />

      <InputCheckbox
        label="Hal Positif Yang Dapat Dikontribusikan Kepada SIMAK"
        description="Bisa di isi dengan beberapa kemampuan yang sesuai"
        required={true}
        options={RegistrationForm.positiveTraitOptions}
        hasOtherOption={true}
        error={errors.positiveTrait?.message}
        value={positiveTraitValue}
        {...register('positiveTrait')}
      />

      <InputCheckbox
        label="Kesehatan dan Kebutuhan Khusus"
        description="Tandai sesuai kondisi & kebutuhan calon jamaah (boleh centang lebih dari satu). Data ini diperlukan untuk kami folow up"
        required={true}
        options={RegistrationForm.healthConditionOptions}
        hasOtherOption={true}
        error={errors.healthCondition?.message}
        value={healthConditionValue}
        {...register('healthCondition')}
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

export default Step4HealthSkills;
