import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export const UserDashboardPage = () => {
  const [user, setUser] = useState(null);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'user') {
      navigate('/');
      return;
    }
    setUser(storedUser);
    fetchAttendedEvents(storedUser.id);
  }, [navigate]);

  const fetchAttendedEvents = async (userId) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      const res = await axios.post('http://localhost/simak_api/get_user_events.php', formData);
      if (res.data.status === 'success') {
        setAttendedEvents(res.data.data);
      }
    } catch (error) {
      console.error('Gagal mengambil riwayat event');
    }
  };

  const handleBukaMateri = (event) => {
    if (event.status === 'aktif') {
      // Bawa ID event ke halaman materi (menggunakan state atau URL parameter)
      navigate(`/materi?event_id=${event.id}`);
    } else {
      alert('Materi tidak dapat diakses karena event sudah berakhir.');
    }
  };

  if (!user) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen flex flex-col gap-6">
      {/* Kartu Profil & QR */}
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-sea-green-200">
          <QRCodeCanvas value={user.qr_code_hash || 'INVALID'} size={160} />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Kartu Peserta</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.nama_lengkap}</h2>
          <p className="text-sea-green-600 font-semibold mb-6">Porsi: {user.nomor_porsi}</p>
          <button
            onClick={() => { localStorage.removeItem('user'); navigate('/'); }}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-semibold hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Daftar Event yang Diikuti */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Event yang Diikuti</h3>

        {attendedEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Anda belum memiliki riwayat absensi event.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {attendedEvents.map((ev) => (
              <div key={ev.id} className="p-4 border rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{ev.nama_event}</h4>
                  <p className="text-sm text-gray-500">Waktu Absen: {ev.waktu_absen}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-bold ${ev.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {ev.status === 'aktif' ? 'SEDANG BERLANGSUNG' : 'SELESAI'}
                  </span>
                </div>
                <button
                  onClick={() => handleBukaMateri(ev)}
                  className={`px-6 py-2 rounded-xl font-bold transition ${ev.status === 'aktif' ? 'bg-sea-green-600 text-white hover:bg-sea-green-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Lihat Materi
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserDashboardPage;