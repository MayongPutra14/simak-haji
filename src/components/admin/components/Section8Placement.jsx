import { useFormContext } from 'react-hook-form';
import InputText from '../../ui/inputs/InputText';
import InputNumber from '../../ui/inputs/InputNumber';

export default function Section8Placement() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="space-y-4">
      <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        PENEMPATAN
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* PLOT */}
        <InputText
          label="Nomor PLOT"
          placeholder="D15"
          error={errors.plotNumber?.message}
          {...register('plotNumber')}
        />

        {/* KLOTER */}
        <InputText
          label="Kloter"
          placeholder="JKS 16"
          error={errors.batch?.message}
          {...register('batch')}
        />

        {/* GROUP */}
        <InputNumber
          label="Nomor Rombongan"
          placeholder="11"
          error={errors.group?.message}
          {...register('group')}
        />

        {/* Team */}
        <InputText
          label="Nomor Regu"
          placeholder="40"
          error={errors.team?.message}
          {...register('.team')}
        />
      </div>
    </section>
  );
}
