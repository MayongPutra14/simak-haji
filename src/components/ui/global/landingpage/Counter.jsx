import { useEffect, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from 'motion/react';

const Counter = ({ from = 0, to, duration = 2, delay = 0.3 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);

  // Sensor untuk mendeteksi saat angka masuk ke layar
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      // Jalankan animasi angka membilang setelah delay singkat (menunggu kontainer selesai naik)
      const controls = animate(count, to, {
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, count, to, duration, delay]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default Counter;
