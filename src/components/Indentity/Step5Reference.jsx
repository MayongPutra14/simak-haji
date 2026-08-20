import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../inputs/InputText';
import { InputRadio } from '../inputs/InputRadio';
import { Button } from '../ui/Button';
import * as RegistrationForm from '../../utils/registerFormSchema';

const Step5Reference = ({ onNext, onBack, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step5Reference),
    defaultValues: {
      referenceName: initialData?.referenceName || '',
      referenceWhatsapp: initialData?.referenceWhatsapp || '',
      referenceOrigin: initialData?.referenceOrigin || '',
    },
  });

  const referenceOriginValue = useWatch({
    control,
    name: 'referenceOrigin',
  });

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
      {/* REFERENCE NAME  */}
      <InputText
        label="Nama lengkap referensi"
        description="Seseorang yang megenalkan SIMAK kepada Anda"
        required={true}
        error={errors.referenceName?.message}
        {...register('referenceName')}
      />

      {/* REFERENCE NUMBER */}
      <InputText
        label="Nomor Whatsapp"
        required={true}
        error={errors.referenceWhatsapp?.message}
        {...register('referenceWhatsapp')}
      />

      <InputRadio
        label="Asal Referensi"
        required={true}
        hasOtherOption={true}
        options={RegistrationForm.referenceOriginOptions}
        error={errors.referenceOrigin?.message}
        value={referenceOriginValue}
        {...register('referenceOrigin')}
      />

      {/* BUTTON */}
      <div className="flex justify-between items-center gap-4 w-80">
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

export default Step5Reference;
