import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Central Calligraphy Logo
import logoCenter from '../assets/sectors_we_serve/logo.png';

// Tab Curved SVGs & Arrow Connectors
import tab5Vector from '../assets/sectors_we_serve/5/vector.svg';
import tab5Arrow from '../assets/sectors_we_serve/5/arrow.svg';

import tab4Vector from '../assets/sectors_we_serve/4/vector.svg';
import tab4Arrow from '../assets/sectors_we_serve/4/arrow.svg';

import tab3Vector from '../assets/sectors_we_serve/3/vector.svg';
import tab3Arrow from '../assets/sectors_we_serve/3/arrow.svg';

import tab2Vector from '../assets/sectors_we_serve/2/vector.svg';
import tab2Arrow from '../assets/sectors_we_serve/2/arrow.png';

import tab1Vector from '../assets/sectors_we_serve/1/vector.svg';
import tab1Arrow from '../assets/sectors_we_serve/1/arrow.svg';

import sahmArrow from '../assets/sectors_we_serve/sahm.svg';

const sectorsData = [
  {
    id: 'hospitality',
    title: 'قطاع الضيافة',
    desc: 'كوادر مدربة لخدمات الضيافة تضمن تجربة مميزة واحترافية في مختلف المنشآت.',
    color: '#E42E37', // Red
    vector: tab5Vector,
    arrow: tab5Arrow,
    arrowStyle: { left: '341.98px', top: '494.58px', width: '117.72px', height: '70.58px' },
    arrowHeadStyle: { left: '334.15px', top: '529.24px', width: '15.03px', height: '15.70px', transform: 'rotate(133deg)' },
    tabStyle: { left: '456.56px', top: '379.48px', width: '156.22px', height: '162.90px' },
    iconStyle: { left: '502.14px', top: '423.28px' },
    cardStyle: { left: '101.99px', top: '373.28px', width: '280px', height: '143px', textAlign: 'right' },
    icon: (
      /* Hospitality / Hotel icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 'industrial',
    title: 'القطاع الصناعي',
    desc: 'تأمين عمالة فنية وتشغيلية تدعم العمليات الصناعية وترفع من كفاءة الإنتاج.',
    color: '#F95428', // Orange
    vector: tab4Vector,
    arrow: tab4Arrow,
    arrowStyle: { left: '441.72px', top: '624.90px', width: '101.43px', height: '55.00px' },
    arrowHeadStyle: { left: '433.12px', top: '679.94px', width: '17.44px', height: '13.41px', transform: 'rotate(0deg)' },
    tabStyle: { left: '535.26px', top: '498.24px', width: '172.13px', height: '169.76px' },
    iconStyle: { left: '598.76px', top: '544.72px' },
    cardStyle: { left: '176.45px', top: '701.26px', width: '274px', height: '143px', textAlign: 'right' },
    icon: (
      /* Industrial / Factory icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" />
        <path d="M5 17V8l5 4V8l5 4V8l5 4v5H5z" />
      </svg>
    )
  },
  {
    id: 'medical',
    title: 'القطاع الطبي',
    desc: 'توفير كوادر صحية مدربة لدعم المنشآت الطبية وتحقيق أعلى معايير الجودة والرعاية.',
    color: '#743A8C', // Purple
    vector: tab3Vector,
    arrow: tab3Arrow,
    arrowStyle: { left: '762.12px', top: '701.00px', width: '49.67px', height: '69.15px' },
    arrowHeadStyle: { left: '798.09px', top: '764.08px', width: '15.34px', height: '15.21px', transform: 'rotate(0deg)' },
    tabStyle: { left: '696.79px', top: '557.66px', width: '168.54px', height: '138.03px' },
    iconStyle: { left: '752.99px', top: '598.80px' },
    cardStyle: { left: '529.25px', top: '793.44px', width: '303px', height: 'max-content', textAlign: 'center' },
    icon: (
      /* Medical / Stethoscope icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.82 4.82A6 6 0 0 1 12 12a6 6 0 0 1 7.18-7.18" />
        <path d="M12 12v6a3 3 0 0 0 3 3h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="5" r="2" />
      </svg>
    )
  },
  {
    id: 'business',
    title: 'قطاع الأعمال',
    desc: 'حلول متكاملة لدعم الشركات بالكوادر المؤهلة وتحسين كفاءة التشغيل والإنتاجية.',
    color: '#45AAB1', // Teal
    vector: tab2Vector,
    arrow: tab2Arrow,
    arrowStyle: { left: '950.36px', top: '666.61px', width: '107.55px', height: '126.99px' },
    arrowHeadStyle: { left: '1038.99px', top: '785.95px', width: '16.22px', height: '15.05px', transform: 'rotate(-60deg)' },
    tabStyle: { left: '854.57px', top: '498.27px', width: '172.11px', height: '169.77px' },
    iconStyle: { left: '912.55px', top: '555.36px' },
    cardStyle: { left: '1017.28px', top: '763.56px', width: '289px', height: '120px', textAlign: 'right' },
    icon: (
      /* Business / Briefcase icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    id: 'individuals',
    title: 'قطاع الأفراد',
    desc: 'خدمات مرنة لتلبية احتياجات الأفراد من العمالة المنزلية والخدمات اليومية بكفاءة وسهولة.',
    color: '#3E86A9', // Blue
    vector: tab1Vector,
    arrow: tab1Arrow,
    arrowStyle: { left: '1085.62px', top: '467.52px', width: '113.13px', height: '57.32px' },
    arrowHeadStyle: { left: '1185.62px', top: '473.1px', width: '16.35px', height: '14.72px', transform: 'rotate(290deg)' },
    tabStyle: { left: '948.53px', top: '379.48px', width: '156.22px', height: '162.90px' },
    iconStyle: { left: '1002.97px', top: '422.40px' },
    cardStyle: { left: '1169.25px', top: '448.63px', width: '290px', height: '120px', textAlign: 'right' },
    icon: (
      /* Individuals / Person icon */
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }
];

export default function SectorsInfographic() {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement.getBoundingClientRect().width;
        // The desktop container is 1562px wide in Figma
        const newScale = Math.min(parentWidth / 1562, 1);
        setScale(newScale);
      }
    };

    // Add a small delay to ensure page elements are fully laid out
    const timeoutId = setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="sectors" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Section Heading (Visible only on mobile/tablet) */}
        <motion.div
          className="text-center max-w-[600px] mx-auto mb-16 lg:hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-primary-green leading-snug">القطاعات التي نخدمها</h2>
          <p className="text-lg text-text-muted mt-3 font-medium">نغطي جميع القطاعات بخبرة واحترافية</p>
        </motion.div>

        {/* 1. DESKTOP INTERACTIVE INFOGRAPHIC (Shown on large screens) */}
        <div
          className="hidden lg:block w-full overflow-hidden relative"
          style={{ height: `${944 * scale}px`, transition: 'height 0.15s ease-out' }}
        >
          <div
            ref={containerRef}
            className="absolute left-1/2 select-none"
            style={{
              width: '1562px',
              height: '944px',
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              left: '50%',
              marginLeft: '-781px',
              transition: 'transform 0.15s ease-out'
            }}
          >
            {/* Section Heading (Desktop, inside scaled container to maintain perfect spacing) */}
            <div className="absolute left-[491px] top-[60px] w-[579px] h-[60px] text-center">
              <h2 className="text-4xl font-extrabold text-primary-green leading-snug">القطاعات التي نخدمها</h2>
            </div>
            <div className="absolute left-[628px] top-[136px] w-[305px] h-[28px] text-center">
              <p className="text-lg text-text-muted font-medium">نغطي جميع القطاعات بخبرة واحترافية</p>
            </div>

            {/* Outer dotted teal circular border */}
            <div
              className="absolute left-[607px] top-[196px] w-[347px] h-[347px] rounded-full border-2 border-dashed border-[#05b89c]/40 z-20 animate-[spin_60s_linear_infinite]"
            />

            {/* Inner dotted blue circular border */}
            <div
              className="absolute left-[624px] top-[213px] w-[314px] h-[314px] rounded-full border border-dashed border-[#3e86a9]/30 z-20 animate-[spin_40s_linear_reverse_infinite]"
            />

            {/* Central Calligraphy Logo Container */}
            <div
              className="absolute left-[645px] top-[234px] w-[272px] h-[272px] bg-[#063121] rounded-full border-4 border-white shadow-xl flex items-center justify-center z-30 overflow-hidden"
            >
              <img
                src={logoCenter}
                alt="Kafel Calligraphy Emblem logo inside center"
                className="w-[190px] h-[190px] object-contain"
              />
            </div>

            {/* Render the 5 Curved SVGs & Overlapping Interactive Tabs */}
            {sectorsData.map((sector) => {
              const isHovered = hoveredId === sector.id;
              const isAnyHovered = hoveredId !== null;
              return (
                <div
                  key={sector.id}
                  onMouseEnter={() => setHoveredId(sector.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group"
                >
                  {/* 5 Semicircle Color Wedge SVGs */}
                  <div
                    className={`
                      absolute z-10 transition-all duration-500 cursor-pointer origin-center
                      ${isHovered ? 'scale-105 filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.15)]' : 'opacity-95'}
                    `}
                    style={{
                      left: sector.tabStyle.left,
                      top: sector.tabStyle.top,
                      width: sector.tabStyle.width,
                      height: sector.tabStyle.height
                    }}
                  >
                    <img src={sector.vector} alt={sector.title} className="w-full h-auto" />
                  </div>

                  {/* White Icon Badge overlaid on each Tab */}
                  <div
                    className={`
                      absolute z-20 w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-500 cursor-pointer pointer-events-none
                      ${isHovered ? 'scale-110' : ''}
                    `}
                    style={{
                      left: sector.iconStyle.left,
                      top: sector.iconStyle.top
                    }}
                  >
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: sector.color }}>
                      {sector.icon}
                    </div>
                  </div>

                  {/* Connecting Curved Arrow lines */}
                  <div
                    className={`
                      absolute transition-all duration-500 pointer-events-none
                      ${isHovered ? 'opacity-100 scale-[1.02] brightness-90' : 'opacity-35'}
                    `}
                    style={{
                      left: sector.arrowStyle.left,
                      top: sector.arrowStyle.top,
                      width: sector.arrowStyle.width,
                      height: sector.arrowStyle.height
                    }}
                  >
                    <img src={sector.arrow} alt="Connective arrow" className="w-full h-full" />
                  </div>

                  {/* Arrow Heads Overlay at description end */}
                  <div
                    className={`
                      absolute transition-all duration-500 pointer-events-none
                      ${isHovered ? 'opacity-100' : 'opacity-35'}
                    `}
                    style={{
                      left: sector.arrowHeadStyle.left,
                      top: sector.arrowHeadStyle.top,
                      width: sector.arrowHeadStyle.width,
                      height: sector.arrowHeadStyle.height,
                      transform: `${sector.arrowHeadStyle.transform} ${isHovered ? 'scale(1.15)' : 'scale(1)'}`,
                      transformOrigin: 'center center'
                    }}
                  >
                    <img src={sahmArrow} alt="Arrowhead" className="w-full h-full" />
                  </div>

                  {/* Description Callout text block */}
                  <div
                    className={`
                      absolute transition-all duration-500 border border-transparent p-5 rounded-2xl cursor-default
                      ${isHovered
                        ? 'bg-bg-cream-light/35 border-accent-gold/15 shadow-sm scale-[1.02]'
                        : isAnyHovered ? 'opacity-40 scale-[0.98]' : 'opacity-100'
                      }
                    `}
                    style={{
                      left: sector.cardStyle.left,
                      top: sector.cardStyle.top,
                      width: sector.cardStyle.width,
                      height: sector.cardStyle.height,
                      textAlign: sector.cardStyle.textAlign
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-2 transition-colors duration-300"
                      style={{ color: isHovered ? sector.color : '#063121' }}
                    >
                      {sector.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted font-medium">
                      {sector.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. MOBILE RESPONSIVE LAYOUT (Shown on screens < 1024px) */}
        <div className="lg:hidden flex flex-col gap-12 items-center">

          {/* Small Semicircle representation */}
          <div className="relative w-[300px] h-[160px] flex justify-center items-end mt-4">

            {/* Center Logo */}
            <div className="absolute bottom-0 w-[110px] h-[110px] bg-[#063121] rounded-full border-4 border-white shadow-lg flex items-center justify-center z-20">
              <img src={logoCenter} alt="Kafel Calligraphy Center Logo" className="w-[80px] h-[80px]" />
            </div>

            {/* Dotted outline */}
            <div className="absolute bottom-[-10px] w-[130px] h-[130px] rounded-full border-2 border-dashed border-[#05b89c] z-10"></div>
          </div>

          {/* List of Sectors rendered as gorgeous cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {sectorsData.map((sector) => (
              <div
                key={sector.id}
                className="bg-bg-cream-light p-6 rounded-3xl border border-black/5 shadow-sm flex items-start gap-5 text-right transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon badge */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: sector.color }}
                >
                  {sector.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold" style={{ color: sector.color }}>
                    {sector.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {sector.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
