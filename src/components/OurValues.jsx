import { useState } from 'react';
import { motion } from 'framer-motion';

const values = [
  {
    id: 'commitment',
    title: 'الالتزام',
    text: 'نلتزم بتقديم أعلى مستويات الجودة والاحترافية في كل ما نقوم به',
    icon: (
      /* Checkmark inside circle */
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  },
  {
    id: 'visionary',
    title: 'ذوي رؤية',
    text: 'نتطلع دائماً للمستقبل ونبتكر حلولاً تواكب التطورات',
    icon: (
      /* Lightbulb icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .4 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5z" />
      </svg>
    )
  },

  {
    id: 'teamwork',
    title: 'العمل كفريق',
    text: 'نؤمن بقوة التعاون والعمل الجماعي لتحقيق النجاح',
    icon: (
      /* People / team icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    id: 'alignment',
    title: 'المواءمة',
    text: 'نوائم بين احتياجات العملاء وأهداف الأعمال بدقة عالية',
    icon: (
      /* Target bullseye icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  {
    id: 'passion',
    title: 'الشغف',
    text: 'نعمل بشغف وحب لما نقوم به لنقدم الأفضل دائماً',
    icon: (
      /* Heart icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }
];

export default function OurValues() {
  const [activeId, setActiveId] = useState('commitment');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } }
  };

  const firstRow = values.slice(0, 3);
  const secondRow = values.slice(3, 5);

  return (
    <section className="py-24 bg-bg-cream overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Section Heading */}
        <motion.div
          className="text-center max-w-[600px] mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-primary-green leading-snug">قيمنا</h2>
          <p className="text-lg text-text-muted mt-3 font-medium">المبادئ التي نؤمن بها ونعمل من خلالها</p>
        </motion.div>

        {/* Row 1: 3 Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {firstRow.map((card) => {
            const isActive = activeId === card.id;
            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                onMouseEnter={() => setActiveId(card.id)}
                onMouseLeave={() => setActiveId('commitment')}
                className={`
                  relative cursor-default select-none
                  px-8 py-12 rounded-[32px] text-center
                  border border-black/5 transition-all duration-500 ease-out
                  flex flex-col items-center gap-5
                  ${isActive
                    ? 'bg-primary-green text-white shadow-[0_25px_60px_-15px_rgba(10,77,52,0.35)] -translate-y-2 border-transparent'
                    : 'bg-white text-text-dark shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(10,77,52,0.25)]'
                  }
                `}
              >
                {/* Icon Badge */}
                <div className={`
                  w-16 h-16 rounded-[20px] flex items-center justify-center
                  bg-[#05b89c] text-white shadow-md transition-all duration-300
                  ${isActive ? 'scale-105 shadow-[#05b89c]/20' : ''}
                `}>
                  {card.icon}
                </div>

                <h3 className={`
                  text-2xl font-extrabold transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-primary-green-dark'}
                `}>
                  {card.title}
                </h3>

                <p className={`
                  text-[0.95rem] leading-relaxed max-w-[280px] transition-colors duration-300
                  ${isActive ? 'text-white/85' : 'text-text-muted'}
                `}>
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Row 2: 2 Cards centered */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[760px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {secondRow.map((card) => {
            const isActive = activeId === card.id;
            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                onMouseEnter={() => setActiveId(card.id)}
                onMouseLeave={() => setActiveId('commitment')}
                className={`
                  relative cursor-default select-none
                  px-8 py-12 rounded-[32px] text-center
                  border border-black/5 transition-all duration-500 ease-out
                  flex flex-col items-center gap-5
                  ${isActive
                    ? 'bg-primary-green text-white shadow-[0_25px_60px_-15px_rgba(10,77,52,0.35)] -translate-y-2 border-transparent'
                    : 'bg-white text-text-dark shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(10,77,52,0.25)]'
                  }
                `}
              >
                {/* Icon Badge */}
                <div className={`
                  w-16 h-16 rounded-[20px] flex items-center justify-center
                  bg-[#05b89c] text-white shadow-md transition-all duration-300
                  ${isActive ? 'scale-105 shadow-[#05b89c]/20' : ''}
                `}>
                  {card.icon}
                </div>

                <h3 className={`
                  text-2xl font-extrabold transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-primary-green-dark'}
                `}>
                  {card.title}
                </h3>

                <p className={`
                  text-[0.95rem] leading-relaxed max-w-[280px] transition-colors duration-300
                  ${isActive ? 'text-white/85' : 'text-text-muted'}
                `}>
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
