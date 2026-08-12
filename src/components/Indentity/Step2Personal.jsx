import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RegistrationForm from '../../utils/registerFormSchema';
import { InputText } from '../ui/InputText';
import { InputDate } from '../ui/InputDate';
import { InputRadio } from '../ui/InputRadio';
import { InputSelect } from '../ui/InputSelect';
import { Button } from '../ui/Button';

const Step2Personal = ({ onNext, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationForm.Step2PersonalSchema),
    defaultValues: initialData,
  });

  const handleOnSubmit = (data) => {
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4 mx-auto"
    >
      <InputText
        label="Nama Ayah Kandung"
        required={true}
        error={errors.fatherName?.message}
        {...register('fatherName')}
      />

      <InputDate
        label="Tanggal Lahir"
        description="Tanggal lahir sesuai KTP"
        required={true}
        error={errors.birthDate?.message}
        {...register('birthDate')}
      />

      <InputRadio
        label="Jenis Kelamin"
        required={true}
        options={RegistrationForm.gender}
        error={errors.gender?.message}
        {...register('gender')}
      />

      <InputSelect
        label="Tempat / Kota Kelahiran"
        required={true}
        placeholder="-- Pilih Kota --"
        options={RegistrationForm.cityOptions}
        error={errors.birthPlace?.message}
        {...register('birthPlace')}
      />

      <InputText
        label="Alamat (Sesuai SPPH)"
        description="Isi dengan nama jalan hingga RT dan RW saja"
        required={true}
        error={errors.address?.message}
        {...register('address')}
      />

      <InputText
        label="Desa / Kelurahan"
        required={true}
        error={errors.village?.message}
        {...register('village')}
      />

      <InputText
        label="Kecamatan"
        required={true}
        error={errors.district?.message}
        {...register('district')}
      />

      {/* BUTTON */}
      <div className="flex justify-between">
        <Button type="submit" variant="primary">
          Selanjutnya
        </Button>
      </div>
    </form>
  );
};

export default Step2Personal;
