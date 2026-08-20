/**
 * Header component Reusable
 *
 * @param {Object} props
 * @param {string} [props.title="Jadwal dan Absensi"] - main title
 * @param {string} [props.subtitle="Jangan lewatkan agenda mendatang dan pastikan kehadiranmu sudah tercatat"] - subtitle description
 * @param {string} [props.bgImage] - URL background image default: Masjid NAbawi
 * @param {string} [props.gradientClass="from-sea-green-800 to-sea-green-500/30"] - class tailwind for bacground gradient
 */

const TitlePage = ({
  isMirror = false,
  title = 'Jadwal dan Absensi',
  subtitle = 'Jangan lewatkan agenda mendatang dan pastikan kehadiranmu sudah tercatat',
  bgImage = 'https://i.pinimg.com/736x/19/11/95/1911955bd58dfa0f589858d96b51e7e1.jpg',
  gradientClass = 'from-sea-green-800 to-sea-green-500/30',
}) => {
  return (
    <header className="relative w-full overflow-hidden h-50 rounded-b-3xl md:h-75">
      {/* THIRD CONTAINER: BACKGROUND IMAGE */}
      <div
        className={`absolute inset-0 bg-center bg-no-repeat bg-cover ${isMirror ? '-scale-x-100' : 'scale-x-100'}`}
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* GRADIENT RING TO LEFT */}
      <div className={`absolute inset-0 bg-linear-to-r ${gradientClass}`} />

      {/* SECOND CONTAINER: TITLE & SUB-TITLE  */}
      <div className="relative z-10 w-full px-6 py-12 text-white md:px-12 md:py-16">
        <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm text-gray-100 md:text-base opacity-90">
          {subtitle}
        </p>
      </div>
    </header>
  );
};

export default TitlePage;
