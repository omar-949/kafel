import { motion } from 'framer-motion';
import aboutUsImg from '../assets/aboutus/aboutus.png';

export default function VideoShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-green-dark to-primary-green text-white text-center overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-[600px] mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-bold text-accent-gold-light uppercase tracking-wider relative pb-2 inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-[3px] after:bg-accent-gold">شاهد كافل في دقيقة</span>
          <h2 className="text-3xl font-extrabold text-white mt-4">تعرف على كافل والحلول التقنية المبتكرة</h2>
        </motion.div>

        <motion.div 
          className="max-w-[900px] mx-auto relative rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(59,255,172,0.4)] border-4 border-primary-green-light cursor-pointer aspect-video group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        >
          <img src={aboutUsImg} alt="Video Backdrop Landscape" className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-primary-green-dark/65 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-green-dark/50">
            <div className="w-[90px] h-[90px] bg-accent-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all duration-300 text-primary-green-dark group-hover:scale-110 group-hover:bg-white group-hover:text-primary-green group-hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]">
              <svg viewBox="0 0 24 24" className="w-8 h-8 mr-[-4px] fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
