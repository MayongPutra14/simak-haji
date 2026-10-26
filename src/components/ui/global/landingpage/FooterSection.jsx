import { SOCIAL_MEDIA_CONFIG } from '../../../../utils/helpers/constant';
import LogoSimak from '../../../../assets/images/simak-logo.webp';
import { IconLocationFill } from '../../../../utils/helpers/decorations';

export default function FooterSection({ content }) {
  const { slogan, address, social_media = [] } = content || {};

  // FILTER ITEMS WITH VALID URL
  const validSocialMedia = social_media.filter(
    (item) => item?.url && item.url.trim() !== '',
  );

  return (
    <footer className="relative overflow-hidden text-white border-t bg-sea-green-950 border-sea-green-800">
      <div className="w-[95%] sm:w-[98%] max-w-7xl mx-auto pt-16 pb-12 px-6 sm:px-8">
        <div className="grid items-start grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* COLUMN 1: ORGANIZATION IDENTITY */}
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
              "{slogan}"
            </p>
          </div>

          {/* COLUMN 2: SOCIAL MEDIA */}
          <div>
            <h4 className="mb-4 text-lg font-semibold tracking-tight text-white">
              Media Sosial
            </h4>
            <ul className="space-y-3">
              {validSocialMedia.map((item, index) => {
                const normalizedKey = item.name?.toLowerCase().trim();
                const config = SOCIAL_MEDIA_CONFIG[normalizedKey];
                const IconComponent = config.icon;

                return (
                  <li key={index}>
                    <a
                      className={`inline-flex items-center gap-3 p-1 transition-colors duration-200 rounded-lg group text-sea-green-100 ${config.hoverColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-500`}
                      href={item.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span
                        className={`flex items-center justify-center transition-colors border rounded-lg shadow-sm w-9 h-9 bg-sea-green-900 border-sea-green-800 text-sea-green-100 ${config.hoverColor} ${config.borderColor}`}
                      >
                        <IconComponent className="text-[19px]" />
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COLUMN 3: ADDRESS */}
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
                  <IconLocationFill
                    className="material-symbols-outlined text-[19px]"
                    data-icon="location_on"
                  />
                </div>
                <div>
                  <p className="text-sea-green-200/90">{address}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="my-8 border-t border-sea-green-800" />

        {/* COPYRIGHT AREA */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-sea-green-200">
          <p>
            © <span id="footer-year">{new Date().getFullYear()}</span> SIMAK —
            Silaturahmi Haji Mandiri Karawang. All rights reserved.
          </p>
          <p className="text-[13px] text-sea-green-200/70">
            Wadah Edukasi &amp; Kemandirian Ibadah Jamaah
          </p>
        </div>
      </div>
    </footer>
  );
}
