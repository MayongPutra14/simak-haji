import { useState, useEffect, useCallback } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { GrGallery as IconGallery } from 'react-icons/gr';
import BackgroundGlass from '../../../../assets/images/activities/dokumentasi-group-2026-3.webp';
import TwoPeople from '../../../../assets/images/activities/Gunung-SIMAKjpg.webp';
import Huzaifah from '../../../../assets/images/activities/huzaifah.webp';
import Lecturer from '../../../../assets/images/activities/kajian.webp';
import DepartureCeremony from '../../../../assets/images/activities/keberangkatan-simak.webp';
import DepartureAirlines from '../../../../assets/images/activities/keberangkatan.webp';
import { motion } from 'motion/react';
import * as motionFrames from '../../../../utils/helpers/motion';

const galleryItems = [
  {
    id: 1,
    image: Lecturer,
    alt: 'Kajian rutin jamaah SIMAK di masjid',
    category: 'Kajian',
    desktopSpan: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    image: DepartureCeremony,
    alt: 'Momen upacara keberangkatan jamaah haji',
    category: 'Keberangkatan',
    desktopSpan: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    image: Huzaifah,
    alt: 'Kegiatan silaturahmi antar anggota',
    category: 'Huzaifah',
    desktopSpan: 'col-span-1 row-span-2',
  },
  {
    id: 4,
    image: TwoPeople,
    alt: 'Praktik manasik dan kegiatan jamaah',
    category: 'Kegiatan Jamaah',
    desktopSpan: 'col-span-1 row-span-1',
  },
  {
    id: 5,
    image: BackgroundGlass,
    alt: 'Dokumentasi grup jamaah tahun 2026',
    category: 'Dokumentasi Haji',
    desktopSpan: 'col-span-2 row-span-1',
  },
  {
    id: 6,
    image: DepartureAirlines,
    alt: 'Sesi keberangkatan maskapai jamaah',
    category: 'Keberangkatan',
    desktopSpan: 'col-span-1 row-span-1',
  },
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1,
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1,
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
            Galeri SIMAK
          </motion.h2>
          <motion.p
            variants={motionFrames.fadeInvariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl text-sm leading-relaxed text-sea-green-200 md:text-base"
          >
            Momen-momen kebersamaan, pembelajaran, dan persiapan ibadah haji
            yang terjalin erat dalam keluarga besar komunitas kami.
          </motion.p>
        </header>

        {/* Desktop Asymmetric/Masonry Grid */}
        <div className="hidden grid-cols-4 grid-rows-3 gap-4 md:grid h-150">
          {galleryItems.map((item) => (
            <figure
              key={item.id}
              className={`relative overflow-hidden rounded-xl bg-sea-green-900 group ${item.desktopSpan}`}
            >
              <motion.img
                variants={motionFrames.imageBlurVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:rotate-[0.5deg]"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 opacity-0 bg-linear-to-t from-sea-green-950/90 to-transparent group-hover:opacity-100">
                <span className="text-sm font-medium text-sea-green-50">
                  {item.category}
                </span>
              </figcaption>
            </figure>
          ))}
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
            {galleryItems.map((item) => (
              <figure key={item.id} className="relative w-full h-full shrink-0">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="object-cover w-full h-full"
                />
                <figcaption className="absolute px-3 py-1 border rounded bottom-4 left-4 bg-sea-green-950/80 border-sea-green-800 backdrop-blur-sm">
                  <span className="text-xs font-medium text-sea-green-50">
                    {item.category}
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
