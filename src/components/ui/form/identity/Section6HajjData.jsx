import { useFormContext } from 'react-hook-form';
import InputNumber from '../../../ui/inputs/InputNumber';
import InputSelect from '../../../ui/inputs/InputSelect';
import * as CreateUserSchema from '../../../../utils/schemas/createUserSchema';
import { useEffect } from 'react';
import { IconLock } from '../../../../utils/helpers/decorations';

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
          <div className="w-full">
            <label className="text-xs font-semibold text-slate-400">
              Zona Jamaah
            </label>
            <div className="w-full">
              <input
                type="text"
                value={zone || ''}
                readOnly
                disabled
                className="w-full pl-3 pr-9 py-2 text-sm font-medium text-slate-500 bg-slate-100/70 border border-slate-200/70 rounded-xl opacity-75 cursor-not-allowed select-none placeholder:text-slate-400/70 placeholder:text-xs"
                {...register('zone')}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <IconLock className="w-4 h-4" />
              </div>
            </div>

            <p className="mt-1 text-xs text-red-500">
              *Zona diisi otomatis berdasarkan wilayah kepemimpinan Anda.
            </p>
          </div>
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
