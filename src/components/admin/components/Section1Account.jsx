import InputText from '../../ui/inputs/InputText';
import InputNumber from '../../ui/inputs/InputNumber';
import { useFormContext } from 'react-hook-form';

export default function Section1Account() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <section className="space-y-4">
      <h2 className="bg-red-50 text-red-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        AKUN JAMAAH
      </h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* USER NAME */}
        <InputText
          label="Nama Lengkap"
          placeholder="Budi Susanto"
          required={true}
          error={errors.nama_lengkap?.message}
          {...register('nama_lengkap')}
        />

        {/* POSRSI NUMBER */}
        <InputNumber
          label="Nomor Porsi"
          placeholder="1000623881"
          required={true}
          maxLength={13}
          error={errors.nomor_porsi?.message}
          {...register('nomor_porsi')}
        />

        {/* WHATSAPP NUMBER */}
        <InputNumber
          label="Nomor Whatsapp"
          placeholder="1000623881"
          required={true}
          maxLength={13}
          error={errors.whatsapp?.message}
          {...register('whatsapp')}
        />

        {/* PASSWORD */}
        <InputText
          label="Password"
          placeholder="✱✱✱✱✱✱"
          required={true}
          error={errors.password?.message}
          {...register('password')}
        />

        {/* CONFIRM PASSWORD */}
      </div>
    </section>
  );
}
