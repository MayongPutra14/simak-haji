import Button from '../Button';
import doc20262 from '../../../../assets/images/doc-front-masjid-2026-2.webp';
import doc2025 from '../../../../assets/images/doc-front-kabah-2025.webp';
import { FaArrowRightLong as IconArrowRight } from 'react-icons/fa6';
import {
  FaQuoteRight as IconQuote,
  FaWhatsapp as IconWhatsapp,
} from 'react-icons/fa';
import {
  MdGroups as IconGroup,
  MdOutlineHistoryEdu as IconHistory,
  MdOutlineAutoAwesome as IconAwesome,
  MdOutlineDiversity3 as IconDeversity,
  MdMenuBook as IconMenuBook,
  MdOutlineHealthAndSafety as IconSafety,
  MdAccountBalanceWallet as IconBalance,
  MdCheckCircleOutline as IconCheckCircle,
  MdFavoriteBorder as IconFavorite,
  MdArchive as IconArchive,
} from 'react-icons/md';

export default function AboutSection() {
  const openWa = () => {
    const text =
      "Assalamu'alaikum, Admin SIMAK. Saya ingin berkonsultasi mengenai program SIMAK ini.";
    const message = encodeURIComponent(text);
    window.open(
      `https://wa.me/6281809847017?text=${message}`,
      '_blank',
      'noopener,noreferrer',
    );
  };
  return (
    <section
      className="py-20 border-t md:py-28 bg-slate-50 border-sea-green-100"
      id="tentang"
    >
      <div className="px-6 mx-auto space-y-24 max-w-7xl md:space-y-32">
        {/* <!-- Row 1 (Introduction): Text Left, Image Right --> */}
        <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800   uppercase tracking-wider  font-semibold mb-4">
              <IconGroup className="w-6 h-6" data-icon="groups" />
              <span>Tentang SIMAK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-[1.15] tracking-tight mb-6">
              Bersama Mempersiapkan Jamaah yang Mandiri
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                SIMAK hadir dari visi bersama untuk membangun komunitas jamaah
                haji yang solid, saling mendukung, dan mandiri. Kami percaya
                bahwa persiapan haji bukanlah sekadar perjalanan komersial,
                melainkan perjalanan spiritual yang harus dipersiapkan dengan
                ilmu dan kebersamaan.
              </p>
            </div>
            <div className="p-5 mt-6 bg-white border border-l-4 shadow-sm rounded-2xl border-sea-green-100 border-l-sea-green-600">
              <p className="italic leading-relaxed text-sea-green-900">
                "Dengan persiapan, pengetahuan, dan kebersamaan, perjalanan
                menuju kemandirian dalam ibadah haji dapat dipersiapkan dengan
                lebih baik."
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden bg-white border shadow-lg rounded-2xl border-sea-green-100">
              <img
                alt="Indonesian Muslim community gathering for Hajj preparation and learning workshop, group of prospective Indonesian pilgrims sitting together in a discussion circle, warm natural indoor community mosque setting, documentary photography style, realistic, respectful, authentic Indonesian people smiling and discussing"
                className="object-cover object-center w-full h-85 md:h-105"
                src={doc2025}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[12px]  text-sea-green-800 px-2">
              <span className="flex items-center gap-1.5 font-medium">
                <IconArchive
                  className="material-symbols-outlined  md:text-[16px] text-sea-green-600"
                  data-icon="handshake"
                />
                Dokumentasi SIMAK Angkatan 2025
              </span>
            </div>
          </div>
        </div>

        {/* <!-- Row 2 (The Beginning / Awal Perjalanan): Reversed Zig-Zag (Image Left, Narrative Right) --> */}
        <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative order-2 md:order-1">
            <div className="relative overflow-hidden bg-white border shadow-lg rounded-2xl border-sea-green-100">
              <img
                src={doc20262}
                alt="Documentary photo of Indonesian prospective Hajj pilgrims in white ihram or modest Islamic attire during manasik haji practical training simulation, authentic outdoor mosque courtyard setting in Indonesia, community solidarity and focus, real documentary candid style"
                className="object-cover object-center w-full h-85 md:h-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between  text-[12px]  text-sea-green-800 px-2">
              <span className="flex items-center gap-1.5 font-medium">
                <IconArchive
                  className="material-symbols-outlined text-[16px] text-sea-green-600"
                  data-icon="verified"
                />
                Dokumentasi SIMAK angkatan 2026
              </span>
            </div>
          </div>
          <div className="order-1 max-w-xl md:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-galliano-100 text-galliano-800   uppercase tracking-wider  font-semibold mb-4">
              <IconHistory
                className="w-6 h-6 text-[15px] "
                data-icon="history_edu"
              />
              <span>Awal Perjalanan</span>
            </div>
            <h3 className="mb-6 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl text-slate-800">
              Berawal dari Niat yang Sama
            </h3>
            <div className="space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                SIMAK dibentuk dari visi dan misi yang sama untuk saling
                membantu antarsesama jamaah, tanpa niat eksploitasi komersial.
                Komunitas ini resmi didirikan pada hari{' '}
                <strong>Rabu, 17 November 2021</strong>, diinisiasi oleh calon
                jamaah haji angkatan 2020.
              </p>
            </div>

            <blockquote className="relative p-6 mt-6 overflow-hidden text-white shadow-md rounded-2xl bg-sea-green-900">
              <div className="relative z-10 flex items-start gap-3">
                <IconQuote
                  data-icon="format_quote"
                  className="material-symbols-outlined text-[28px] text-galliano-500 shrink-0 mt-0.5"
                />

                <div>
                  <p className="mb-2 font-semibold leading-snug text-white ">
                    “Jamaah Haji harus menjadi jamaah yang Mandiri dan Tidak
                    berharap Dilayani.”
                  </p>
                  <p className="text-sea-green-200">
                    Prinsip dasar SIMAK dalam menanamkan ketangguhan spiritual
                    dan fisik setiap jamaah.
                  </p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>

        {/* <!-- Row 3 (Our Purpose & Core Values / 4 Key Principles) --> */}
        <div>
          <div className="max-w-3xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800   uppercase tracking-wider font-semibold mb-3">
              <IconAwesome
                className="w-6 h-6 text-[15px] "
                data-icon="auto_awesome"
              />
              <span>Tujuan &amp; Nilai Dasar</span>
            </div>
            <h3 className="mb-8 text-2xl font-bold sm:text-3xl text-slate-800 sm:mb-10">
              Nilai & Tujuan Kami
            </h3>
            <p className="space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              Pedoman utama yang menjadi landasan gerak setiap relawan dan
              jamaah dalam membangun kesiapan utuh lahir dan batin.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* <!-- Principle 01 --> */}
            <div className="flex flex-col justify-between transition-all duration-300 bg-white border shadow-sm p-7 rounded-2xl border-sea-green-100 hover:shadow-md hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xl font-extrabold text-galliano-500">
                    01
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sea-green-50 text-sea-green-700">
                    <IconDeversity
                      className="w-6 h-6 text-[22px]"
                      data-icon="diversity_3"
                    />
                  </div>
                </div>
                <h3 className="text-slate-800 font-semibold mb-2.5">
                  Saling Mengenal
                </h3>
                <p className="leading-relaxed text-slate-700/60">
                  Membangun hubungan erat, persaudaraan, dan tali silaturahmi
                  yang berkelanjutan antarjamaah Karawang.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sea-green-50 text-[13px] font-medium text-sea-green-700 flex items-center gap-1">
                <IconCheckCircle
                  className="material-symbols-outlined text-[15px]"
                  data-icon="check_circle"
                />
                Ukhuwah Islamiyah
              </div>
            </div>
            {/* <!-- Principle 02 --> */}
            <div className="flex flex-col justify-between transition-all duration-300 bg-white border shadow-sm p-7 rounded-2xl border-sea-green-100 hover:shadow-md hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xl font-extrabold text-galliano-500">
                    02
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sea-green-50 text-sea-green-700">
                    <IconMenuBook
                      className="material-symbols-outlined text-[22px]"
                      data-icon="menu_book"
                    />
                  </div>
                </div>
                <h3 className="text-slate-800 font-semibold mb-2.5">
                  Belajar &amp; Berbagi
                </h3>
                <p className="leading-relaxed text-slate-700/60">
                  Saling berbagi pengetahuan, fikih rukun haji, dan pengalaman
                  empiris nyata dalam mempersiapkan ibadah.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sea-green-50 text-[13px] font-medium text-sea-green-700 flex items-center gap-1">
                <IconCheckCircle
                  className="material-symbols-outlined text-[15px]"
                  data-icon="check_circle"
                />
                Literasi Manasik Syar'i
              </div>
            </div>
            {/* <!-- Principle 03 --> */}
            <div className="flex flex-col justify-between transition-all duration-300 bg-white border shadow-sm p-7 rounded-2xl border-sea-green-100 hover:shadow-md hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xl font-extrabold text-galliano-500">
                    03
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sea-green-50 text-sea-green-700">
                    <IconSafety
                      className="material-symbols-outlined text-[22px]"
                      data-icon="health_and_safety"
                    />
                  </div>
                </div>
                <h3 className="text-slate-800 font-semibold mb-2.5">
                  Jamaah Mandiri
                </h3>
                <p className="leading-relaxed text-slate-700/60">
                  Mendorong jamaah agar lebih siap fisik, mental, dan solid
                  tanpa bergantung pada figur pelayan komersial.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sea-green-50 text-[13px] font-medium text-sea-green-700 flex items-center gap-1">
                <IconCheckCircle
                  className="material-symbols-outlined text-[15px]"
                  data-icon="check_circle"
                />
                Kemandirian Tawaf &amp; Sa'i
              </div>
            </div>
            {/* <!-- Principle 04 --> */}
            <div className="flex flex-col justify-between transition-all duration-300 bg-white border shadow-sm p-7 rounded-2xl border-sea-green-100 hover:shadow-md hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xl font-extrabold text-galliano-500">
                    04
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sea-green-50 text-sea-green-700">
                    <IconBalance
                      className="material-symbols-outlined text-[22px]"
                      data-icon="account_balance_wallet"
                    />
                  </div>
                </div>
                <h3 className="text-slate-800 font-semibold mb-2.5">
                  Edukasi Keuangan
                </h3>
                <p className="leading-relaxed text-slate-700/60">
                  Membantu jamaah memahami transparansi biaya, pelunasan
                  BPIH/Bipih, serta pengelolaan finansial haji yang bijak.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sea-green-50 text-[13px] font-medium text-sea-green-700 flex items-center gap-1">
                <IconCheckCircle
                  className="material-symbols-outlined text-[15px]"
                  data-icon="check_circle"
                />
                Transparan &amp; Efisien
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Final Restrained Community CTA Area --> */}
        <div className="relative p-8 overflow-hidden text-white border shadow-xl rounded-3xl bg-sea-green-900 md:p-14 border-sea-green-800">
          <div className="relative z-10 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[12px] text-sea-green-100 border border-white/15   font-semibold mb-5">
              <IconFavorite
                className="w-6 h-6 text-galliano-500"
                data-icon="favorite"
              />

              <span>Undangan Terbuka untuk Calon Tamu Allah</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold leading-tight text-white">
              Mari Bertumbuh dan Mempersiapkan Ibadah Haji Bersama.
            </h3>
            <div className="text-sea-green-200">
              <p>
                Bergabunglah bersama keluarga besar SIMAK Karawang. Kita
                pelajari setiap manasik dengan teliti, perkuat stamina fisik,
                dan bangun kemandirian ibadah demi meraih predikat Haji Mabrur.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-4 mt-6 sm:flex-row sm:items-center">
              <Button
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sea-green-600 hover:bg-sea-green-500 active:bg-sea-green-700 text-white   shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Daftar Segera
                <IconArrowRight />
              </Button>

              <Button
                onClick={() => openWa()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/25    transition-all duration-200 hover:-translate-y-0.5"
              >
                Konsultasi Gratis
                <IconWhatsapp data-icon="chat" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
