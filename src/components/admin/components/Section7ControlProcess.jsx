import { useFormContext } from 'react-hook-form';
import InputText from '../../ui/inputs/InputText';
import InputSelect from '../../ui/inputs/InputSelect';
import * as CreateUserSchema from '../../../utils/admin/createUserSchema';

export default function Section7ControlProcess() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="space-y-4">
      <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        KONTROL PROSES HAJI
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* GFORM */}
        <InputSelect
          label="Google Form"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.googleFormStatus?.message}
          {...register('googleFormStatus')}
        />

        {/* PHOTO */}
        <InputSelect
          label="Foto"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.photoStatus?.message}
          {...register('photoStatus')}
        />

        {/* SPPH */}
        <InputSelect
          label="SPPH"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.spphStatus?.message}
          {...register('spphStatus')}
        />

        {/* MUTASI */}
        <InputSelect
          label="Mutasi"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.mutationStatus?.message}
          {...register('mutationStatus')}
        />

        {/* BIOMETRIC */}
        <InputSelect
          label="Biometrik"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.biometricStatus?.message}
          {...register('biometricStatus')}
        />

        {/* PUSKESMAS */}
        <InputSelect
          label="Puskesmas"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.puskesmasStatus?.message}
          {...register('puskesmasStatus')}
        />

        {/* MEDICAL CHECK-UP */}
        <InputSelect
          label="Medical Check-Up"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.mcuStatus?.message}
          {...register('mcuStatus')}
        />

        {/* PAYMENT */}
        <InputSelect
          label="Pelunasan"
          placeholder="-- Pilih Status --"
          options={CreateUserSchema.statusControlProcessOptions}
          error={errors.paymentStatus?.message}
          {...register('paymentStatus')}
        />

        {/* PASSWORD*/}
        <InputText
          label="Passport"
          placeholder="X1234567"
          error={errors.passport?.message}
          {...register('passport')}
        />

        {/* VISA */}
        <InputText
          label="Visa"
          placeholder="TI8765432"
          error={errors.visa?.message}
          {...register('visa')}
        />
      </div>
    </section>
  );
}
