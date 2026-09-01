import { useFormContext } from 'react-hook-form';
import InputText from '../../ui/inputs/InputText';
import InputSelect from '../../ui/inputs/InputSelect';
import * as CreateUserSchema from '../../../utils/admin/createUserSchema';

export default function Section3Background() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        BACKGROUND JAMAAH
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* JOB */}
        <InputText
          label="Pekerjaan"
          placeholder="Petani"
          required={true}
          error={errors.job?.message}
          {...register('job')}
        />

        {/* EDUCATION */}
        <InputSelect
          label="Pendidikan Terakhir"
          placeholder="-- Pilih Pendidikan --"
          options={CreateUserSchema.educationOptions}
          error={errors.education?.message}
          {...register('education')}
        />

        {/* DEPATURE PROGRAM */}
        <InputText
          label="Program Keberangkatan"
          placeholder="Reguler"
          required={true}
          error={errors.depature?.message}
          {...register('depature')}
        />

        {/* HAJJ EXPERIENCE */}
        <InputSelect
          label="Pengalaman Haji/Umrah"
          placeholder="-- Pilih Pengalaman --"
          required={true}
          options={CreateUserSchema.statusHajiUmrahOptions}
          error={errors.experience?.message}
          {...register('experience')}
        />

        {/* DEPATURE PROGRAM */}
        <InputText
          label="Berangkat Bersama Siapa"
          placeholder="Saudara Kandung"
          required={true}
          error={errors.companion?.message}
          {...register('companion')}
        />

        {/* MAHRAM NAME */}
        <InputText
          label="Nama Lengkap Mahram"
          placeholder="Fatimah Azzahra"
          required={true}
          error={errors.mahramName?.message}
          {...register('mahramName')}
        />
      </div>
    </section>
  );
}
