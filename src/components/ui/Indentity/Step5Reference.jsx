import { useForm, useWatch } from 'react-hook-form';
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step5Reference),
    defaultValues: {
      referenceName: initialData?.referenceName || '',
      referenceWhatsapp: initialData?.referenceWhatsapp || '',
      referenceOrigin: initialData?.referenceOrigin || '',
      profileImage: initialData?.profileImage || '',
    },
  });

  const referenceOriginValue = useWatch({
    control,
    name: 'referenceOrigin',
  });

  const profileImageValue = useWatch({
    control,
    name: 'profileImage',
  });

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // IN YOUR FORM COMPONENT:
  const handleProfileImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);

      // SAVE TO REACT HOOK FORM
      setValue('profileImage', base64, { shouldValidate: true });
    }
  };

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

      <InputImage
        label="Foto Profile"
        description="Silakan unggah foto Anda. Pastikan foto sopan dan ukuran file maksimal 1 MB."
        required={true}
        variant="underlined"
        withCard={true}
        value={profileImageValue}
        onChange={handleProfileImageChange} // LOCALSTORAGE SAVE ONCHANGE
        error={errors.profileImage?.message}
      />

      {/* BUTTON */}
      <div className="flex items-center justify-between gap-4 w-80">
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
