import { useFormContext } from 'react-hook-form';
import InputText from '../../ui/inputs/InputText';
import InputNumber from '../../ui/inputs/InputNumber';

export default function Section5Reference() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        DATA REFERENSI
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* REFERENCE NAME */}
        <InputText
          label="Nama Lengkap Referensi"
          description="Seseorang yang megenalkan SIMAK kepada Anda."
          placeholder="Cecep Hidayat"
          error={errors.referenceName?.message}
          {...register('referenceName')}
        />

        {/* REFERENCE WA NUMBER */}
        <InputNumber
          label="Nomor Whatsaap"
          placeholder="089651307721"
          maxLength={13}
          error={errors.referencePhone?.message}
          {...register('referencePhone')}
        />

        {/* REFERENCE ORIGIN */}
        <InputText
          label="Asala Referensi"
          description="Isi dengan nama instansi, media sosial, atau hubungan Anda dengan pemberi referensi."
          placeholder="Media sosial"
          error={errors.referenceOrigin?.message}
          {...register('referenceOrigin')}
        />
      </div>
    </section>
  );
}
