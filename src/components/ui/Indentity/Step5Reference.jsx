import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../inputs/InputText';
import InputRadio from '../inputs/InputRadio';
import InputImage from '../inputs/InputImage';
import { Button } from '../global/Button';
import * as RegistrationForm from '../../../utils/registerFormSchema';

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
      profileImage: initialData?.profileImage || null,
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
        variant="underlined"
        withCard={true}
        error={errors.referenceName?.message}
        {...register('referenceName')}
      />

      {/* REFERENCE NUMBER */}
      <InputText
        label="Nomor Whatsapp"
        required={true}
        variant="underlined"
        withCard={true}
        error={errors.referenceWhatsapp?.message}
        {...register('referenceWhatsapp')}
      />

      <InputRadio
        label="Asal Referensi"
        required={true}
        hasOtherOption={true}
        options={RegistrationForm.referenceOriginOptions}
        variant="underlined"
        withCard={true}
        error={errors.referenceOrigin?.message}
        value={referenceOriginValue}
        {...register('referenceOrigin')}
      />

      <Controller
        name="profileImage"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <InputImage
            ref={ref}
            label="Foto Profile"
            description="Silakan unggah foto Anda. Pastikan foto sopan dan ukuran file maksimal 1 MB."
            required={true}
            variant="underlined"
            withCard={true}
            value={value}
            onBlur={onBlur}
            onChange={(e) => {
              const file = e?.target?.files ? e.target.files[0] : e;
              onChange(file || null);
            }}
            error={errors.profileImage}
          />
        )}
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

export default Step5Reference;
