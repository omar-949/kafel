import { motion } from 'framer-motion';

const cards = [
  {
    id: 'vision',
    title: 'رؤيتنا',
    text: 'أن نكون الشريك الأول والموثوق في تقديم حلول الموارد البشرية في المملكة.',
    icon: (
      /* Target / bullseye icon */
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" strokeWidth="2">
        <circle cx="24" cy="24" r="20" stroke="currentColor" />
        <circle cx="24" cy="24" r="13" stroke="currentColor" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" />
        <line x1="24" y1="4" x2="24" y2="10" stroke="currentColor" strokeLinecap="round" />
        <line x1="24" y1="38" x2="24" y2="44" stroke="currentColor" strokeLinecap="round" />
        <line x1="4" y1="24" x2="10" y2="24" stroke="currentColor" strokeLinecap="round" />
        <line x1="38" y1="24" x2="44" y2="24" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'mission',
    title: 'رسالتنا',
    text: 'تمكين عملائنا من تحقيق النجاح من خلال توفير كفاءات بشرية متميزة وخدمات احترافية متكاملة.',
    icon: (
      /* Lightbulb icon */
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" strokeWidth="2">
        <path
          d="M24 6C16.268 6 10 12.268 10 20c0 5.523 3.133 10.317 7.75 12.8V36a2 2 0 002 2h8.5a2 2 0 002-2v-3.2C34.867 30.317 38 25.523 38 20 38 12.268 31.732 6 24 6z"
          stroke="currentColor"
        />
        <path d="M19 42h10" stroke="currentColor" strokeLinecap="round" />
        <path d="M21 38h6" stroke="currentColor" strokeLinecap="round" />
        <path d="M24 6V2" stroke="currentColor" strokeLinecap="round" />
        <path d="M6 20H2M46 20h-4" stroke="currentColor" strokeLinecap="round" />
        <path d="M9.757 9.757 7 7M40.243 9.757 43 7" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } },
};

export default function VisionMission() {
  return (
    <section className="py-24 bg-primary-green overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Two cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '80px' }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="
                group gap-5
                bg-white/5 border border-white/10 backdrop-blur-sm
                rounded-2xl px-10 py-5
                hover:bg-white/10 hover:border-accent-gold/40
                hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                transition-all duration-400 cursor-default
              "
            >
              {/* Icon badge */}
              <div className="
                w-16 h-16 rounded-2xl flex items-center justify-center
                border border-white/15 text-accent-gold text-primary-green  bg-bg-cream
                group-hover:bg-accent-gold group-hover:text-primary-green-dark
                transition-all duration-300 mb-2
              ">
                {card.icon}
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">
                {card.title}
              </h3>

              <p className="text-white/75 leading-relaxed text-base max-w-[300px]">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
