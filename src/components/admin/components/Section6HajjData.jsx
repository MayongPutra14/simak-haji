import { useFormContext } from 'react-hook-form';
import InputNumber from '../../ui/inputs/InputNumber';
import InputSelect from '../../ui/inputs/InputSelect';
import * as CreateUserSchema from '../../../utils/admin/createUserSchema';

export default function Section6HajjData() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        STATUS NOMOR PORSI
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* PORTION POSITION(current position) */}
        <InputNumber
          label="Posisi Porsi Saat Ini"
          placeholder="2051"
          maxLength={10}
          error={errors.currPorsionPosition?.message}
          {...register('.currPorsionPosition')}
        />

        {/* STATUS PORTION */}
        <InputSelect
          label="Status Porsi Saat Ini"
          placeholder="-- Pilih Status Porsi --"
          options={CreateUserSchema.statusPortionOptions}
          error={errors.currPorstionStatus?.message}
          {...register('.currPorstionStatus')}
        />

        {/* BACKUP PORTION POSITION */}
        <InputNumber
          label="Porsi Cadangan"
          placeholder="33457"
          maxLength={10}
          error={errors.currPorsionPositionBackup?.message}
          {...register('.currPorsionPositionBackup')}
        />

        {/* BACKUP STATUS PORTION */}
        <InputSelect
          label="Status Porsi Cadangan"
          placeholder="-- Pilih Status Porsi --"
          options={CreateUserSchema.statusPortionOptions}
          error={errors.currPorstionStatusBackup?.message}
          {...register('currPorstionStatusBackup')}
        />

        {/* ZONA */}
        <InputSelect
          label="Zona Jamaah"
          placeholder="-- Pilih Zona --"
          options={CreateUserSchema.zonaOptions}
          error={errors.zone?.message}
          {...register('zone')}
        />
      </div>
    </section>
  );
}
