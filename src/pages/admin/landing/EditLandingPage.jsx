import { useEffect } from 'react';
import { useParams } from 'react-router';
import Modal from '../../../components/ui/global/Modal';
import EditLandingPageFragment from '../../../fragments/admin/EditLandingPageFragment';
import { useModal } from '../../../hooks/global/useModal';
import { useEditLandingSection } from '../../../hooks/admin/landing/useEditLandingPageSection';
import { LandingPageNav } from '../../../components/ui/global/landingpage/LandingNavbar';
import { IconCheck, IconClose } from '../../../utils/helpers/decorations';
import {
  EditHeroSection,
  EditAboutSection,
  EditStatisticSection,
  EditTestimonialSection,
  EditGallerySection,
  EditFAQSection,
  EditFooterSection,
} from '../../../components/admin/landing/index';

export default function EditLandingPage() {
  const { sectionKey } = useParams();
  const { modal, showModal, closeModal } = useModal();
  const { sectionData, isLoading, _error, getSectionData, updateSectionData } =
    useEditLandingSection();

  useEffect(() => {
    getSectionData(sectionKey);
  }, [sectionKey, getSectionData]);

  function showSuccessModal() {
    showModal({
      title: 'Update Berhasil',
      description:
        'Section berhasil diperbarui, silahkan ke halaman landing page untuk melihatnya',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => {
        closeModal();
      },
    });
  }

  function showErrorModal(message) {
    showModal({
      title: 'Update Gagal',
      description: message,
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-700 text-white',
      onConfirm: null,
    });
  }

  async function handleSave(formDataPayload) {
    try {
      const response = await updateSectionData(formDataPayload, sectionKey);

      if (response?.status === 'success') {
        showSuccessModal();
      } else {
        showErrorModal(
          response?.message || 'Section gagal di perbarui, silahkan coba lagi',
        );
      }
    } catch (error) {
      showErrorModal(error.message);
    }
  }

  return (
    <section>
      <EditLandingPageFragment>
        <LandingPageNav />

        {sectionKey === 'hero' && (
          <EditHeroSection
            initialData={sectionData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}

        {sectionKey === 'about' && (
          <EditAboutSection
            initialData={sectionData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}

        {sectionKey === 'statistics' && (
          <EditStatisticSection
            initialData={sectionData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}

        {sectionKey === 'testimonials' && (
          <EditTestimonialSection
            initialData={sectionData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}

        {sectionKey === 'documentation' && (
          <EditGallerySection
            initialData={sectionData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}

        {sectionKey === 'faq' && (
          <EditFAQSection
            initialData={sectionData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}

        {sectionKey === 'footer' && (
          <EditFooterSection
            initialData={sectionData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}

        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          description={modal.description}
          icon={modal.icon}
          iconColor={modal.iconColor}
          iconBgColor={modal.iconBgColor}
          buttonColor={modal.buttonColor}
          buttonText="Tutup"
          onClose={modal.onConfirm || closeModal}
        />
      </EditLandingPageFragment>
    </section>
  );
}
