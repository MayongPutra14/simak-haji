import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RegistrationForm from '../../../utils/registerFormSchema';
import InputText from '../inputs/InputText';
import InputDate from '../inputs/InputDate';
import InputRadio from '../inputs/InputRadio';
import InputSelect from '../inputs/InputSelect';
import { Button } from '../global/Button';

const Step2Personal = ({ onNext, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step2PersonalSchema),
    defaultValues: {
      ...initialData,
      birthPlace: initialData?.birthPlace ?? '',
    },
  });

  const genderValue = useWatch({
    control,
    name: 'gender',
  });

  const handleOnSubmit = (data) => {
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4"
    >
      <InputText
        label="Nama Ayah Kandung"
        required={true}
        variant="underlined"
        withCard={true}
        error={errors.fatherName?.message}
        {...register('fatherName')}
      />

      <InputDate
        label="Tanggal Lahir"
        description="Tanggal lahir sesuai KTP"
        required={true}
        variant="underlined"
        withCard={true}
        error={errors.birthDate?.message}
        {...register('birthDate')}
      />

      <InputRadio
        label="Jenis Kelamin"
        required={true}
        options={RegistrationForm.gender}
        variant="underlined"
        withCard={true}
        error={errors.gender?.message}
        value={genderValue}
        {...register('gender')}
      />

      <InputSelect
        label="Tempat / Kota Kelahiran"
        required={true}
        placeholder="-- Pilih Kota --"
        options={RegistrationForm.cityOptions}
        variant="underlined"
        withCard={true}
        error={errors.birthPlace?.message}
        {...register('birthPlace')}
      />

      <InputText
        label="Alamat (Sesuai SPPH)"
        description="Isi dengan nama jalan hingga RT dan RW saja"
        required={true}
        variant="underlined"
        withCard={true}
        error={errors.address?.message}
        {...register('address')}
      />

      <InputText
        label="Desa / Kelurahan"
        required={true}
        variant="underlined"
        withCard={true}
        error={errors.village?.message}
        {...register('village')}
      />

      <InputText
        label="Kecamatan"
        required={true}
        variant="underlined"
        withCard={true}
        error={errors.subDistrict?.message}
        {...register('subDistrict')}
      />

      {/* BUTTON */}
      <div className="w-32">
        <Button type="submit" variant="primary">
          Selanjutnya
        </Button>
      </div>
    </form>
  );
};

export default Step2Personal;
