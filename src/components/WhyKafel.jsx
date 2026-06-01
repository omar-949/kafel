import { motion } from 'framer-motion';

/* ── SVG icon paths from Figma ─────────────────────────────────────────── */
const SpeedIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <path d="M6.66667 23.3333C6.35128 23.3344 6.04205 23.246 5.77492 23.0783C5.50779 22.9106 5.29372 22.6706 5.15758 22.3861C5.02144 22.1016 4.96882 21.7843 5.00583 21.4711C5.04284 21.1579 5.16797 20.8616 5.36667 20.6167L21.8667 3.61667C21.9904 3.4738 22.1591 3.37726 22.345 3.34289C22.5308 3.30852 22.7229 3.33835 22.8896 3.42751C23.0562 3.51666 23.1876 3.65983 23.2622 3.83351C23.3368 4.0072 23.3501 4.20108 23.3 4.38333L20.1 14.4167C20.0056 14.6692 19.974 14.9409 20.0077 15.2083C20.0414 15.4758 20.1394 15.7311 20.2935 15.9524C20.4475 16.1736 20.653 16.3542 20.8921 16.4786C21.1313 16.603 21.3971 16.6675 21.6667 16.6667H33.3333C33.6487 16.6656 33.9579 16.754 34.2251 16.9217C34.4922 17.0894 34.7063 17.3294 34.8424 17.6139C34.9786 17.8984 35.0312 18.2157 34.9942 18.5289C34.9572 18.8421 34.832 19.1384 34.6333 19.3833L18.1333 36.3833C18.0096 36.5262 17.8409 36.6227 17.655 36.6571C17.4692 36.6915 17.2771 36.6616 17.1105 36.5725C16.9438 36.4833 16.8124 36.3402 16.7378 36.1665C16.6632 35.9928 16.6499 35.7989 16.7 35.6167L19.9 25.5833C19.9944 25.3308 20.026 25.0591 19.9923 24.7917C19.9586 24.5242 19.8606 24.2689 19.7065 24.0476C19.5525 23.8264 19.347 23.6458 19.1079 23.5214C18.8687 23.397 18.6029 23.3325 18.3333 23.3333H6.66667Z" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <path d="M33.3333 21.6667C33.3333 30 27.5 34.1667 20.5667 36.5833C20.2036 36.7064 19.8092 36.7005 19.45 36.5667C12.5 34.1667 6.66667 30 6.66667 21.6667V10C6.66667 9.55797 6.84226 9.13405 7.15482 8.82149C7.46738 8.50893 7.89131 8.33333 8.33333 8.33333C11.6667 8.33333 15.8333 6.33333 18.7333 3.8C19.0864 3.49833 19.5356 3.33258 20 3.33258C20.4644 3.33258 20.9136 3.49833 21.2667 3.8C24.1833 6.35 28.3333 8.33333 31.6667 8.33333C32.1087 8.33333 32.5326 8.50893 32.8452 8.82149C33.1577 9.13405 33.3333 9.55797 33.3333 10V21.6667Z" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <path d="M5 23.3333H10C10.8841 23.3333 11.7319 23.6845 12.357 24.3096C12.9821 24.9348 13.3333 25.7826 13.3333 26.6667V31.6667C13.3333 32.5507 12.9821 33.3986 12.357 34.0237C11.7319 34.6488 10.8841 35 10 35H8.33333C7.44928 35 6.60143 34.6488 5.97631 34.0237C5.35119 33.3986 5 32.5507 5 31.6667V20C5 16.0218 6.58035 12.2064 9.3934 9.3934C12.2064 6.58035 16.0218 5 20 5C23.9782 5 27.7936 6.58035 30.6066 9.3934C33.4196 12.2064 35 16.0218 35 20V31.6667C35 32.5507 34.6488 33.3986 34.0237 34.0237C33.3986 34.6488 32.5507 35 31.6667 35H30C29.1159 35 28.2681 34.6488 27.643 34.0237C27.0179 33.3986 26.6667 32.5507 26.6667 31.6667V26.6667C26.6667 25.7826 27.0179 24.9348 27.643 24.3096C28.2681 23.6845 29.1159 23.3333 30 23.3333H35" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <path d="M16.5617 25.8333C16.4129 25.2565 16.1122 24.7302 15.691 24.309C15.2698 23.8878 14.7435 23.5871 14.1667 23.4383L3.94167 20.8017C3.76722 20.7522 3.61368 20.6471 3.50435 20.5024C3.39503 20.3577 3.33587 20.1813 3.33587 20C3.33587 19.8187 3.39503 19.6423 3.50435 19.4976C3.61368 19.3529 3.76722 19.2478 3.94167 19.1983L14.1667 16.56C14.7432 16.4113 15.2695 16.111 15.6907 15.6901C16.1119 15.2692 16.4126 14.7431 16.5617 14.1667L19.1983 3.94167C19.2473 3.76653 19.3523 3.61224 19.4972 3.50232C19.6421 3.39241 19.819 3.33292 20.0008 3.33292C20.1827 3.33292 20.3596 3.39241 20.5045 3.50232C20.6494 3.61224 20.7543 3.76653 20.8033 3.94167L23.4383 14.1667C23.5871 14.7435 23.8878 15.2698 24.309 15.691C24.7302 16.1122 25.2565 16.4129 25.8333 16.5617L36.0583 19.1967C36.2342 19.2452 36.3892 19.35 36.4997 19.4951C36.6102 19.6402 36.6701 19.8176 36.6701 20C36.6701 20.1824 36.6102 20.3598 36.4997 20.5049C36.3892 20.65 36.2342 20.7548 36.0583 20.8033L25.8333 23.4383C25.2565 23.5871 24.7302 23.8878 24.309 24.309C23.8878 24.7302 23.5871 25.2565 23.4383 25.8333L20.8017 36.0583C20.7527 36.2335 20.6477 36.3878 20.5028 36.4977C20.3579 36.6076 20.181 36.6671 19.9992 36.6671C19.8173 36.6671 19.6404 36.6076 19.4955 36.4977C19.3506 36.3878 19.2457 36.2335 19.1967 36.0583L16.5617 25.8333Z" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33.3333 5V11.6667" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M36.6667 8.33333H30" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66667 28.3333V31.6667" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.33333 30H5" stroke="white" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Data ──────────────────────────────────────────────────────────────── */
const features = [
  {
    id: 1,
    icon: <SpeedIcon />,
    title: 'سرعة في التنفيذ',
    subtitle: 'استجابة فورية وتنفيذ سريع',
  },
  {
    id: 2,
    icon: <ShieldIcon />,
    title: 'عمالة مدربة',
    subtitle: 'كوادر مؤهلة ومدربة بأعلى المعايير',
  },
  {
    id: 3,
    icon: <HeadphonesIcon />,
    title: 'دعم 24/7',
    subtitle: 'فريق دعم متاح على مدار الساعة',
  },
  {
    id: 4,
    icon: <StarIcon />,
    title: 'تجربة رقمية سهلة',
    subtitle: 'منصة سهلة الاستخدام ومتطورة',
  },
];

