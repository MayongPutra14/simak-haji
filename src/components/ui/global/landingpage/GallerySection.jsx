import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import * as motionFrames from '../../../../utils/helpers/motion';
import { DESKTOP_SPANS } from '../../../../utils/helpers/constant';
import { IconGallery } from '../../../../utils/helpers/decorations';

export default function GallerySection({ content }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { title, description, documentation_items } = content;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === documentation_items.length - 1 ? 0 : prev + 1,
    );
  }, [documentation_items]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? documentation_items.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  return (
    <section
      id="gallery"
      className="w-full py-16 overflow-hidden bg-sea-green-950 md:py-24"
    >
      <div className="mx-auto w-[95%] md:w-[98%] max-w-7xl">
        <header className="flex flex-col items-center mb-10 text-center">
          {/* EYEBROW */}
          <motion.span
            variants={motionFrames.fadeInvariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-3 text-xs md:text-sm rounded-full bg-galliano-100 text-galliano-800   uppercase tracking-wider  font-semibold mb-4"
          >
            <IconGallery className="w-4 h-4" />
            DOKUMENTASI SIMAK
          </motion.span>

          {/* TITLE */}
          <motion.h2
            variants={motionFrames.fadeInvariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-4 text-3xl font-medium md:text-4xl text-sea-green-50"
          >
            {title}
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            variants={motionFrames.fadeInvariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl text-sm leading-relaxed text-sea-green-200 md:text-base"
          >
            {description}
          </motion.p>
        </header>

        {/* Desktop Asymmetric/Masonry Grid */}
        <div className="hidden grid-cols-4 grid-rows-3 gap-4 md:grid h-150">
          {documentation_items.map((item, index) => {
            const desktopSpan = DESKTOP_SPANS[index % DESKTOP_SPANS.length];

            return (
              <figure
                key={`${item.id}-${index}`}
                className={`relative overflow-hidden rounded-xl bg-sea-green-900 group ${desktopSpan}`}
              >
                <motion.img
                  variants={motionFrames.imageBlurVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  src={item.image.url}
                  alt={item.image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:rotate-[0.5deg]"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 opacity-0 bg-linear-to-t from-sea-green-950/90 to-transparent group-hover:opacity-100">
                  <span className="text-sm font-medium text-sea-green-50">
                    {item.label}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Mobile Horizontal Carousel */}
        <div
          className="relative w-full overflow-hidden md:hidden rounded-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out h-87.5"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {documentation_items.map((item, index) => (
              <figure
                key={`${item.id}-${index}`}
                className="relative w-full h-full shrink-0"
              >
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="object-cover w-full h-full"
                />
                <figcaption className="absolute px-3 py-1 border rounded bottom-4 left-4 bg-sea-green-950/80 border-sea-green-800 backdrop-blur-sm">
                  <span className="text-xs font-medium text-sea-green-50">
                    {item.label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute p-2 transition-colors -translate-y-1/2 rounded-full left-2 top-1/2 bg-sea-green-950/70 text-sea-green-50 hover:bg-galliano-500 hover:text-sea-green-950 focus:outline-none focus:ring-2 focus:ring-galliano-400"
          >
            <IoChevronBackOutline size={20} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute p-2 transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 bg-sea-green-950/70 text-sea-green-50 hover:bg-galliano-500 hover:text-sea-green-950 focus:outline-none focus:ring-2 focus:ring-galliano-400"
          >
            <IoChevronForwardOutline size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
