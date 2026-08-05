import SimakLogo from '../../assets/images/simak-logo.png';

export const LogoSimak = () => {
  return (
    <div className="flex items-center justify-center py-8 sm:px-6 lg:px-8">
      <header className="w-full text-center">
        {/* Logo */}
        <img
          src={SimakLogo}
          alt="Logo Resmi SIMAK"
          className="mx-auto h-32 w-auto object-fit" />

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Dashboard Layanan SIMAK
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-white sm:text-base">
          Silahkan masuk untuk mengakses akun Anda
        </p>
      </header>
    </div>
  );
};
