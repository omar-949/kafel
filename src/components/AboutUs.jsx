import { motion } from 'framer-motion';
import aboutUsImg from '../assets/aboutus/aboutus.png';

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-bg-cream overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* RIGHT COLUMN: Text content (renders first/right in RTL order) */}
        <motion.div
          className="flex flex-col gap-8 text-right lg:order-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <span className="text-3xl font-bold text-primary-green block mb-2">من نحن</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-green leading-snug">
              في كافل... نعيد تعريف <br className="hidden sm:inline" />
              حلول الموارد البشرية
            </h2>
          </div>

          <ul className="flex flex-col gap-6 list-none text-text-muted leading-relaxed text-base">
            <li className="flex items-start gap-4">
              <span className="w-2 h-2 bg-primary-green mt-2.5 flex-shrink-0"></span>
              <p>
                كافل هي شركة متخصصة في تقديم حلول متكاملة في مجال الموارد البشرية، نسعى لتسهيل حياة عملائنا من خلال توفير خدمات موثوقة ومبتكرة تلبي احتياجاتهم بكل احترافية.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-2 h-2 bg-primary-green mt-2.5 flex-shrink-0"></span>
              <p>
                نؤمن بأن النجاح يبدأ من الأشخاص، لذلك نحرص على توفير أفضل الكفاءات البشرية المدربة والمؤهلة لخدمة عملائنا في مختلف القطاعات.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-2 h-2 bg-primary-green mt-2.5 flex-shrink-0"></span>
              <p>
                من خلال خبرتنا الواسعة وفريقنا المتخصص، نقدم تجربة سلسة ومتميزة تجمع بين الجودة والسرعة والاحترافية.
              </p>
            </li>
          </ul>
        </motion.div>

        {/* LEFT COLUMN: Riyadh cityscape image (renders second/left in RTL order) */}
        <motion.div
          className="relative lg:order-2 flex justify-center lg:justify-start"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative z-10 w-full">
            <img
              src={aboutUsImg}
              alt="Kafel Riyadh Skyline"
              className="rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/10 transition-all duration-300 hover:scale-[1.01] w-full block"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
