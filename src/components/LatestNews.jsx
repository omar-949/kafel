import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import newsImg1 from '../assets/latest_news/Container.png';
import newsImg2 from '../assets/latest_news/Container (1).png';
import newsImg3 from '../assets/latest_news/Container (2).png';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: i * 0.1,
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

export default function LatestNews() {
  const [currentPage, setCurrentPage] = useState(1);

  // 5 pages of realistic premium news articles for Kafel Platform
  const allNews = {
    1: [
      {
        id: 1,
        image: newsImg1,
        title: 'إطلاق خدمة جديدة',
        excerpt: 'نعلن عن إطلاق خدمات التوظيف الفوري في جميع المدن',
      },
      {
        id: 2,
        image: newsImg2,
        title: 'تحسين تجربة العملاء',
        excerpt: 'تحديثات جديدة على المنصة لتجربة أسهل وأسرع',
      },
      {
        id: 3,
        image: newsImg3,
        title: 'شراكة جديدة',
        excerpt: 'شراكة استراتيجية مع أكبر الشركات في المملكة',
      }
    ],
    2: [
      {
        id: 4,
        image: newsImg2,
        title: 'واجهة مطورة بالكامل',
        excerpt: 'تصميم عصري وجذاب لتسهيل تصفح واختيار السير الذاتية',
      },
      {
        id: 5,
        image: newsImg3,
        title: 'مذكرة تفاهم جديدة',
        excerpt: 'اتفاقية تعاون استراتيجي لتوسيع نطاق التوظيف التقني',
      },
      {
        id: 6,
        image: newsImg1,
        title: 'ورش عمل تفاعلية',
        excerpt: 'برامج تدريبية متخصصة لتأهيل الشباب لسوق العمل الجديد',
      }
    ],
    3: [
      {
        id: 7,
        image: newsImg3,
        title: 'تطوير خوارزميات الفلترة',
        excerpt: 'تسريع العثور على الكفاءة المناسبة بنسبة تتخطى 50%',
      },
      {
        id: 8,
        image: newsImg1,
        title: 'ملتقى كافل السنوي',
        excerpt: 'مناقشة أحدث توجهات الموارد البشرية والتحول الرقمي',
      },
      {
        id: 9,
        image: newsImg2,
        title: 'باقات توظيف مرنة',
        excerpt: 'حلول ذكية وفعالة من حيث التكلفة للمشاريع الناشئة',
      }
    ],
    4: [
      {
        id: 10,
        image: newsImg1,
        title: 'شراكات مع الجامعات',
        excerpt: 'ربط مباشر للخريجين المتميزين بفرص العمل المتاحة فوراً',
      },
      {
        id: 11,
        image: newsImg2,
        title: 'تكريم الشركاء المتميزين',
        excerpt: 'احتفالية خاصة لتكريم كبرى الشركات الأكثر توظيفاً بالمنصة',
      },
      {
        id: 12,
        image: newsImg3,
        title: 'كافل في مؤتمر Leap',
        excerpt: 'مشاركة مميزة واستعراض لأحدث ابتكارات التوظيف الذكي',
      }
    ],
    5: [
      {
        id: 13,
        image: newsImg2,
        title: 'برنامج العمل الحر',
        excerpt: 'إطلاق مسار متكامل لتأهيل الكوادر الشابة للعمل المستقل',
      },
      {
        id: 14,
        image: newsImg3,
        title: 'تحديثات أمن المعلومات',
        excerpt: 'تطبيق أعلى معايير الحماية والتشفير لبيانات السير الذاتية',
      },
      {
        id: 15,
        image: newsImg1,
        title: 'ريادة الأعمال الرقمية',
        excerpt: 'دليل شامل ومقالات متخصصة لنجاح المشاريع الرقمية الناشئة',
      }
    ]
  };

  const currentNews = allNews[currentPage] || allNews[1];

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section id="news" className="relative bg-white py-24 md:py-32 w-full overflow-hidden select-none">
      {/* Decorative Blur Blobs from Figma design */}
      <div className="absolute bg-[#c7bcac] blur-[120px] left-[5%] opacity-40 rounded-full w-[300px] h-[300px] md:w-[384px] md:h-[384px] top-[415px] pointer-events-none z-0" />
      <div className="absolute bg-[#fdefde] blur-[100px] right-[5%] opacity-50 rounded-full w-[250px] h-[250px] md:w-[320px] md:h-[320px] top-[412px] pointer-events-none z-0" />
      <div className="absolute bg-[#fdefde] blur-[100px] left-[35%] opacity-50 rounded-full w-[250px] h-[250px] md:w-[320px] md:h-[320px] bottom-[100px] pointer-events-none z-0" />
      <div className="absolute bg-[#fdefde] blur-[100px] right-[30%] opacity-40 rounded-full w-[250px] h-[250px] md:w-[320px] md:h-[320px] top-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.h2 
            className="font-sans font-extrabold text-[40px] md:text-[50px] lg:text-[60px] text-[#252527] leading-tight md:leading-[60px] tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            آخر الأخبار
          </motion.h2>
          <motion.p 
            className="font-sans font-normal text-lg md:text-[20px] text-[#626467] leading-normal md:leading-[28px] mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            تابع جديدنا وتحديثاتنا
          </motion.p>
        </div>

        {/* News Cards Grid */}
        <div className="min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {currentNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={cardVariants}
                  className="flex flex-col w-full max-w-[363px] bg-white rounded-[24px] border border-[#e5e5e6] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-premium hover:-translate-y-2 group relative z-10"
                >
                  {/* Top Image Box */}
                  <div className="h-[256px] w-full overflow-hidden relative shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy"
                    />
                    {/* Gradient Overlay matching Figma specifications */}
                    <div 
                      className="absolute inset-0 opacity-60 pointer-events-none" 
                      style={{ 
                        backgroundImage: "linear-gradient(0deg, rgb(0, 43, 18) 0%, rgba(0, 38, 15, 0.93) 7.14%, rgba(0, 33, 12, 0.86) 14.29%, rgba(0, 28, 10, 0.78) 21.43%, rgba(0, 23, 7, 0.71) 28.57%, rgba(0, 19, 5, 0.64) 35.71%, rgba(0, 14, 4, 0.57) 42.86%, rgba(0, 10, 2, 0.5) 50%, rgba(0, 6, 2, 0.43) 57.14%, rgba(0, 4, 1, 0.36) 64.29%, rgba(0, 2, 0, 0.29) 71.43%, rgba(0, 1, 0, 0.22) 78.57%, rgba(0, 0, 0, 0.14) 85.71%, rgba(0, 0, 0, 0.07) 92.86%, rgba(0, 0, 0, 0) 100%)" 
                      }} 
                    />
                  </div>

                  {/* Content Box */}
                  <div className="flex flex-col gap-3 h-[156px] pt-8 px-8 pb-6 border-t border-[#e5e5e6] rounded-b-[32px] justify-between bg-white">
                    <h3 className="font-sans font-bold text-xl lg:text-[24px] text-[#252527] leading-[32px] truncate transition-colors duration-300 group-hover:text-[#00bc9c]">
                      {item.title}
                    </h3>
                    <p className="font-sans font-normal text-sm lg:text-[16px] text-[#626467] leading-[24px] line-clamp-2 text-right">
                      {item.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Premium Pagination conforming to Figma specifications */}
        <div className="flex items-center justify-center gap-3 mt-16 relative z-10" dir="ltr">
          {/* Previous Arrow Button */}
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`w-[24px] h-[24px] rounded-[4px] border border-[#626467] flex items-center justify-center transition-all duration-300 ${
              currentPage === 1 
                ? 'opacity-30 cursor-not-allowed border-[#626467]/30 text-[#626467]/30' 
                : 'cursor-pointer text-[#626467] hover:border-[#00bc9c] hover:text-[#00bc9c]'
            }`}
            aria-label="Previous Page"
          >
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
              <path d="M1.5 4.5H9.5M9.5 4.5L6.5 1.5M9.5 4.5L6.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-[24px] h-[24px] rounded-[4px] font-sans text-[16px] font-medium transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  currentPage === page
                    ? 'border border-[#00bc9c] text-[#00bc9c]'
                    : 'text-[#252527] hover:text-[#00bc9c]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Arrow Button */}
          <button 
            onClick={handleNextPage}
            disabled={currentPage === 5}
            className={`w-[24px] h-[24px] rounded-[4px] border border-[#626467] flex items-center justify-center transition-all duration-300 ${
              currentPage === 5 
                ? 'opacity-30 cursor-not-allowed border-[#626467]/30 text-[#626467]/30' 
                : 'cursor-pointer text-[#626467] hover:border-[#00bc9c] hover:text-[#00bc9c]'
            }`}
            aria-label="Next Page"
          >
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
              <path d="M9.5 4.5H1.5M1.5 4.5L4.5 1.5M1.5 4.5L4.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
