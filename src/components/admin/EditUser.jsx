import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as UpdateUserSchema from '../../utils/admin/createUserSchema';
import { MdCameraAlt as IconCamera } from 'react-icons/md';
import Button from '../ui/global/Button';
import {
  InputText,
  InputNumber,
  InputSelect,
  InputDate,
} from '../ui/inputs/index';

export const EditUser = ({ initialData, onSave, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: initialData
      ? {
        ...initialData,
        health: Array.isArray(initialData.health)
          ? initialData.health.join(', ')
          : initialData.health || '',
        expertise: Array.isArray(initialData.expertise)
          ? initialData.expertise.join(', ')
          : initialData.expertise || '',
        contribution: Array.isArray(initialData.contribution)
          ? initialData.contribution.join(', ')
          : initialData.contribution || '',
        profileImage: '',
      }
      : undefined,
  });

  const [_previewImage, setPreviewImage] = useState('');
  const [rawImageFile, setRawImageFile] = useState(null);

  //  Handler for profile image
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRawImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Submit Handler
  const onSubmitForm = (data) => {
    const formattedPayload = {
      ...data,
      health:
        typeof data.health === 'string'
          ? data.health
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
          : data.health,
      expertise:
        typeof data.expertise === 'string'
          ? data.expertise
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
          : data.expertise,
      contribution:
        typeof data.contribution === 'string'
          ? data.contribution
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
          : data.contribution,
    };

    if (onSave) {
      onSave(formattedPayload, rawImageFile);
    }
  };

  const { onChange: onProfileImageChange, ...profileImageRegister } =
    register('profileImage');
  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="w-[95%] md:w-[98%] mx-auto py-4 space-y-6 font-sans"
    >
      {/* 1. TOP ACTION CONTROL BAR */}
      <div className="sticky z-30 flex px-5 py-4 border border-teal-100 shadow-md top-22 bg-white/90 backdrop-blur-md rounded-2xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* BUTTON BACK */}
          <Button
            type="button"
            fontColor="text-slate-600"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold transition-colors border cursor-pointer rounded-xl bg-slate-100 hover:bg-slate-200 border-slate-300"
          >
            kembali
          </Button>

          {/* BUTTON SAVE */}
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="px-5 py-2 text-xs font-semibold transition-colors shadow-sm cursor-pointer bg-sea-green-700 rounded-xl hover:bg-sea-green-900"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {/* 2. MAIN PROFILE CARD (Hero Bento Box dengan Avatar Upload) */}
      <div className="relative flex flex-col items-center gap-6 p-6 overflow-hidden text-white border shadow-xl bg-linear-to-r from-sea-green-900 via-sea-green-800 to-emerald-900 rounded-3xl lg:p-8 border-sea-green-700 md:flex-row">
        {/* Profile Image & Avatar Upload Overlay */}
        <div className="relative group">
          <img
            src={
              initialData?.PhotoUrl ||
              'https://i.pinimg.com/736x/11/46/dc/1146dc1a7b950533b67192e623c339ce.jpg'
            }
            alt="Profile Preview"
            className="object-cover border-4 shadow-md w-28 h-28 lg:w-32 lg:h-32 rounded-2xl border-teal-400/30"
          />
          <label
            htmlFor="profileImageInput"
            className="absolute inset-0 flex flex-col items-center justify-center text-xs font-medium transition-opacity opacity-0 cursor-pointer bg-black/50 rounded-2xl group-hover:opacity-100"
          >
            <IconCamera className="w-5 h-5" />
            Ganti Foto
          </label>

          <input
            type="file"
            id="profileImageInput"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            {...profileImageRegister}
            onChange={(e) => {
              onProfileImageChange(e); // Panggil register onChange dari RHF
              handleAvatarChange(e); // Panggil handler pratinjau gambar kustom
            }}
          />
        </div>

        {/* Hero Card Inputs: name & Main Portion */}
        <div className="flex-1 w-full space-y-3">
          <div>
            <InputText
              label="Nama Lengkap Jamaah"
              isLabelGreen={true}
              variant="green"
              placeholder="Masukkan nama lengkap..."
              error={errors.fullName?.message}
              {...register('fullName')}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <InputText
                label="Nomor Porsi Utama"
                isLabelGreen={true}
                variant="green"
                placeholder="1000243321"
                error={errors.potionNumber?.message}
                {...register('portionNumber')}
              />
            </div>
            <div>
              <InputText
                label="Status Porsi Utama"
                isLabelGreen={true}
                variant="green"
                placeholder="2026"
                error={errors.currPorsionPosition?.message}
                {...register('currPorsionPosition')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. BENTO FORM GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Personal Information Card */}
        <div className="p-6 bg-white border shadow-sm border-sea-green-100 rounded-3xl lg:col-span-2">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-900">
              Personal Information
            </h2>
          </div>
          <div className="grid grid-cols-1 space-y-3 sm:grid-cols-2 gap-x-4">
            {/* GENDER */}
            <InputSelect
              label="Jenis Kelamin"
              isLabelFade={true}
              placeholder="-- Pilih gender --"
              variant="editProfile"
              options={UpdateUserSchema.gender}
              error={errors.gender?.message}
              {...register('gender')}
            />

            {/* BIRTH PLACE */}
            <InputSelect
              label="Tempat/Kota Kelahiran"
              isLabelFade={true}
              placeholder="-- Pilih Kota --"
              variant="editProfile"
              options={UpdateUserSchema.cityOptions}
              error={errors.birthPlace?.message}
              {...register('birthPlace')}
            />

            {/* BIRTH DATE */}
            <InputDate
              label="Tanggal Lahir"
              isLabelFade={true}
              variant="editProfile"
              required={true}
              error={errors.birthDate?.message}
              {...register('birthDate')}
            />

            {/* JOB */}
            <InputText
              label="Pekerjaan"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Human Resource"
              error={errors.job?.message}
              {...register('job')}
            />

            {/* EDUCATION */}
            <InputSelect
              label="Pendidikan"
              isLabelFade={true}
              placeholder="-- Pilih Pendidikan --"
              variant="editProfile"
              options={UpdateUserSchema.educationOptions}
              error={errors.education?.message}
              {...register('education')}
            />

            {/* KECAMATAN */}
            <InputText
              label="Kecamatan"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Kotabaru"
              error={errors.subDistrict?.message}
              {...register('subDistrict')}
            />

            {/* Village */}
            <InputText
              label="Desa"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Cikampek Utara"
              error={errors.village?.message}
              {...register('village')}
            />

            {/* ADDRESS */}
            <InputText
              label="Alamat"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Perum Nusantara RT 05 RW 10"
              error={errors.address?.message}
              {...register('address')}
            />
          </div>
        </div>

        {/* Portion & Grouping Info Card */}
        <div className="p-6 bg-white border shadow-sm rounded-3xl border-sea-green-100 lg:col-span-2">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-950">
              Portion & Grouping Info
            </h2>
          </div>
          <div className="grid grid-cols-1 space-y-3 sm:grid-cols-3 gap-x-3">
            {/* STATUS PORTION BACK UP */}
            <InputNumber
              label="Nomor Porsi Cadangan"
              isLabelFade={true}
              variant="editProfile"
              placeholder="33457"
              error={errors.currPorsionPositionBackup?.message}
              {...register('currPorsionPositionBackup')}
            />

            {/* STATUS PORTION BACK UP */}
            <InputText
              label="Status Porsi Cadangan"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Cadangan 1"
              error={errors.currPorstionStatusBackup?.message}
              {...register('currPorstionStatusBackup')}
            />

            {/* ZONE */}
            <InputSelect
              label="Zona"
              isLabelFade={true}
              variant="editProfile"
              placeholder=""
              options={UpdateUserSchema.zonaOptions}
              error={errors.zone?.message}
              {...register('zone')}
            />

            {/* STATUS PORTION BACK UP */}
            <InputText
              label="Nomor PLOT"
              isLabelFade={true}
              variant="editProfile"
              placeholder="D15"
              error={errors.plotNumber?.message}
              {...register('plotNumber')}
            />

            {/* BACTH */}
            <InputText
              label="Kloter"
              isLabelFade={true}
              variant="editProfile"
              placeholder="JKS 16"
              error={errors.batch?.message}
              {...register('batch')}
            />

            {/* GROUP */}
            <InputText
              label="Rombongan"
              isLabelFade={true}
              variant="editProfile"
              placeholder="11"
              error={errors.group?.message}
              {...register('group')}
            />

            {/* TEAM */}
            <InputText
              label="Regu"
              isLabelFade={true}
              variant="editProfile"
              placeholder="43"
              error={errors.team?.message}
              {...register('team')}
            />
          </div>
        </div>

        {/* Document & Verification Status Card */}
        <div className="p-6 bg-white border shadow-sm rounded-3xl border-sea-green-100 lg:col-span-2">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-950">
              Document & Verification Status
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {/* GOOGLE FORM */}
            <InputSelect
              label="Google Form"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.googleFormStatus?.message}
              {...register('googleFormStatus')}
            />

            {/* PHOTO */}
            <InputSelect
              label="Foto"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.photoStatus?.message}
              {...register('photoStatus')}
            />

            {/* SPPH */}
            <InputSelect
              label="SPPH"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.spphStatus?.message}
              {...register('spphStatus')}
            />

            {/* MUTATION */}
            <InputSelect
              label="Mutasi"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.mutationStatus?.message}
              {...register('mutationStatus')}
            />

            {/* BIOMETRIC */}
            <InputSelect
              label="Biometrik"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.biometricStatus?.message}
              {...register('biometricStatus')}
            />

            {/* PUSKESMAS */}
            <InputSelect
              label="Puskesmas"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.puskesmasStatus?.message}
              {...register('puskesmasStatus')}
            />

            {/* MCU */}
            <InputSelect
              label="MCU"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.mcuStatus?.message}
              {...register('mcuStatus')}
            />

            {/* PAYMENT */}
            <InputSelect
              label="Pelunasan"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.paymentStatus?.message}
              {...register('paymentStatus')}
            />

            {/* PASSPORT */}
            <InputSelect
              label="Passport"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.passport?.message}
              {...register('passport')}
            />

            {/* VISA */}
            <InputSelect
              label="Visa"
              isLabelFade={true}
              variant="status"
              placeholder=""
              withCard={true}
              options={UpdateUserSchema.statusControlProcessOptions}
              error={errors.visa?.message}
              {...register('visa')}
            />
          </div>
        </div>

        {/* Companion & Relations Card */}
        <div className="p-6 bg-white border shadow-sm rounded-3xl border-sea-green-100 lg:col-span-1">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-900">
              Companion & Relations
            </h2>
          </div>
          <div className="space-y-3 ">
            {/* FATHER NAME */}
            <InputText
              label="Nama Ayah Kandung"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Soetomo Poetra"
              error={errors.fatherName?.message}
              {...register('fatherName')}
            />

            {/* COMPANION */}
            <InputText
              label="Pendamping"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Orang Tua"
              error={errors.companion?.message}
              {...register('companion')}
            />

            {/* MAHRAM NAME */}
            <InputText
              label="Nama Pedamping"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Fatimah Azzahra"
              error={errors.mahramName?.message}
              {...register('mahramName')}
            />

            {/* REFERENCE NAME */}
            <InputText
              label="Nama Referensi"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Agung Gunawan"
              error={errors.referenceName?.message}
              {...register('referenceName')}
            />

            {/* REFERENCE PHONE */}
            <InputNumber
              label="Nomor Whatsapp Referensi"
              isLabelFade={true}
              variant="editProfile"
              placeholder="089781307751"
              error={errors.referencePhone?.message}
              {...register('referencePhone')}
            />

            {/* REFERENCE NAME */}
            <InputText
              label="Asal Referensi"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Simak 2024"
              error={errors.referenceOrigin?.message}
              {...register('referenceOrigin')}
            />
          </div>
        </div>

        {/* Experience & Health Record Card */}
        <div className="p-6 bg-white border shadow-sm border-sea-green-100 rounded-3xl lg:col-span-1">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-teal-950">
              Experience & Health
            </h2>
          </div>
          <div className="space-y-3 ">
            {/* DEAPATURE PROGRAM */}
            <InputText
              label="Program Keberangkatan"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Reguler"
              error={errors.depature?.message}
              {...register('depature')}
            />

            {/* EXPERIENCE */}
            <InputSelect
              label="Pengalaman"
              isLabelFade={true}
              variant="editProfile"
              placeholder=""
              options={UpdateUserSchema.statusHajiUmrahOptions}
              error={errors.experience?.message}
              {...register('experience')}
            />

            {/* HEALTH */}
            <InputText
              label="Kesehatan & kebutuhan khusus"
              description="pisahkan dengan tanda koma(,)"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Lansia, Diabetes, Jantung"
              error={errors.health?.message}
              {...register('health')}
            />

            {/* EXPERTISE */}
            <InputText
              label="Keahlian"
              description="pisahkan dengan tanda koma(,)"
              isLabelFade={true}
              variant="editProfile"
              placeholder="MS Office, Bahasa inggris"
              error={errors.expertise?.message}
              {...register('expertise')}
            />

            {/* CONTRIBUTION */}
            <InputText
              label="Kontribusi"
              description="pisahkan dengan tanda koma(,)"
              isLabelFade={true}
              variant="editProfile"
              placeholder="Khutbah, Dzikir, Presentasi"
              error={errors.contribution?.message}
              {...register('contribution')}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditUser;
