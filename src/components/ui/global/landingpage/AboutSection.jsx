import { motion } from 'motion/react';
import Button from '../Button';
import { openWa } from '../../../../utils/helpers/helpers';
import { CardValue } from '../HelperComponents';
import * as motionFrames from '../../../../utils/helpers/motion';
import {
  IconArrowRight,
  IconQuote,
  IconWhatsapp,
  IconGroup,
  IconHistory,
  IconAwesome,
  IconDeversity,
  IconMenuBook,
  IconSafety,
  IconBalance,
  IconFavorite,
  IconArchive,
} from '../../../../utils/helpers/decorations';

export default function AboutSection({ content }) {
  const { story_blocks, closing_cta } = content;

  const [blockAbout, blockHistory, blockValue] = story_blocks;

  // BLOCK ABOUT
  const {
    title: titleAbout,
    description: descAbout,
    quote: quoteAbout,
    media: mediaAbout,
  } = blockAbout;

  // BLOCK HISTORY
  const {
    title: titleHistory,
    description: descHistory,
    quote: quoteHistory,
    media: mediaHistory,
  } = blockHistory;

  // BLOCK VALUE
  const {
    title: titleValue,
    description: descValue,
    cards: cardsValue,
  } = blockValue;

  return (
    <section className="py-20  md:py-28 bg-slate-50" id="tentang">
      <div className="px-6 mx-auto space-y-24 max-w-7xl md:space-y-32">
        {/*  Row 1 (Introduction): Text Left, Image Right  */}
        <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-xl">
            {/* EYEBROW */}
            <motion.div
              variants={motionFrames.fadeInvariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800   uppercase tracking-wider  font-semibold mb-4"
            >
              <IconGroup className="w-6 h-6" data-icon="groups" />
              <span>Tentang SIMAK</span>
            </motion.div>

            {/* TITLE */}
            <motion.h2
              variants={motionFrames.innerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-[1.15] tracking-tight mb-6"
            >
              {titleAbout}
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.div
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              <p>{descAbout}</p>
            </motion.div>

            {/* QUOTE */}
            <motion.div
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="p-5 mt-6 bg-white border border-l-4 shadow-sm rounded-2xl border-sea-green-100 border-l-sea-green-600"
            >
              <p className="italic leading-relaxed text-sea-green-900">
                "{quoteAbout}"
              </p>
            </motion.div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <div className="relative overflow-hidden bg-white border shadow-lg rounded-2xl border-sea-green-100">
              <motion.img
                src={mediaAbout.image_url}
                alt={mediaAbout.alt}
                variants={motionFrames.imageBlurVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="object-cover object-center w-full h-85 md:h-105"
              />
            </div>
            {/* ARCHIEVE */}
            <motion.div
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-3 flex items-center justify-between text-[12px]  text-sea-green-800 px-2"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <IconArchive
                  className="material-symbols-outlined  md:text-[16px] text-sea-green-600"
                  data-icon="handshake"
                />
                {mediaAbout.caption}
              </span>
            </motion.div>
          </div>
        </div>

        {/*  Row 2 (The Beginning / Awal Perjalanan): Reversed Zig-Zag (Image Left, Narrative Right)  */}
        <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* IMAGE & ARCHIVE */}
          <div className="relative order-2 md:order-1">
            {/* IMAGE */}
            <div className="relative overflow-hidden bg-white border shadow-lg rounded-2xl border-sea-green-100">
              <motion.img
                src={mediaHistory.image_url}
                alt={mediaHistory.alt}
                variants={motionFrames.imageBlurVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="object-cover object-center w-full h-85 md:h-105"
              />
            </div>
            {/* ARCHIVE */}
            <motion.div
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-3 flex items-center justify-between  text-[12px]  text-sea-green-800 px-2"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <IconArchive
                  className="material-symbols-outlined text-[16px] text-sea-green-600"
                  data-icon="verified"
                />
                {mediaHistory.caption}
              </span>
            </motion.div>
          </div>
          {/* TITLE, DESCRIPTION, AND QUOTE */}
          <div className="order-1 max-w-xl md:order-2">
            <motion.div
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-galliano-100 text-galliano-800   uppercase tracking-wider  font-semibold mb-4"
            >
              <IconHistory
                className="w-6 h-6 text-[15px] "
                data-icon="history_edu"
              />
              <span>Awal Perjalanan</span>
            </motion.div>
            <motion.h2
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-[1.15] tracking-tight mb-6"
            >
              {titleHistory}
            </motion.h2>
            <motion.div
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              <p>{descHistory}</p>
            </motion.div>

            <motion.blockquote
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative p-6 mt-6 overflow-hidden text-white shadow-md rounded-2xl bg-sea-green-900"
            >
              <div className="relative z-10 flex items-start gap-3">
                <IconQuote
                  data-icon="format_quote"
                  className="material-symbols-outlined text-[28px] text-galliano-500 shrink-0 mt-0.5"
                />

                <div>
                  <p className="mb-2 font-semibold leading-snug text-white ">
                    “{quoteHistory}”
                  </p>
                </div>
              </div>
            </motion.blockquote>
          </div>
        </div>

        {/*  Row 3 (Our Purpose & Core Values / 4 Key Principles)  */}
        <div>
          {/* TITLE */}
          <div className="max-w-3xl mb-12 text-left">
            <motion.div
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800   uppercase tracking-wider font-semibold mb-3"
            >
              <IconAwesome
                className="w-6 h-6 text-[15px] "
                data-icon="auto_awesome"
              />
              <span>Tujuan &amp; Nilai Dasar</span>
            </motion.div>

            <motion.h2
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-[1.15] tracking-tight mb-6"
            >
              {titleValue}
            </motion.h2>

            <motion.p
              variants={motionFrames.outerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {descValue}
            </motion.p>
          </div>

          {/* PRINCIPLES CARD */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/*  Principle 01  */}
            {cardsValue.map((card, index) => {
              const formattedNumber = String(card.number).padStart(2, '0');

              const iconArray = [
                IconDeversity,
                IconMenuBook,
                IconSafety,
                IconBalance,
              ];

              return (
                <motion.div
                  key={index}
                  variants={motionFrames.slideInVariants}
                  initial="hidden"
                  whileHover={{ y: -4 }}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex flex-col justify-between bg-white border shadow-sm p-7 rounded-2xl border-sea-green-100 hover:shadow-md hover:-translate-y-1"
                >
                  <CardValue
                    number={formattedNumber}
                    title={card.title}
                    description={card.description}
                    badge={card.badge}
                    icon={iconArray[index]}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/*  Final Restrained Community CTA Area  */}
        <motion.div
          variants={motionFrames.blurVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative p-8 overflow-hidden text-white border shadow-xl rounded-3xl bg-sea-green-900 md:p-14 border-sea-green-800"
        >
          <div className="relative z-10 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[12px] text-sea-green-100 border border-white/15   font-semibold mb-5">
              <IconFavorite
                className="w-6 h-6 text-galliano-500"
                data-icon="favorite"
              />

              <span>Undangan Terbuka untuk Calon Tamu Allah</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold leading-tight text-white">
              {closing_cta.title}
            </h3>
            <div className="text-sea-green-200">
              <p>{closing_cta.description}</p>
            </div>
            <div className="flex flex-col items-stretch gap-4 mt-6 sm:flex-row sm:items-center">
              <Button
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sea-green-600 hover:bg-sea-green-500 active:bg-sea-green-700 text-white   shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Daftar Segera
                <IconArrowRight />
              </Button>

              <Button
                onClick={() => openWa(closing_cta.buttons.secondary.link)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/25    transition-all duration-200 hover:-translate-y-0.5"
              >
                Konsultasi Gratis
                <IconWhatsapp data-icon="chat" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
