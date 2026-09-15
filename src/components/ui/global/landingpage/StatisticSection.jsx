import { motion } from 'framer-motion';
import Counter from './Counter';
import * as motionFrames from '../../../../utils/helpers/motion';
import {
  IoPeopleOutline as IconPeople,
  IoTimeOutline as IconTime,
} from 'react-icons/io5';
import { SlPlane as IconPlane } from 'react-icons/sl';
import { GrGroup as IconGroup } from 'react-icons/gr';

const StatisticsSection = () => {
  const statistics = [
    {
      label: 'Total Jamaah',
      value: 1000,
      suffix: '+',
      icon: <IconPeople className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      label: 'Total Keberangkatan',
      value: 5,
      suffix: '',
      icon: <IconPlane className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      label: 'Total Rombongan',
      value: 27,
      suffix: '',
      icon: <IconGroup className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      label: 'Tahun Berkhidmat',
      value: 5,
      suffix: ' Tahun',
      icon: <IconTime className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
  ];

  return (
    <section id="statistik" className="w-full py-16 bg-sea-green-950 sm:py-24">
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        <header className="sr-only">
          <h2>Statistik SIMAK</h2>
          <p>
            Ringkasan skala dan pengalaman komunitas SIMAK dalam mendampingi
            jamaah haji.
          </p>
        </header>

        {/* CONTENT */}
        <motion.ul
          variants={motionFrames.outerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statistics.map((stat, index) => {
            let dividerClasses =
              'flex flex-col items-center justify-center text-center p-8 sm:p-10 lg:p-12 border-white/15 transition-colors duration-300 hover:bg-white/5 ';

            if (index === 0) {
              dividerClasses +=
                'border-b sm:border-r lg:border-b-0 lg:border-r-0';
            } else if (index === 1) {
              dividerClasses += 'border-b lg:border-b-0 lg:border-l';
            } else if (index === 2) {
              dividerClasses +=
                'border-b sm:border-b-0 sm:border-r lg:border-l lg:border-r-0';
            } else if (index === 3) {
              dividerClasses += 'lg:border-l';
            }

            return (
              <motion.li
                key={index}
                variants={motionFrames.innerItemVariants}
                className={dividerClasses}
              >
                <div
                  className="mb-4 text-sea-green-400 sm:mb-5"
                  aria-hidden="true"
                >
                  {stat.icon}
                </div>
                <p className="mb-2 text-xs font-medium tracking-widest uppercase text-sea-green-100 sm:text-sm opacity-90">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {/* 4. Panggil komponen Counter di sini */}
                  <Counter to={stat.value} duration={2.5} delay={0.5} />
                  {stat.suffix}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default StatisticsSection;
