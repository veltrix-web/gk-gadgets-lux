import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

// Honors prefers-reduced-motion: animations become instant/no-op.
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function motionSafe(props: MotionProps): MotionProps {
  if (prefersReduced) {
    const { initial, whileInView, ...rest } = props;
    void initial;
    void whileInView;
    return { ...rest };
  }
  return props;
}

export { motion };
