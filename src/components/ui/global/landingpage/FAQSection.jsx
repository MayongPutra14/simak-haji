import { useState } from 'react';
import { motion } from 'motion/react';
import * as motionFrames from '../../../../utils/helpers/motion';
import {
  IoChevronDownOutline as IconDropdownOpen,
  IoChevronUpOutline as IconDropdownClose,
} from 'react-icons/io5';
import { FaRegCircleQuestion as IconQuestion } from 'react-icons/fa6';

const faqItems = [
  {
    question: 'Apa itu SIMAK — Silaturahmi Haji Mandiri Karawang?',
    answer:
      'SIMAK merupakan komunitas haji yang mengkonsolidasikan jamaah haji reguler non-KBIH dan hadir sebagai komunitas yang membantu masyarakat yang ingin mempersiapkan diri untuk berhaji.',
  },
  {
    question: 'Siapa yang dapat bergabung dengan SIMAK?',
    answer:
      'SIMAK terbuka untuk masyarakat umum, baik tua maupun muda, yang ingin mengenal, belajar, dan mempersiapkan diri untuk perjalanan ibadah haji.',
  },
  {
    question: 'Apa tujuan dibentuknya SIMAK?',
    answer:
      'SIMAK hadir dari visi bersama untuk membangun komunitas jamaah haji yang solid, saling mendukung, dan mandiri. Kami memandang persiapan haji bukan sekadar perjalanan komersial, tetapi sebuah perjalanan spiritual yang perlu dipersiapkan dengan matang melalui ilmu dan kebersamaan.',
  },
  {
    question: 'Apa saja kegiatan yang dilakukan SIMAK?',
    answer:
      'SIMAK memberikan pembelajaran dan pendampingan mengenai berbagai hal yang berkaitan dengan persiapan haji, termasuk latihan mandiri serta pemahaman hal-hal praktis yang perlu dipahami oleh setiap jamaah.',
  },
  {
    question: 'Apakah SIMAK merupakan biro perjalanan haji atau umrah?',
    answer:
      'Bukan. SIMAK merupakan sebuah komunitas dan bukan biro perjalanan haji atau umrah komersial. Fokus utama kami adalah membantu masyarakat dan jamaah melalui pembelajaran, persiapan, kebersamaan, serta semangat kemandirian.',
  },
  {
    question: 'Bagaimana cara bergabung menjadi anggota SIMAK?',
    answer:
      "Masyarakat dapat bergabung dengan mudah melalui dua cara, yaitu membuat akun langsung di website ini atau menghubungi admin melalui tombol 'Konsultasi' yang telah tersedia.",
  },
  {
    question: 'Apakah ada biaya untuk menjadi anggota SIMAK?',
    answer:
      'Tidak ada biaya sama sekali untuk menjadi anggota SIMAK, alias gratis.',
  },
  {
    question: 'Apakah SIMAK membantu jamaah dalam mempersiapkan ibadah haji?',
    answer:
      'Ya, SIMAK membantu jamaah dalam mempersiapkan ibadah haji melalui rangkaian pembelajaran, latihan, dan pembekalan berbagai pengetahuan yang dibutuhkan agar jamaah lebih siap dan mandiri saat beribadah.',
  },
  {
    question: 'Apa yang dimaksud dengan jamaah haji yang mandiri?',
    answer:
      "Mandiri di sini mengacu pada prinsip utama SIMAK, yaitu: 'Jamaah Haji harus menjadi jamaah yang Mandiri dan Tidak berharap Dilayani.' Prinsip ini menjadi fondasi kami dalam membangun ketangguhan spiritual dan fisik jamaah, serta mendorong setiap individu untuk memahami dan mempersiapkan kebutuhan ibadahnya secara mandiri.",
  },
  {
    question:
      'Apakah SIMAK memberikan edukasi mengenai manajemen keuangan haji?',
    answer:
      'Ya, SIMAK memberikan bimbingan serta edukasi mengenai pengelolaan atau manajemen keuangan yang berkaitan langsung dengan persiapan ibadah haji.',
  },
  {
    question: 'Di mana kegiatan SIMAK dilaksanakan?',
    answer:
      'Kegiatan SIMAK umumnya dilaksanakan secara tatap muka di Masjid Raya Puri Teluk Jambe, Sirnabaya, Telukjambe Timur, Karawang, Jawa Barat 41361. Informasi detail mengenai peta lokasi juga dapat Anda lihat pada bagian footer website kami.',
  },
  {
    question: 'Bagaimana cara menghubungi SIMAK?',
    answer:
      "Anda dapat menghubungi kami dengan cara menekan tombol 'Konsultasi' yang tersedia di website untuk langsung terhubung dengan salah satu anggota tim SIMAK.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 bg-slate-50 md:py-24">
      <div className="mx-auto w-[95%] md:w-[98%] max-w-3xl">
        <header className="mb-12 text-center">
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
            <motion.div
              variants={motionFrames.fadeInvariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800  font-semibold mb-3"
            >
              <IconQuestion
                className="w-4 h-4 text-[15px] text-sea-green-700"
                data-icon="help_outline"
              />
              <span>Tanya Jawab</span>
            </motion.div>
            <motion.h2
              variants={motionFrames.innerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-3 text-2xl font-bold tracking-tight md:text-4xl text-slate-800"
            >
              Frequently Asked Questions (FAQ)
            </motion.h2>
            <motion.p
              variants={motionFrames.innerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="leading-relaxed text-md text-slate-700/50 md:font-xl"
            >
              Jawaban atas pertanyaan umum seputar program, keanggotaan, dan
              kegiatan Silaturahmi Haji Mandiri Karawang.
            </motion.p>
          </div>
        </header>

        <div className="border-t border-sea-green-100/50">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const elementId = `faq-answer-${index}`;

            return (
              <motion.div
                variants={motionFrames.innerItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                key={index}
                className="border-b border-slate-300/50"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={elementId}
                  onClick={() => handleToggle(index)}
                  className="flex items-center justify-between w-full py-5 text-left rounded-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-500 focus-visible:ring-offset-2"
                >
                  <span className="pr-6 text-base font-normal transition-colors md:text-lg text-sea-green-950 group-hover:text-sea-green-700">
                    {item.question}
                  </span>
                  <span className="transition-transform duration-200 shrink-0 text-sea-green-600 group-hover:text-galliano-500">
                    {isOpen ? (
                      <IconDropdownClose size={20} aria-hidden="true" />
                    ) : (
                      <IconDropdownOpen size={20} aria-hidden="true" />
                    )}
                  </span>
                </button>

                <div
                  id={elementId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-5'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-6 text-sm leading-relaxed text-slate-600 md:text-base md:pr-12">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
