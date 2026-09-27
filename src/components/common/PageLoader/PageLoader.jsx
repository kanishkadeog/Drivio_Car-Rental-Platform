// car-rental-platform/src/components/common/PageLoader/PageLoader.jsx

import { motion } from "motion/react";
import "../PageLoader/PageLoader.scss";

function PageLoader() {
  return (
    <div className="page-loader">
      <motion.div
        className="page-loader__logo"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span>D</span>
        DRIVIO
      </motion.div>

      <div className="page-loader__line">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Preparing your journey
      </motion.p>
    </div>
  );
}

export default PageLoader;