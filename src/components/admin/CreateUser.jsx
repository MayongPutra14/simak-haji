import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../ui/global/Button';
import {
  Section1Account,
  Section2PersonalData,
  Section3Background,
  Section4HealthSkill,
  Section5Reference,
  Section6HajjData,
  Section7ControlProcess,
  Section8Placement,
} from './components/index';

import {
  step1Schema,
  step2Schema,
  step3Schema,
} from '../../utils/admin/createUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const CreateUser = ({
  currentStep,
  createdUserId,
  isLoading,
  onStep1Submit,
  onStep2Submit,
  onStep3Submit,
}) => {
  const navigate = useNavigate();

  const currentSchema = useMemo(() => {
    if (currentStep === 1) return step1Schema;
    if (currentStep === 2) return step2Schema;
    if (currentStep === 3) return step3Schema;
    return step1Schema;
  }, [currentStep]);

  const methods = useForm({
    resolver: zodResolver(currentSchema),
    shouldFocusError: true,
    defaultValues: {
      porsionNumber: '',
      password: '',
      confirmPassword: '',
      fatherName: '',
      birthDate: '',
      gender: '',
      birthPlace: '',
      address: '',
      subDistrict: '',
      village: '',
      profileImage: '',
      job: '',
      education: '',
      depature: '',
      experience: '',
      companion: '',
      mahramName: '',
      expertise: [],
      contribution: [],
      health: [],
      referenceName: '',
      referencePhone: '',
      referenceOrigin: '',
      currPorsionPosition: '',
      currPorstionStatus: '',
      currPorsionPositionBackup: '',
      currPorstionStatusBackup: '',
      zone: '',
      googleFormStatus: '',
      photoStatus: '',
      spphStatus: '',
      mutationStatus: '',
      biometricStatus: '',
      puskesmasStatus: '',
      mcuStatus: '',
      paymentStatus: '',
      passport: '',
      visa: '',
      plotNumber: '',
      batch: '',
      group: '',
      team: '',
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  // HANDLE FORM SUBMIT ACCORDING TO CURRENT ACTIVE STEP
  const handleFormSubmit = (data) => {
    if (currentStep === 1) {
      onStep1Submit(data);
    } else if (currentStep === 2) {
      onStep2Submit(data);
    } else if (currentStep === 3) {
      onStep3Submit(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-[95%] md:w-[98%]  p-6 mx-auto mt-5 bg-white border shadow-sm md:p-8 rounded-xl border-slate-200">
        {/* STEPPER STEP INDICATOR UI */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
          <div
            className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-sea-green-600 font-bold' : 'text-slate-400'}`}
          >
            <span
              className={`text-xs md:text-md flex items-center justify-center w-6 h-5 md:w-8 md:h-8 rounded-full ${currentStep >= 1 ? 'bg-sea-green-100 text-sea-green-700' : 'bg-slate-100'}`}
            >
              1
            </span>
            <span className="text-xs">Akun Dasar</span>
          </div>
          <div
            className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-sea-green-600 font-bold' : 'text-slate-400'}`}
          >
            <span
              className={`text-xs md:text-md flex items-center justify-center w-6 h-5 md:w-8 md:h-8 rounded-full ${currentStep >= 2 ? 'bg-sea-green-100 text-sea-green-700' : 'bg-slate-100'}`}
            >
              2
            </span>
            <span className="text-xs">Profil Biodata</span>
          </div>
          <div
            className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-sea-green-600 font-bold' : 'text-slate-400'}`}
          >
            <span
              className={`text-xs md:text-md flex items-center justify-center w-6 h-5 md:w-8 md:h-8 rounded-full ${currentStep >= 3 ? 'bg-sea-green-100 text-sea-green-700' : 'bg-slate-100'}`}
            >
              3
            </span>
            <span className="text-xs">Dokumen Keberangkatan</span>
          </div>
        </div>

        {/* INFORMATIONAL BANNER FOR STEP 2 AND STEP 3 */}
        {createdUserId && (
          <div className="p-3 mb-6 text-sm font-medium rounded-md bg-sea-green-50 text-sea-green-800 border border-sea-green-200">
            Mengedit Data untuk ID Jamaah:{' '}
            <span className="font-bold">{createdUserId}</span>
          </div>
        )}

        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          {/* STEP 1: RENDER SECTION 1 ONLY */}
          {currentStep === 1 && <Section1Account />}

          {/* STEP 2: RENDER SECTION 2 TO 5 */}
          {currentStep === 2 && (
            <>
              <Section2PersonalData />
              <Section3Background />
              <Section4HealthSkill />
              <Section5Reference />
            </>
          )}

          {/* STEP 3: RENDER SECTION 6 TO 8 */}
          {currentStep === 3 && (
            <>
              <Section6HajjData />
              <Section7ControlProcess />
              <Section8Placement />
            </>
          )}

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="kembali"
              variant="primary"
              onClick={handleBack}
              disabled={isLoading}
            >
              Kembali
            </Button>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Input Data
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateUser;
