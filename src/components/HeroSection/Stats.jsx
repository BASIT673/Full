import { motion } from 'framer-motion';

export const Stats = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.8 }}
    className="flex justify-center gap-16 mt-12 text-black"
  >
    <div className="text-center">
      <h3 className="text-xl font-semibold">50+</h3>
      <p className="text-sm">Countries Covered</p>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold">2K+</h3>
      <p className="text-sm">Happy Travelers</p>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold">200+</h3>
      <p className="text-sm">Tours Offered</p>
    </div>
  </motion.div>
);
