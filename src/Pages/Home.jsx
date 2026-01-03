import React from 'react';
import { motion } from 'framer-motion';
import Banner from '../Components/Banner/Banner';
import Stats from '../Components/Statistics/Stats';

const Home = () => {

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
            className='bg-base-100 min-h-screen'
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className='flex items-center justify-center mt-5'>
                <Banner />
            </div>
            
            <Stats />
        </motion.div>
    );
};

export default Home;
