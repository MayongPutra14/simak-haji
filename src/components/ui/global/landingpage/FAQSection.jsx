import { useState } from 'react';
import { motion } from 'motion/react';
import * as motionFrames from '../../../../utils/helpers/motion';
import {
  IconDropdownClose,
  IconDropdownOpen,
  IconQuestion,
} from '../../../../utils/helpers/decorations';

export default function FAQSection({ content }) {
  const { title, description, faq_items } = content;
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-32 bg-slate-50 md:py-40">
      <div className="mx-auto w-[95%] md:w-[98%] max-w-3xl">
        <header className="mb-12 text-center">
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
            {/* EYEBROW */}
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

            {/* TITLE */}
            <motion.h2
              variants={motionFrames.innerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-3 text-2xl font-bold tracking-tight md:text-4xl text-slate-800"
            >
              {title}
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              variants={motionFrames.innerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="leading-relaxed text-md text-slate-700/50 md:font-xl"
            >
              {description}
            </motion.p>
          </div>
        </header>

        <div className="border-t border-sea-green-100/50">
          {faq_items.map((item, index) => {
            const isOpen = openIndex === index;
            const elementId = `faq-answer-${index}`;

            return (
              <motion.div
                variants={motionFrames.innerItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                key={`${item.id}-${index}`}
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