/* ── Component ─────────────────────────────────────────────────────────── */
export default function WhyKafel() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 13 },
    },
  };

  return (
    <section
      dir="rtl"
      id='why-kafel'
      style={{ backgroundColor: '#fdefde' }}
      className="w-full py-20 px-4 sm:px-8 md:px-12 lg:px-[80px] flex flex-col items-center gap-8 overflow-hidden"
    >
      {/* ── Heading ──────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col items-center gap-4 w-full max-w-[1514px] text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 6vw, 60px)',
            lineHeight: '1.2',
            color: '#002b12',
            textAlign: 'center',
          }}
        >
          لماذا كافل؟
        </h2>
        <p
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(1rem, 2.5vw, 20px)',
            lineHeight: '28px',
            color: 'rgba(0,43,18,0.6)',
            textAlign: 'center',
          }}
        >
          نقدم لك تجربة فريدة ومميزة
        </p>
      </motion.div>

      {/* ── Cards grid ───────────────────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1280px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={itemVariants}
            className="group relative bg-white rounded-[24px] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
            style={{
              border: '1px solid rgba(0,43,18,0.1)',
              padding: '32px 24px 40px',
              minHeight: '220px',
            }}
          >
            {/* Gradient icon bubble */}
            <div
              className="flex items-center justify-center rounded-full mb-[24px] shrink-0"
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #00BC7D 0%, #00BBa7 100%)',
                boxShadow:
                  '0px 10px 7.5px rgba(0,0,0,0.10), 0px 4px 3px rgba(0,0,0,0.10)',
              }}
            >
              {feature.icon}
            </div>

            {/* Card title */}
            <h3
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2.5vw, 24px)',
                lineHeight: '32px',
                color: '#002b12',
              }}
            >
              {feature.title}
            </h3>

            {/* Card subtitle */}
            <p
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '22px',
                color: 'rgba(0,43,18,0.6)',
                marginTop: '8px',
              }}
            >
              {feature.subtitle}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
