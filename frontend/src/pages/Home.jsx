import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import HowitWorks from '../components/HowitWorks';
import UseCase from '../components/UseCase';
import Testimonial from '../components/Testimonial';
import CallToAction from '../components/CallToAction';
import FAQ from '../components/FAQ';


// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const slideRight = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const zoomIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } }
};

const ZoomOut = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } }
};


const Home = () => {
  return (
    <div className="min-h-screen scroll-smooth space-y-16">

      {/* Animate immediately */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Hero />
      </motion.div>

      {/* Animate on scroll */}
      <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <Feature />
      </motion.div>

      <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <HowitWorks />
      </motion.div>

      <motion.div variants={zoomIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <UseCase />
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <Testimonial />
      </motion.div>

      <motion.div variants={ZoomOut} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <CallToAction />
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <FAQ />
      </motion.div>

    </div>
  );
};


export default Home;