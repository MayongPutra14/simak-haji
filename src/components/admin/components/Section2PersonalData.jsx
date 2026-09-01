import InputText from '../../ui/inputs/InputText';
import InputSelect from '../../ui/inputs/InputSelect';
import InputDate from '../../ui/inputs/InputDate';
import InputRadio from '../../ui/inputs/InputRadio';
import InputImage from '../../ui/inputs/InputImage';
import { useFormContext, useWatch, Controller } from 'react-hook-form';
import * as CreateUserSchema from '../../../utils/admin/createUserSchema';

export default function Section2PersonalData() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const genderValue = useWatch({
    control,
    name: 'gender',
  });

  return (
    <section className="space-y-4">
      <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        DATA DIRI JAMAAH
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* FATHER NAME */}
        <InputText
          label="Nama Ayah Kandung"
          placeholder="Budi Purwanto"
          required={true}
          error={errors.fatherName?.message}
          {...register('fatherName')}
        />

        {/* BIRTH DATE */}
        <InputDate
          label="Tanggal Lahir"
          description="Tanggal lahir Anda sesuai KTP"
          required={true}
          error={errors.birthDate?.message}
          {...register('birthDate')}
        />

        {/* GENDER */}
        <InputRadio
          label="Jenis Kelamin"
          required={true}
          options={CreateUserSchema.gender}
          error={errors.gender?.message}
          value={genderValue}
          {...register('gender')}
        />

        {/* BIRTH CITY */}
        <InputSelect
          label="Tempat/Kota Kelahiran"
          placeholder="-- Pilih Kota --"
          options={CreateUserSchema.cityOptions}
          error={errors.birthPlace?.message}
          {...register('birthPlace')}
        />

        {/* ADDRESS */}
        <InputText
          label="Alamat (Sesuai SPPH)"
          description="Isi dengan nama jalan hingga RT dan RW saja"
          placeholder="Perum Permata Zamrud RT 01 RW 02"
          required={true}
          error={errors.address?.message}
          {...register('address')}
        />

        {/* KECAMATAN */}
        <InputSelect
          label="Kecamatan"
          required={true}
          placeholder="-- Pilih Kecamatan --"
          options={CreateUserSchema.districtOptions}
          error={errors.subDistrict?.message}
          {...register('subDistrict')}
        />

        {/* VILLAGE */}
        <InputText
          label="Desa / Kelurahan"
          placeholder="Cikampek Barat"
          required={true}
          error={errors.village?.message}
          {...register('village')}
        />

        {/* PROFILE PICTURE */}
        <Controller
          name="profileImage"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <InputImage
              ref={ref}
              label="Foto Profile"
              description="Silakan unggah foto Jamaah. Pastikan foto sopan dan ukuran file maksimal 1 MB."
              required={true}
              value={value}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file || null);
                }
              }}
              error={errors.profileImage?.message}
            />
          )}
        />
      </div>
    </section>
  );
}
