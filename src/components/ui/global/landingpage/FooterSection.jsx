import LogoSimak from '../../../../assets/images/simak-logo.webp';
import {
  FaFacebook as IconFacebook,
  FaLocationDot as IconLocation,
} from 'react-icons/fa6';

export default function FooterSection() {
  return (
    <footer className="mt-12 bg-sea-green-950 text-white border-t border-sea-green-800 relative overflow-hidden">
      <div className="w-[95%] sm:w-[98%] max-w-7xl mx-auto pt-16 pb-12 px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          {/*  Column 1: Organization Identity  */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sea-green-700 border border-sea-green-600/50 flex items-center justify-center text-white shadow-sm">
                <img src={LogoSimak} alt="Logo Simak" data-icon="mosque" />
              </div>
              <div>
                <span className="font-headline-sm text-[22px] font-bold tracking-tight text-white block leading-none">
                  SIMAK
                </span>
                <span className="text-[12px] text-sea-green-200 font-medium tracking-wide">
                  Silaturahmi Haji Mandiri Karawang
                </span>
              </div>
            </div>
            <p className="text-sea-green-100   leading-relaxed max-w-sm">
              "Bersama Belajar, Berbagi, dan Menjadi Jamaah Mandiri."
            </p>
          </div>

          {/*  Column 2: Media Sosial  */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 tracking-tight">
              Media Sosial
            </h4>
            <ul className="space-y-3">
              <li className="">
                <a
                  className="group inline-flex items-center gap-3 text-sea-green-100 hover:text-galliano-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-500 rounded-lg p-1"
                  href="https://www.facebook.com/people/Silaturahmi-Haji-Mandiri-Karawang/100082955517284/?rdid=hrRCh5UNxi2zHPDs&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DVvKJtvoS%2F"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="w-9 h-9 rounded-lg bg-sea-green-900 border border-sea-green-800 flex items-center justify-center text-sea-green-100 group-hover:text-galliano-400 group-hover:border-sea-green-700 transition-colors shadow-sm">
                    <IconFacebook
                      className="material-symbols-outlined text-[19px]"
                      data-icon="facebook"
                    />
                  </span>
                  <span className="  font-medium">
                    Silaturahmi Haji Mandiri Karawang
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/*  Column 3: Alamat  */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 tracking-tight">
              Alamat
            </h4>
            <a
              href="https://share.google/YOxGPw1NUstzE962F"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex items-start gap-3 text-sea-green-100 leading-relaxed">
                <div className="w-9 h-9 rounded-lg bg-sea-green-900 border border-sea-green-800 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <IconLocation
                    className="material-symbols-outlined text-[19px]"
                    data-icon="location_on"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Masjid Raya Puri Teluk Jambe
                  </p>
                  <p className="text-sea-green-200/90">
                    Sirnabaya, Telukjambe Timur
                  </p>
                  <p className="text-sea-green-200/90">
                    Karawang, Jawa Barat 41361
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/*  Divider  */}
        <hr className="border-t border-sea-green-800 my-8" />

        {/*  Copyright Area  */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sea-green-200  ">
          <p className="">
            ©{' '}
            <span id="footer-year" className="">
              {new Date().getFullYear()}
            </span>{' '}
            SIMAK — Silaturahmi Haji Mandiri Karawang. All rights reserved.
          </p>
          <p className="text-[13px] text-sea-green-200/70">
            Wadah Edukasi &amp; Kemandirian Ibadah Jamaah
          </p>
        </div>
      </div>
    </footer>
  );
}
