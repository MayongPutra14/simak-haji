import useFormDraft from '../../hooks/useFormDraf.js';
import {
  Step2Personal,
  Step3Background,
  Step4HealthSkills,
  Step5Review,
} from '../Indentity/indexFile.js';

const IdentityForm = ({ onSubmit, isSubmitting = false, userId }) => {
  const { currentStep, setCurrentStep, formData, setFormData } =
    useFormDraft(userId);

  const handleNext = (stepData) => {
    const updateData = { ...formData, ...stepData };
    setFormData(updateData);

    if (currentStep === 4) {
      if (onSubmit) onSubmit(updateData);
    } else {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = (currentStepData = {}) => {
    if (currentStep > 1) {
      setFormData((prev) => ({ ...prev, ...currentStepData }));
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-[92%] max-w-4xl mx-auto">
      {/* PROGRESS BAR */}
      <div className=" bg-white p-4 mb-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-600">
            Langkah {currentStep} dari 4
          </span>
          <span className="text-xs font-bold text-sea-green-600">
            {Math.round((currentStep / 4) * 100)}% Selesai
          </span>
        </div>

        {/* PROGRESS BAR LINE */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-sea-green-400 h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* CONDITIONAL RENDERING */}
      {currentStep === 1 && (
        <Step2Personal onNext={handleNext} initialData={formData} />
      )}
      {currentStep === 2 && (
        <Step3Background
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
        />
      )}
      {currentStep === 3 && (
        <Step4HealthSkills
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
        />
      )}
      {currentStep === 4 && (
        <Step5Review
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

export default IdentityForm;
