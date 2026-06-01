import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { newsAPI } from '../services/api';

import newsImg1 from '../assets/latest_news/Container.png';
import newsImg2 from '../assets/latest_news/Container (1).png';
import newsImg3 from '../assets/latest_news/Container (2).png';

const FALLBACK_NEWS_IMAGES = [newsImg1, newsImg2, newsImg3];

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

function formatViews(n) {
  if (typeof n !== 'number') return null;
  return `${n.toLocaleString('ar-EG')} مشاهدة`;
}

function StatusBadge({ status }) {
  if (!status) return null;
  const isPublished = status === 'published';
  const label = isPublished ? 'منشور' : 'مسودة';
  const classes = isPublished
    ? 'bg-[#dcfce7] text-[#008236]'
    : 'bg-[#ffedd4] text-[#ca3500]';
  return (
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full ${classes}`}
    >
      {label}
    </span>
  );
}

export default function NewsDetailsPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/v\d+\/?$/, '') ||
    'http://127.0.0.1:8000';

  useEffect(() => {
    let cancelled = false;
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await newsAPI.getById(id);
        if (cancelled) return;
        if (response?.success && response.data) {
          setArticle(response.data);
        } else {
          setError('فشل في تحميل الخبر');
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching news article:', err);
        setError('حدث خطأ في تحميل الخبر');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchArticle();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]" dir="rtl">
        <Navbar />
        <div className="flex-1 max-w-[1200px] mx-auto px-6 pt-[110px] pb-24 flex flex-col items-center justify-center text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#00bc96] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#4a5565] mt-4 font-medium">جاري التحميل...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]" dir="rtl">
        <Navbar />
        <div className="flex-1 max-w-[1200px] mx-auto px-6 pt-[110px] pb-24 flex flex-col items-center justify-center text-center">
          <h2 className="font-sans font-bold text-2xl text-[#252527]">الخبر غير موجود</h2>
          <p className="font-sans text-sm text-[#626467] mt-2 mb-6">
            عذراً، لم نتمكن من العثور على الخبر المطلوب.
          </p>
          <Link
            to="/#news"
            className="px-6 py-3 bg-[#0A4D34] hover:bg-[#063121] text-white rounded-[10px] font-sans font-bold transition-all"
          >
            العودة للأخبار
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imageSrc =
    resolveImageSrc(article.image, API_BASE_URL) || FALLBACK_NEWS_IMAGES[0];
  const dateLabel =
    formatDate(article.published_at) || formatDate(article.created_at);
  const viewsLabel = formatViews(article.views);
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const related = Array.isArray(article.related_news) ? article.related_news : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]" dir="rtl">
      <Navbar />

      <main className="flex-1 max-w-[1010px] mx-auto w-full px-4 sm:px-6 pt-[100px] pb-12 flex flex-col gap-6 select-none">
        <div className="flex justify-between items-center">
          <Link
            to="/#news"
            className="flex items-center gap-2 text-[#0A4D34] hover:text-[#063121] font-sans font-bold text-base transition-colors cursor-pointer group"
          >
            <span className="transition-transform group-hover:translate-x-1">→</span>
            <span>العودة للأخبار</span>
          </Link>
          <span className="font-sans text-sm text-[#626467] bg-gray-100 rounded-full px-4 py-1.5 font-medium border border-black/5">
            تصفح الأخبار
          </span>
        </div>

        <motion.article
          className="bg-white rounded-[24px] shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.05)] border border-[#e5e5e6] w-full overflow-hidden flex flex-col text-right"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden shrink-0 bg-[#f3f4f6]">
            <img
              src={imageSrc}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_NEWS_IMAGES[0];
              }}
            />
            {article.category && (
              <span className="absolute top-5 right-5 bg-white/95 text-[#0A4D34] text-sm font-bold rounded-full px-4 py-1.5 shadow-sm">
                {article.category}
              </span>
            )}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 60%)",
              }}
            />
          </div>

          <div className="p-6 md:p-10 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#626467] font-sans">
              {dateLabel && (
                <span className="inline-flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {dateLabel}
                </span>
              )}
              {article.author?.name && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#cfd2d8]" />
                  <span className="inline-flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {article.author.name}
                  </span>
                </>
              )}
              {viewsLabel && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#cfd2d8]" />
                  <span className="inline-flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {viewsLabel}
                  </span>
                </>
              )}
              <StatusBadge status={article.status} />
            </div>

            <h1 className="font-sans font-extrabold text-[28px] md:text-[36px] text-[#1a2b4a] leading-tight">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="font-sans font-medium text-lg text-[#526A5E] leading-[1.8] border-r-[3px] border-[#00bc96] pr-4">
                {article.excerpt}
              </p>
            )}

            {article.content ? (
              <div
                className="prose prose-lg max-w-none font-sans text-[#364153] leading-[1.9] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-[#00bc96] [&_a]:underline [&_img]:rounded-[12px]"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="text-sm text-[#99a1af] font-sans">لا يوجد محتوى متاح.</p>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#f3f4f6]">
                <span className="font-sans font-bold text-sm text-[#1a2b4a]">الوسوم:</span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f3f4f6] text-[#526A5E] text-sm font-medium rounded-full px-3 py-1 hover:bg-[#00bc96]/10 hover:text-[#0A4D34] transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[#e5e5e6] bg-[#f9fafb] px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[#626467] font-sans">
            <span>تم النشر في: {formatDate(article.published_at) || '—'}</span>
            <span>آخر تحديث: {formatDate(article.updated_at) || '—'}</span>
          </div>
        </motion.article>

        {related.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="font-sans font-extrabold text-2xl text-[#1a2b4a]">
              أخبار ذات صلة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((item) => {
                const relatedImage =
                  resolveImageSrc(item.image, API_BASE_URL) ||
                  FALLBACK_NEWS_IMAGES[0];
                return (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="group bg-white border border-[#e5e5e6] rounded-[16px] overflow-hidden flex gap-4 p-4 hover:shadow-md hover:border-[#00bc96]/40 transition-all"
                  >
                    <div className="w-24 h-24 rounded-[12px] overflow-hidden shrink-0 bg-[#f3f4f6]">
                      <img
                        src={relatedImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="font-sans font-bold text-base text-[#1a2b4a] line-clamp-2 group-hover:text-[#00bc96] transition-colors">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-sm text-[#626467] line-clamp-2 font-sans">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
