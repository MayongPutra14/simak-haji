import { useFormContext } from 'react-hook-form';
import InputText from '../../ui/inputs/InputText';

export default function Section4HealthSkill() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-md md:text-xl">
        KEAHLIAN & KESEHATAN
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* EXPERTISE */}
        <InputText
          label="Kemampuan yang dikuasai"
          description="Pisahkan dengan tanda koma (,) jika ada lebih dari satu keahlian."
          placeholder="MS Office, Manajemen, Bahasa Inggris"
          required={true}
          error={errors.expertise?.message}
          {...register('expertise')}
        />

        {/* CONTRIBUTION */}
        <InputText
          label="Hal Positif Yang Dapat Dikontribusikan Kepada SIMAK"
          placeholder="Khutbah, Leadership, Dzikir"
          description="Pisahkan dengan tanda koma (,) jika ada lebih dari satu hal positif yang bisa dikontibusikan."
          required={true}
          error={errors.contribution?.message}
          {...register('contribution')}
        />

        {/* HEALTH */}
        <InputText
          label="Kesehatan & Kebutuhan Khusus"
          description="Pisahkan dengan tanda koma (,) jika ada lebih dari satu kebutuhan khusus. Data ini diperlukan untuk kami folow up"
          placeholder="Diabetes, Jantung, Lansia"
          required={true}
          error={errors.health?.message}
          {...register('health')}
        />
      </div>
    </section>
  );
}
