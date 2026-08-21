import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../features/auth/useAuth';

export const AdminDashboardPage = () => {
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState('');

  // State untuk Modal Materi
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [materiForm, setMateriForm] = useState({
    judul: '',
    konten: '',
    file: null,
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  // URL API Backend (Pastikan URL sesuai domain backend Anda)
  const API_URL = 'https://simak-api.vercel.app/api/admin_manage.php';

  // Reusable Fetch Events dengan useCallback
  const fetchEvents = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('action', 'get_events');
      const res = await axios.post(API_URL, formData);
      if (res.data.status === 'success') {
        setEvents(res.data.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data event:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const formData = new FormData();
        formData.append('action', 'get_events');
        const res = await axios.post(API_URL, formData);

        if (isMounted && res.data.status === 'success') {
          setEvents(res.data.data);
        }
      } catch (error) {
        console.error('Gagal mengambil data event:', error);
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('action', 'create_event');
      formData.append('nama_event', newEventName);
      await axios.post(API_URL, formData);
      setNewEventName('');
      fetchEvents();
    } catch (error) {
      console.error('Gagal membuat event:', error);
    }
  };

  const handleToggleEvent = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'aktif' ? 'selesai' : 'aktif';
      const formData = new FormData();
      formData.append('action', 'toggle_event');
      formData.append('id', id);
      formData.append('status', newStatus);
      await axios.post(API_URL, formData);
      fetchEvents();
    } catch (error) {
      console.error('Gagal mengubah status event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (
      !window.confirm(
        'Yakin ingin menghapus event ini beserta absensi dan materinya?',
      )
    )
      return;
    try {
      const formData = new FormData();
      formData.append('action', 'delete_event');
      formData.append('id', id);
      await axios.post(API_URL, formData);
      fetchEvents();
    } catch (error) {
      console.error('Gagal menghapus event:', error);
    }
  };

  // --- LOGIKA MATERI ---
  const fetchMaterials = async (eventId) => {
    try {
      const formData = new FormData();
      formData.append('action', 'get_materials');
      formData.append('event_id', eventId);
      const res = await axios.post(API_URL, formData);
      if (res.data.status === 'success') {
        setMaterials(res.data.data);
      }
    } catch (error) {
      console.error('Gagal mengambil materi:', error);
    }
  };

  const openMaterialModal = (event) => {
    setSelectedEvent(event);
    fetchMaterials(event.id);
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('action', 'upload_material');
      formData.append('event_id', selectedEvent.id);
      formData.append('judul', materiForm.judul);
      formData.append('konten', materiForm.konten);
      if (materiForm.file) formData.append('file_materi', materiForm.file);

      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMateriForm({ judul: '', konten: '', file: null });
      fetchMaterials(selectedEvent.id);
    } catch (error) {
      console.error('Gagal mengunggah materi:', error);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      const formData = new FormData();
      formData.append('action', 'delete_material');
      formData.append('id', id);
      await axios.post(API_URL, formData);
      fetchMaterials(selectedEvent.id);
    } catch (error) {
      console.error('Gagal menghapus materi:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header Premium */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Manajemen Event
            </h1>
            <p className="text-gray-500 mt-1">
              Kelola jadwal, status, dan materi kegiatan.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-bold hover:bg-red-100 transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Input Event Baru */}
        <form
          onSubmit={handleCreateEvent}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex gap-4"
        >
          <input
            type="text"
            placeholder="Nama Event Baru..."
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            required
            className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sea-green-500"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition cursor-pointer"
          >
            + Buat Event
          </button>
        </form>

        {/* Grid Event */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl leading-tight">
                    {ev.nama_event}
                  </h3>
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${ev.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {ev.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 border-t pt-4">
                <button
                  onClick={() => handleToggleEvent(ev.id, ev.status)}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm transition cursor-pointer ${ev.status === 'aktif' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  {ev.status === 'aktif' ? 'Akhiri' : 'Mulai'}
                </button>
                <button
                  onClick={() => openMaterialModal(ev)}
                  className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 transition cursor-pointer"
                >
                  Materi
                </button>
                <button
                  onClick={() => navigate(`/admin/scan?event_id=${ev.id}`)}
                  className="flex-1 bg-sea-green-50 text-sea-green-700 py-2 rounded-xl font-bold text-sm hover:bg-sea-green-100 transition cursor-pointer"
                >
                  Scanner
                </button>
                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Manajemen Materi */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 w-8 h-8 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-2xl font-extrabold mb-1">Kelola Materi</h2>
              <p className="text-gray-500 mb-6">
                Event: {selectedEvent.nama_event}
              </p>

              <form
                onSubmit={handleAddMaterial}
                className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Judul Materi"
                  value={materiForm.judul}
                  onChange={(e) =>
                    setMateriForm({ ...materiForm, judul: e.target.value })
                  }
                  required
                  className="bg-white border p-3 rounded-xl focus:ring-2 focus:ring-sea-green-500 outline-none"
                />
                <textarea
                  placeholder="Keterangan / Teks Konten"
                  value={materiForm.konten}
                  rows="2"
                  onChange={(e) =>
                    setMateriForm({ ...materiForm, konten: e.target.value })
                  }
                  className="bg-white border p-3 rounded-xl focus:ring-2 focus:ring-sea-green-500 outline-none"
                />
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    onChange={(e) =>
                      setMateriForm({ ...materiForm, file: e.target.files[0] })
                    }
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sea-green-50 file:text-sea-green-700 hover:file:bg-sea-green-100"
                  />
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-900 cursor-pointer"
                  >
                    Upload
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-3">
                {materials.length === 0 ? (
                  <p className="text-center text-gray-400 py-4">
                    Belum ada materi untuk event ini.
                  </p>
                ) : (
                  materials.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 border rounded-xl flex justify-between items-center hover:border-gray-300 transition"
                    >
                      <div>
                        <h4 className="font-bold text-gray-800">{m.judul}</h4>
                        {m.file_path && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md mt-1 inline-block">
                            File Terlampir
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteMaterial(m.id)}
                        className="text-red-500 font-bold text-sm px-3 py-1 bg-red-50 rounded-lg hover:bg-red-100 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
