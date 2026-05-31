import { motion } from 'framer-motion';

const servicesList = [
  {
    id: 'esnad',
    title: 'اسناد كافل',
    text: 'حلول متكاملة لتوفير وإدارة القوى العاملة بكفاءة عالية وفق احتياجات منشأتك.',
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
    id: 'digital',
    title: 'الخدمات الالكترونية',
    text: 'منصة رقمية متكاملة تتيح لك إدارة خدماتك وطلباتك بسهولة وسرعة في أي وقت.',
    icon: (
      /* Lightning / digital icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    id: 'elite',
    title: 'خدمات النخبة',
    text: 'نقدم كوادر مختارة بعناية لتقديم خدمات متميزة بجودة عالية وتجربة احترافية.',
    icon: (
      /* Elite files document icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h8l6 6v14c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6H6c-.5 0-1-.2-1.4-.6C4.2 23 4 22.5 4 22z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" strokeWidth="2" />
        <line x1="9" y1="17" x2="13" y2="17" strokeWidth="2" />
      </svg>
    )
  }
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } }
  };

  return (
    <section id="services" className="py-24 bg-bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          className="text-center max-w-[600px] mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-primary-green leading-snug">خدماتنا</h2>
          <p className="text-lg text-text-muted mt-3 font-medium">حلول متكاملة لجميع احتياجاتك</p>
        </motion.div>

        {/* 3 Columns Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="
                group relative bg-white cursor-default select-none
                px-8 py-12 rounded-[32px] text-center
                border border-black/5 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)]
                hover:shadow-[0_25px_60px_-15px_rgba(10,77,52,0.25)]
                hover:-translate-y-2 transition-all duration-500 ease-out
                flex flex-col items-center gap-5
              "
            >
              {/* Icon squircle badge */}
              <div className="
                w-16 h-16 rounded-[20px] flex items-center justify-center
                bg-[#05b89c] text-white shadow-md shadow-[#05b89c]/10
                group-hover:scale-105 transition-all duration-300
              ">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-primary-green-dark transition-colors duration-300 group-hover:text-primary-green">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[0.95rem] leading-relaxed text-text-muted max-w-[280px] min-h-[72px]">
                {service.text}
              </p>

              {/* Link CTA */}
              <div className="mt-2 border-t border-black/5 pt-5 w-full flex justify-center">
                <a 
                  href="#contact" 
                  className="
                    inline-flex items-center gap-1.5 text-primary-green font-extrabold text-base
                    hover:text-accent-gold-dark transition-colors duration-300 group/link
                  "
                >
                  طلب الخدمة
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-[-4px]" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
