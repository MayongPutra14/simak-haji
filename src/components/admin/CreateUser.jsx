import InputText from '../ui/inputs/InputText';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as CreateUserSchema from '../../utils/admin/createUserSchema';
import { Button } from '../ui/global/Button';
import InputRadio from '../ui/inputs/InputRadio';
import InputSelect from '../ui/inputs/InputSelect';
import InputDate from '../ui/inputs/InputDate';
import InputImage from '../ui/inputs/InputImage';

const CreateUser = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateUserSchema.createUserSchema),
  });

  const handleOnSubmit = () => {};

  const genderValue = useWatch({
    control,
    name: 'gender',
  });

  return (
    <div className="w-[95%] md:w-[98%]  p-6 mx-auto mt-5 bg-white border shadow-sm md:p-8 rounded-xl border-slate-200">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        Registrasi Akun Baru
      </h1>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* SECTION 1: PERSONAL IDENTITY */}
        <section className="space-y-4">
          <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
            DATA PRIBADI
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* POSRSI NUMBER */}
            <InputText
              label="Nomor Porsi"
              placeholder="1000623881"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* FULL NAME */}
            <InputText
              label="Nama Lengkap"
              required={true}
              placeholder="Budi Erlambang"
              error={errors.fatherName?.message}
              {...register('fullName')}
            />

            {/* FATHER NAME */}
            <InputText
              label="Nama Ayah Kandung"
              placeholder="Erlambang Poetra Ningrat"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* GENDER */}
            <InputRadio
              label="Jenis Kelamin"
              required={true}
              direction="horizontal"
              options={CreateUserSchema.gender}
              error={errors.gender?.message}
              value={genderValue}
              {...register('gender')}
            />

            {/* BIRTHDAY */}
            <InputDate
              label="Tanggal Lahir"
              required={true}
              error={errors.birthDate?.message}
              {...register('birthDate')}
            />

            {/* AGE */}
            <InputText
              label="Usia"
              placeholder="60"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* PHONE NUMBER/WA */}
            <InputText
              label="Nomor Telfon Aktif"
              placeholder="08947578852"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* EDUCATION */}
            <InputSelect
              label="Pendidikan"
              placeholder="-- Pilih Pendikan --"
              options={CreateUserSchema.educationOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* JOB */}
            <InputText
              label="Pekerjaan"
              placeholder="Petani"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* ADDRESS */}
            <InputText
              label="Alamat"
              placeholder="Perum Zamrud RT 01 RW 03"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* VILLAGE */}
            <InputText
              label="Desa"
              placeholder="Cikampek Utara"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* IMAGE PROFILE */}
            <InputImage
              label="Foto Profil"
              required={true}
              error={errors.profileImage?.message}
              {...register('avatar')}
            />
          </div>
        </section>

        {/* SECTION 2: HAJJ DATA */}
        <section className="space-y-4">
          <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
            DATA HAJI
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* PORTION POSITION */}
            <InputText
              label="Posisi Porsi"
              placeholder="Cikampek Utara"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* STATUS PORTION */}
            <InputSelect
              label="Status Porsi"
              placeholder="-- Pilih Status Porsi --"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* BACKUP PORTION POSITION */}
            <InputText
              label="Porsi Cadangan"
              placeholder="Cikampek Utara"
              required={true}
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* BACKUP STATUS PORTION */}
            <InputSelect
              label="Status Cadangan"
              placeholder="-- Pilih Status Porsi --"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* ZONA */}
            <InputText
              label="Zona Jamaah"
              placeholder="A"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* DEAPATURE PROGRAM */}
            <InputText
              label="Program Keberangkatan"
              placeholder="Reguler"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* MAHRAM NAME */}
            <InputText
              label="Nama Mahram"
              placeholder="Siti Fatimah"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* MAHRAM NAME */}
            <InputText
              label="Hubungan Mahram"
              placeholder="Istri"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* REFERENCE NAME */}
            <InputText
              label="Nama Referensi"
              placeholder="Abdul Ghani"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* REFERENCE NAME */}
            <InputText
              label="Asal Refereni"
              placeholder="Angota SIMAK 2022"
              options={CreateUserSchema.statusPortionOptions}
              error={errors.education?.message}
              {...register('education')}
            />
          </div>
        </section>

        {/* SEKSI 3: CONTROL PROCESS HAJJ */}
        <section className="space-y-4">
          <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
            Kontrol Proses Haji
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* GFORM */}
            <InputSelect
              label="Google Form"
              required={true}
              placeholder="-- Pilih Status --"
              options={CreateUserSchema.statusControlProcessOptions}
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* PHOTO */}
            <InputSelect
              label="Foto"
              required={true}
              placeholder="-- Pilih Status --"
              options={CreateUserSchema.statusControlProcessOptions}
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* SPPH */}
            <InputSelect
              label="SPPH"
              required={true}
              placeholder="-- Pilih Status --"
              options={CreateUserSchema.statusControlProcessOptions}
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* PASSWORD*/}
            <InputText
              label="Passport"
              required={true}
              placeholder="X1234567"
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* VISA */}
            <InputText
              label="Visa"
              required={true}
              placeholder="TI8765432"
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />
          </div>
        </section>

        {/* SECTION 4: REGISTRATION & PLACEMENT */}
        <section className="space-y-4">
          <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
            REGISTRASI & PENEMPATAN
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* REGISTRATION NUMBER */}
            <InputText
              label="Nomor Registrasi"
              required={true}
              placeholder="D154"
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* PLOT */}
            <InputText
              label="Nomor PLOT"
              required={true}
              placeholder="D15"
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* KLOTER */}
            <InputText
              label="Kloter"
              required={true}
              placeholder="JKS 16"
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* GROUP */}
            <InputText
              label="Rombongan"
              required={true}
              placeholder="11"
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* Team */}
            <InputText
              label="Regu"
              required={true}
              placeholder="40"
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />
          </div>
        </section>

        {/* SECTION 5: HEALTH & SKILL */}
        <section className="space-y-4">
          <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
            KESEHATAN & KONTRIBUSI
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputText label="Nomor Porsi" placeholder="" readOnly={true} />
            <InputText label="Password" type="password" placeholder="✱✱✱✱✱✱" />
          </div>
        </section>

        {/* SECTION 6: ACCOUNT */}
        <section className="space-y-4">
          <div className="bg-red-50 text-red-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
            AKUN JAMAAH
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputText label="Nomor Porsi" placeholder="" readOnly={true} />
            <InputText label="Password" type="password" placeholder="✱✱✱✱✱✱" />
          </div>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit" variant="secondary" isLoading={isSubmitting}>
            Kembali
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Input Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
