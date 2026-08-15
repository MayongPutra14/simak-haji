import { GuidelineForm } from './GiudelineForm';

const HeaderGuideline = () => {
  return (
    <div className="flex flex-col gap-4 mb-4 mx-auto w-[92%] max-w-4xl">
      {/* Header Banner */}
      <div className="bg-sea-green-700 text-white p-6 rounded-2xl shadow-md border-t-8 border-sea-green-900">
        <h1 className="text-2xl font-bold">
          Form Pendaftaran Jamaah SIMAK 2027
        </h1>
        <p className="text-sm mt-1">
          Lengkapi seluruh formulir pendaftaran di bawah ini secara benar.
        </p>
      </div>
      {/* Container Guideline / Petunjuk */}
      <div>
        <GuidelineForm />
      </div>
    </div>
  );
};

export default HeaderGuideline;
