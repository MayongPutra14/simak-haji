import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import useUpdateUser from '../../../hooks/admin/user/useEdiUser';
import EditUser from '../../../components/admin/EditUser';
import TitlePage from '../../../components/ui/global/TitlePage';
import { bgImage } from '../../../utils/bgImage';

const CLOUD_NAME = 'llp0te3a';
const UPLOAD_PRESET = 'simak_preset';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function UserEditFragment() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const { getUserProfile, updateProfileUser, isLoading } = useUpdateUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile(userId);

        if (data) {
          setInitialData(data);
        }
      } catch (err) {
        console.error('Gagal memuat profil jamaah:', err);
      }
    };
    if (userId) fetchData();
  }, [userId, getUserProfile]);

  const handleSave = async (payload, rawImageFile) => {
    try {
      const finalPayload = { ...payload };

      delete finalPayload.profileImage;

      // Upload image first if found it
      if (rawImageFile instanceof File) {
        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', rawImageFile);
        cloudinaryForm.append('upload_preset', UPLOAD_PRESET);

        const cloudRes = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: cloudinaryForm,
        });
        const cloudData = await cloudRes.json();

        if (!cloudRes.ok || !cloudData.secure_url) {
          throw new Error('Gagal mengunggah foto profil baru.');
        }

        finalPayload.profileImage = cloudData.secure_url;
      }

      await updateProfileUser(userId, finalPayload);
      navigate('/admin/users');
    } catch (err) {
      alert(err.message || 'Gagal memperbarui data profil');
    }
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  return (
    <>
      <TitlePage
        bgImage={bgImage.bgIstiqlal}
        title="Perbarui Profil Jamaah"
        subtitle="Mohon periksa kembali seluruh data yang telah dimasukkan. Pastikan nama, nomor porsi, dan informasi lainnya sudah sesuai dengan paspor atau SPPH untuk menghindari kesalahan saat proses keberangkatan."
        gradientClass="from-sea-green-800 via-sea-green-800/90 to-sea-green-500/75"
      />

      <EditUser
        initialData={initialData}
        onSave={handleSave}
        onCancel={handleCancel}
        IsLoading={isLoading}
      />
    </>
  );
}
