import { motion } from 'motion/react';
import * as motionFrames from '../../../../utils/helpers/motion';
import { IconQuote, IconMessage } from '../../../../utils/helpers/decorations';

export default function TestimonialSection({ content }) {
  const { title, description, testimonials_list } = content;

  return (
    // Section uses slate-50 to cleanly contrast the white cards
    <section id="testimoni" className="py-16 overflow-hidden bg-slate-50">
      {/* Width managed to 95% on mobile, 98% on desktop */}
      <div className="w-[95%] md:w-[98%] mx-auto max-w-7xl">
        {/* Semantic header with subtle eyebrow and clean typography[cite: 1] */}
        <header className="flex flex-col items-center mb-12 text-center ">
          {/* EYEBROW */}
          <motion.span
            variants={motionFrames.fadeInvariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800   uppercase tracking-wider font-semibold mb-3"
          >
            <IconMessage className="w-6 h-6" />
            Testimoni Jamaah
          </motion.span>

          {/* TITLE */}
          <motion.h2
            variants={motionFrames.innerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl font-bold md:text-4xl text-slate-800"
          >
            {title}
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            variants={motionFrames.innerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl mt-3 text-slate-700/50"
          >
            {description}
          </motion.p>
        </header>

        {/*
          MOBILE VIEW: Continuous Marquee
          Uses CSS keyframes for a slow, continuous queue without controls.
          Respects prefers-reduced-motion for accessibility.[cite: 1]
        */}
        <div className="relative flex w-full overflow-x-hidden md:hidden">
          {/* We duplicate the array to allow a seamless 50% translation loop */}
          <div className="flex w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none space-x-6 pb-4">
            {[...testimonials_list, ...testimonials_list].map((item, idx) => (
              <TestimonialCard key={`mobile-${idx}`} data={item} isMobile />
            ))}
          </div>
        </div>

        {/*
          DESKTOP VIEW: Bento / Asymmetric Layout
          Grid layout presenting 1 large featured card and several smaller cards[cite: 1].
        */}
        {testimonials_list && testimonials_list.length > 0 && (
          <motion.div
            variants={motionFrames.innerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="hidden gap-6 md:grid md:grid-cols-12"
          >
            <div className="flex flex-col col-span-8 gap-6">
              <motion.div variants={motionFrames.innerItemVariants}>
                <TestimonialCard data={testimonials_list[0]} isLarge />
              </motion.div>
              <motion.div variants={motionFrames.innerItemVariants}>
                <TestimonialCard data={testimonials_list[3]} />
              </motion.div>
            </div>
            <div className="flex flex-col col-span-4 gap-6">
              <motion.div variants={motionFrames.innerItemVariants}>
                <TestimonialCard data={testimonials_list[1]} />
              </motion.div>
              <motion.div variants={motionFrames.innerItemVariants}>
                <TestimonialCard data={testimonials_list[2]} />
              </motion.div>
            </div>
          </motion.div>
        )}
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
  const name = data?.author.name || 'Jamaah';
  const qoute = data?.quote || '-';
  const departure = data?.author.departure_year || '-';

  const encodedName = encodeURIComponent(name);
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=false`;
  const initialName = avatarFallback;
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
        "{qoute}"
      </blockquote>

      {/* Footer containing author info and strictly authentic data (no star ratings)[cite: 1] */}
      <footer className="flex items-center gap-4 mt-auto">
        <img
          src={initialName}
          alt={name || 'Jamaah'}
          className="rounded-full w-11 h-11 md:w-12 md:h-12 shrink-0 object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{name}</span>
          <span className="text-xs md:text-sm text-slate-700/50">
            Jamaah SIMAK • Berangkat {departure}
          </span>
        </div>
      </footer>
    </article>
  );
}
