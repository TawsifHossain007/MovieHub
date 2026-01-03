import React from 'react';
import { motion } from "framer-motion";


const DashboardHome = () => {

      const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    duration: 0.6,
    ease: "easeOut"
  };
    return (
       <motion.div
      className="min-h-screen py-5"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
            I am dashboard Home
          </motion.div>
    );
};

export default DashboardHome;