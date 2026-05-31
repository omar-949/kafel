import { motion } from 'framer-motion';
import heroHomeImg from '../assets/hero/home.png';
import heroBriefcase from '../assets/hero/💼.png';
import heroTarget from '../assets/hero/🎯.png';
import heroSparkles from '../assets/hero/✨.png';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="relative w-full bg-primary-green-dark overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Full-width Cityscape Backdrop Image — absolute + animated zoom-in */}
      <motion.img
        src={heroHomeImg}
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        alt="Kafel Riyadh Cityscape Backdrop"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Subtle dark layout overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-green-dark/30 via-transparent to-primary-green-dark/75 z-0"></div>

      {/* Layout container for text overlay (relative on mobile to stretch outer section, absolute on desktop) */}
      <div className="relative lg:absolute inset-0 z-20 flex flex-col pt-[120px] lg:pt-[140px] justify-center pb-12 lg:pb-20">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 items-center w-full">

          {/* Right column text content (renders first/right in RTL order) with Framer Motion staggered animations */}
          <motion.div
            className="flex flex-col gap-7 text-right max-w-[620px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black text-white leading-[1.3]"
              variants={itemVariants}
            >
              خلف كل راحة... كافل يهتم بالتفاصيل
            </motion.h1>

            <motion.p
              className="text-lg text-white/85 leading-relaxed"
              variants={itemVariants}
            >
              نوفر لك خدمات الموارد البشرية والعمالة المدربة بسهولة وسرعة، لتجربة خالية من التعقيد.
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap"
              variants={itemVariants}
            >
              <a href="#contact" className="px-8 py-3.5 text-base font-bold rounded-xl bg-accent-gold text-primary-green-dark shadow-[0_4px_14px_rgba(231,184,58,0.25)] hover:bg-accent-gold-light hover:shadow-[0_6px_20px_rgba(231,184,58,0.4)] hover:-translate-y-0.5 transition-all duration-300">اطلب الخدمة الآن</a>
              <a href="#services" className="px-8 py-3.5 text-base font-bold rounded-xl border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-green hover:-translate-y-0.5 transition-all duration-300">استكشف الخدمات</a>
            </motion.div>

            <motion.div
              className="flex gap-4 mt-6 flex-wrap"
              variants={itemVariants}
            >
              <div className="bg-white/8 border border-white/15 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 flex-1 min-w-[130px] transition-all duration-300 hover:bg-accent-gold/12 hover:border-accent-gold hover:-translate-y-1">
                <img src={heroSparkles} alt="Sparkles Icon" className="w-8 h-8 object-contain shrink-0" />
                <span className="text-[1rem] font-bold text-white">خدمة سريعة</span>
              </div>
              <div className="bg-white/8 border border-white/15 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 flex-1 min-w-[130px] transition-all duration-300 hover:bg-accent-gold/12 hover:border-accent-gold hover:-translate-y-1">
                <img src={heroTarget} alt="Target Icon" className="w-8 h-8 object-contain shrink-0" />
                <span className="text-[1rem] font-bold text-white">عمالة مدربة</span>
              </div>
              <div className="bg-white/8 border border-white/15 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 flex-1 min-w-[130px] transition-all duration-300 hover:bg-accent-gold/12 hover:border-accent-gold hover:-translate-y-1">
                <img src={heroBriefcase} alt="Briefcase Icon" className="w-8 h-8 object-contain shrink-0" />
                <span className="text-[1rem] font-bold text-white">حلول متكاملة</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Left column empty side */}
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
}
