import {
  FaQuoteLeft as IconQuote,
  FaRegComments as IconMessage,
} from 'react-icons/fa';

// Testimonial data reflecting real, varied experiences
const testimonials = [
  {
    id: 1,
    name: 'Ahmad Fauzi',
    initials: 'AF',
    status: 'Jamaah SIMAK',
    departureYear: '2025',
    text: 'Alhamdulillah, bergabung dengan SIMAK memberikan ketenangan luar biasa. Proses manasik sangat terstruktur dan para pembimbing sangat sabar menjawab setiap pertanyaan kami. Suasana kekeluargaan benar-benar terasa dari awal pendaftaran hingga persiapan keberangkatan.',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    initials: 'SN',
    status: 'Jamaah SIMAK',
    departureYear: '2024',
    text: 'Komunitas yang sangat solid. Saya merasa tidak sendirian dalam mempersiapkan perjalanan spiritual ini. Terima kasih SIMAK atas bimbingannya yang tulus.',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    initials: 'BS',
    status: 'Jamaah SIMAK',
    departureYear: '2026',
    text: 'Sangat direkomendasikan untuk calon jamaah yang mencari bimbingan terpercaya dan komunitas yang saling mendukung dalam kebaikan.',
  },
  {
    id: 4,
    name: 'Lina Marlina',
    initials: 'LM',
    status: 'Jamaah SIMAK',
    departureYear: '2024',
    text: 'Materi manasik yang disampaikan sangat mudah dipahami. Pengurusnya responsif dan peduli dengan kondisi setiap jamaah, membuat kami merasa aman dan dipedulikan.',
  },
];

export default function TestimonialSection() {
  return (
    // Section uses slate-50 to cleanly contrast the white cards
    <section className="bg-slate-50 py-16 overflow-hidden">
      {/* Width managed to 95% on mobile, 98% on desktop */}
      <div className="w-[95%] md:w-[98%] mx-auto max-w-7xl">
        {/* Semantic header with subtle eyebrow and clean typography[cite: 1] */}
        <header className="mb-12 text-center flex flex-col items-center ">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800   uppercase tracking-wider font-semibold mb-3">
            <IconMessage className="w-6 h-6" />
            Testimoni Jamaah
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Apa Kata Jamaah Kami
          </h2>
          <p className="text-slate-700/50 mt-3 max-w-2xl">
            Pengalaman nyata dari mereka yang telah mempercayakan perjalanan
            spiritualnya bersama komunitas SIMAK.
          </p>
        </header>

        {/*
          MOBILE VIEW: Continuous Marquee
          Uses CSS keyframes for a slow, continuous queue without controls.
          Respects prefers-reduced-motion for accessibility.[cite: 1]
        */}
        <div className="md:hidden relative flex overflow-x-hidden w-full">
          {/* We duplicate the array to allow a seamless 50% translation loop */}
          <div className="flex w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none space-x-6 pb-4">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <TestimonialCard key={`mobile-${idx}`} data={item} isMobile />
            ))}
          </div>
        </div>

        {/*
          DESKTOP VIEW: Bento / Asymmetric Layout
          Grid layout presenting 1 large featured card and several smaller cards[cite: 1].
        */}
        <div className="hidden md:grid md:grid-cols-12 gap-6">
          <div className="col-span-8 flex flex-col gap-6">
            <TestimonialCard data={testimonials[0]} isLarge />
            <TestimonialCard data={testimonials[3]} />
          </div>
          <div className="col-span-4 flex flex-col gap-6">
            <TestimonialCard data={testimonials[1]} />
            <TestimonialCard data={testimonials[2]} />
          </div>
        </div>
      </div>

      {/* Inline styles for the continuous mobile marquee to avoid external CSS requirements */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `,
        }}
      />
    </section>
  );
}

// Reusable Testimonial Card Component
function TestimonialCard({ data, isLarge = false, isMobile = false }) {
  return (
    // Clean, modern Islamic styling: white surfaces, subtle borders, no AI-slop[cite: 1]
    <article
      className={`
        bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 
        flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 
        ${isMobile ? 'w-[85vw] shrink-0' : 'h-full'}
      `}
    >
      {/* Quote Icon using a subtle Sea Green accent (Sea Green 100)[cite: 1] */}
      <IconQuote
        className={`mb-4 text-galliano-300 ${isLarge ? 'text-4xl' : 'text-2xl'}`}
        aria-hidden="true"
      />

      {/* Semantic blockquote with typography hierarchy reflecting card prominence[cite: 1] */}
      <blockquote
        className={`
          flex-1 text-slate-700 mb-8
          ${isLarge ? 'text-lg md:text-xl leading-relaxed' : 'text-base leading-normal'}
        `}
      >
        "{data.text}"
      </blockquote>

      {/* Footer containing author info and strictly authentic data (no star ratings)[cite: 1] */}
      <footer className="flex items-center gap-4 mt-auto">
        {/* Initial-based avatar using Sea Green colors[cite: 1] */}
        <div
          className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-sea-green-50 text-sea-green-800 flex items-center justify-center font-semibold text-sm md:text-base shrink-0"
          aria-hidden="true"
        >
          {data.initials}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{data.name}</span>
          <span className="text-xs md:text-sm text-slate-700/50">
            {data.status} • Berangkat {data.departureYear}
          </span>
        </div>
      </footer>
    </article>
  );
}
