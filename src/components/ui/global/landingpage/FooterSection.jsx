import LogoSimak from '../../../../assets/images/simak-logo.webp';
import {
  FaFacebook as IconFacebook,
  FaLocationDot as IconLocation,
} from 'react-icons/fa6';

export default function FooterSection() {
  return (
    <footer className="relative  overflow-hidden text-white border-t bg-sea-green-950 border-sea-green-800">
      <div className="w-[95%] sm:w-[98%] max-w-7xl mx-auto pt-16 pb-12 px-6 sm:px-8">
        <div className="grid items-start grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/*  Column 1: Organization Identity  */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 text-white border shadow-sm rounded-xl bg-sea-green-700 border-sea-green-600/50">
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
            <p className="max-w-sm leading-relaxed text-sea-green-100">
              "Bersama Belajar, Berbagi, dan Menjadi Jamaah Mandiri."
            </p>
          </div>

          {/*  Column 2: Media Sosial  */}
          <div>
            <h4 className="mb-4 text-lg font-semibold tracking-tight text-white">
              Media Sosial
            </h4>
            <ul className="space-y-3">
              <li className="">
                <a
                  className="inline-flex items-center gap-3 p-1 transition-colors duration-200 rounded-lg group text-sea-green-100 hover:text-galliano-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-500"
                  href="https://www.facebook.com/people/Silaturahmi-Haji-Mandiri-Karawang/100082955517284/?rdid=hrRCh5UNxi2zHPDs&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DVvKJtvoS%2F"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="flex items-center justify-center transition-colors border rounded-lg shadow-sm w-9 h-9 bg-sea-green-900 border-sea-green-800 text-sea-green-100 group-hover:text-galliano-400 group-hover:border-sea-green-700">
                    <IconFacebook
                      className="material-symbols-outlined text-[19px]"
                      data-icon="facebook"
                    />
                  </span>
                  <span className="font-medium ">
                    Silaturahmi Haji Mandiri Karawang
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/*  Column 3: Alamat  */}
          <div>
            <h4 className="mb-4 text-lg font-semibold tracking-tight text-white">
              Alamat
            </h4>
            <a
              href="https://share.google/YOxGPw1NUstzE962F"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex items-start gap-3 leading-relaxed text-sea-green-100">
                <div className="w-9 h-9 rounded-lg bg-sea-green-900 border border-sea-green-800 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <IconLocation
                    className="material-symbols-outlined text-[19px]"
                    data-icon="location_on"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">
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
        <hr className="my-8 border-t border-sea-green-800" />

        {/*  Copyright Area  */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-sea-green-200 ">
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
