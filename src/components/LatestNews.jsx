import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { newsAPI } from '../services/api';
import Pagination from './Pagination';

import newsImg1 from '../assets/latest_news/Container.png';
import newsImg2 from '../assets/latest_news/Container (1).png';
import newsImg3 from '../assets/latest_news/Container (2).png';

const FALLBACK_NEWS_IMAGES = [newsImg1, newsImg2, newsImg3];

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
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

// Convert any image path coming from the API into a usable src.
// Accepts: full URL (http/https), absolute path (/storage/...), relative path (images/foo.png).
function resolveImageSrc(image, apiBase) {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith('/')) return `${apiBase}${image}`;
  return `${apiBase}/${image}`;
}

function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  try {
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

export default function LatestNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: 3,
    has_next: false,
    has_prev: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/v\d+\/?$/, '') ||
    'http://127.0.0.1:8000';

  // Fetch news from API
  useEffect(() => {
    let cancelled = false;
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await newsAPI.getAll({
          page: currentPage,
          limit: 3,
          status: 'published',
          sort: 'published_at',
          order: 'desc',
        });

        if (cancelled) return;

        if (response?.success) {
          const list = Array.isArray(response.data?.news) ? response.data.news : [];
          setNews(list);
          if (response.data?.pagination) {
            setPagination(response.data.pagination);
          }
        } else {
          setError('فشل في تحميل الأخبار');
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching news:', err);
        setError('حدث خطأ في تحميل الأخبار');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchNews();
    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section
      id="news"
      className="relative bg-white py-24 md:py-32 w-full overflow-hidden select-none"
    >
      <div className="absolute bg-[#c7bcac] blur-[120px] left-[5%] opacity-40 rounded-full w-[300px] h-[300px] md:w-[384px] md:h-[384px] top-[415px] pointer-events-none z-0" />
      <div className="absolute bg-[#fdefde] blur-[100px] right-[5%] opacity-50 rounded-full w-[250px] h-[250px] md:w-[320px] md:h-[320px] top-[412px] pointer-events-none z-0" />
      <div className="absolute bg-[#fdefde] blur-[100px] left-[35%] opacity-50 rounded-full w-[250px] h-[250px] md:w-[320px] md:h-[320px] bottom-[100px] pointer-events-none z-0" />
      <div className="absolute bg-[#fdefde] blur-[100px] right-[30%] opacity-40 rounded-full w-[250px] h-[250px] md:w-[320px] md:h-[320px] top-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
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

        <div className="min-h-[440px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="inline-block w-12 h-12 border-4 border-[#00bc96] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#4a5565] mt-4 font-medium">جاري التحميل...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-red-50 rounded-[10px] border border-red-200"
              >
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 text-sm text-[#00bc96] font-semibold hover:underline"
                >
                  إعادة المحاولة
                </button>
              </motion.div>
            ) : news.length > 0 ? (
              <motion.div
                key={currentPage}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {news.map((item, index) => {
                  const imageSrc =
                    resolveImageSrc(item.image, API_BASE_URL) ||
                    FALLBACK_NEWS_IMAGES[index % FALLBACK_NEWS_IMAGES.length];
                  const dateLabel =
                    formatDate(item.published_at) || formatDate(item.created_at);
                  const viewsLabel =
                    typeof item.views === 'number'
                      ? `${item.views.toLocaleString('ar-EG')} مشاهدة`
                      : null;
                  const authorName = item.author?.name;

                  return (
                    <motion.button
                      type="button"
                      key={item.id}
                      custom={index}
                      variants={cardVariants}
                      onClick={() => navigate(`/news/${item.id}`)}
                      className="flex flex-col w-full max-w-[363px] bg-white rounded-[24px] border border-[#e5e5e6] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-premium hover:-translate-y-2 group relative z-10 text-right cursor-pointer"
                      aria-label={item.title}
                    >
                      <div className="h-[256px] w-full overflow-hidden relative shrink-0">
                        <img
                          src={imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              FALLBACK_NEWS_IMAGES[
                                index % FALLBACK_NEWS_IMAGES.length
                              ];
                          }}
                        />
                        {item.category && (
                          <span className="absolute top-4 right-4 bg-white/95 text-[#0A4D34] text-xs font-bold rounded-full px-3 py-1 shadow-sm">
                            {item.category}
                          </span>
                        )}
                        <div
                          className="absolute inset-0 opacity-60 pointer-events-none"
                          style={{
                            backgroundImage:
                              "linear-gradient(0deg, rgb(0, 43, 18) 0%, rgba(0, 38, 15, 0.93) 7.14%, rgba(0, 33, 12, 0.86) 14.29%, rgba(0, 28, 10, 0.78) 21.43%, rgba(0, 23, 7, 0.71) 28.57%, rgba(0, 19, 5, 0.64) 35.71%, rgba(0, 14, 4, 0.57) 42.86%, rgba(0, 10, 2, 0.5) 50%, rgba(0, 6, 2, 0.43) 57.14%, rgba(0, 4, 1, 0.36) 64.29%, rgba(0, 2, 0, 0.29) 71.43%, rgba(0, 1, 0, 0.22) 78.57%, rgba(0, 0, 0, 0.14) 85.71%, rgba(0, 0, 0, 0.07) 92.86%, rgba(0, 0, 0, 0) 100%)",
                          }}
                        />
                      </div>

                      <div className="flex flex-col gap-3 flex-1 pt-6 px-6 pb-6 border-t border-[#e5e5e6] rounded-b-[32px] bg-white">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#99a1af] font-sans">
                          {dateLabel && <span>{dateLabel}</span>}
                          {viewsLabel && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-[#cfd2d8]" />
                              <span>{viewsLabel}</span>
                            </>
                          )}
                          {authorName && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-[#cfd2d8]" />
                              <span>{authorName}</span>
                            </>
                          )}
                        </div>

                        <h3 className="font-sans font-bold text-xl lg:text-[22px] text-[#252527] leading-[30px] line-clamp-2 transition-colors duration-300 group-hover:text-[#00bc9c]">
                          {item.title}
                        </h3>

                        {item.excerpt && (
                          <p className="font-sans font-normal text-sm lg:text-[15px] text-[#626467] leading-[24px] line-clamp-2 text-right">
                            {item.excerpt}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(item.tags) &&
                              item.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-[#f3f4f6] text-[#526A5E] text-[11px] font-medium rounded-full px-2.5 py-1"
                                >
                                  #{tag}
                                </span>
                              ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-[#00bc9c] font-bold text-sm font-sans group-hover:gap-2 transition-all">
                            اقرأ المزيد
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="rotate-180"
                            >
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-gray-50 rounded-[10px] border border-dashed border-[#e5e5e6]"
              >
                <p className="text-[#99a1af] font-medium">لا توجد أخبار متاحة حالياً</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!loading && !error && pagination.total_pages > 1 && (
          <div className="mt-16 relative z-10">
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              hasPrev={pagination.has_prev}
              hasNext={pagination.has_next}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
