import { useFormContext } from 'react-hook-form';
import InputNumber from '../../../ui/inputs/InputNumber';
import InputSelect from '../../../ui/inputs/InputSelect';
import * as CreateUserSchema from '../../../../utils/schemas/createUserSchema';
import { useEffect } from 'react';

export default function Section6HajjData({ role, zone }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isLeader = role === 'leader';

  // SET AUTOMATIC ZONE VALUE IF ROLE IS LEADER
  useEffect(() => {
    if (isLeader && zone) {
      setValue('zone', zone);
    }
  }, [isLeader, zone, setValue]);

  return (
    <section className="space-y-4">
      <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        STATUS NOMOR PORSI
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* PORTION POSITION(current position) */}
        <InputNumber
          label="Posisi Porsi Saat Ini"
          placeholder="27890"
          maxLength={10}
          error={errors.portionNumber?.message}
          {...register('portionNumber')}
        />

        {/* STATUS PORTION */}
        <InputSelect
          label="Status Porsi Saat Ini"
          placeholder="-- Pilih Tahun --"
          options={CreateUserSchema.generateYearOptions(6, 85)}
          error={errors.currPorsionStatus?.message}
          {...register('currPortionStatus')}
        />

        {/* ZONA JAMAAH */}
        {isLeader ? (
          <>
            <input
              type="text"
              value={zone || ''}
              readOnly
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
              {...register('zone')}
            />
            <p className="mt-1 text-xs text-red-500">
              *Zona diisi otomatis berdasarkan wilayah kepemimpinan Anda.
            </p>
          </>
        ) : (
          <InputSelect
            label="Zona Jamaah"
            placeholder="-- Pilih Zona --"
            options={CreateUserSchema.zonaOptions}
            error={errors.zone?.message}
            {...register('zone')}
          />
        )}
      </div>
    </section>
  );
}
