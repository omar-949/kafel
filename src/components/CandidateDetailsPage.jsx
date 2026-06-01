import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { candidatesAPI } from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FALLBACK_AVATAR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e5e7eb'><path d='M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z'/></svg>";

const formatYearLabel = (label) => {
  if (!label) return '—';
  return String(label);
};

const formatYears = (n) => {
  if (n === null || n === undefined || n === '') return '—';
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  if (num === 1) return 'سنة واحدة';
  if (num === 2) return 'سنتان';
  if (num >= 3 && num <= 10) return `${num} سنوات`;
  return `${num} سنة`;
};

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cvRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch candidate details from API
  useEffect(() => {
    let cancelled = false;
    const fetchCandidate = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await candidatesAPI.getById(id);

        if (cancelled) return;

        if (response?.success && response.data) {
          setCandidate(response.data);
        } else {
          setError('فشل في تحميل البيانات');
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching candidate:', err);
        setError('حدث خطأ في تحميل السيرة الذاتية');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCandidate();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!cvRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const element = cvRef.current;

      const savedScrollY = window.scrollY;
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 120));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      window.scrollTo({ top: savedScrollY, behavior: 'instant' });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const scaledH = imgHeight * ratio;

      let y = 0;
      while (y < scaledH) {
        if (y > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, -y, pdfWidth, scaledH);
        y += pdfHeight;
      }

      const safeName = candidate?.name?.replace(/\s+/g, '_') || 'candidate';
      pdf.save(`CV-${id}-${safeName}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]" dir="rtl">
        <Navbar />
        <div className="flex-1 max-w-[1200px] mx-auto px-6 pt-[86px] pb-24 flex flex-col items-center justify-center text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#00bc96] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#4a5565] mt-4 font-medium">جاري التحميل...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or not found state
  if (error || !candidate) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]" dir="rtl">
        <Navbar />
        <div className="flex-1 max-w-[1200px] mx-auto px-6 pt-[86px] pb-24 flex flex-col items-center justify-center text-center">
          <h2 className="font-sans font-bold text-2xl text-[#252527]">السيرة الذاتية غير موجودة</h2>
          <p className="font-sans text-sm text-[#626467] mt-2 mb-6">عذراً، لم نتمكن من العثور على ملف السيرة الذاتية المطلوب.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-[#0A4D34] hover:bg-[#063121] text-white rounded-[10px] font-sans font-bold transition-all"
          >
            العودة للرئيسية
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const skills = Array.isArray(candidate.skills) ? candidate.skills : [];
  const languages = Array.isArray(candidate.languages) ? candidate.languages : [];
  const avatarSrc = candidate.avatar || FALLBACK_AVATAR;
  const countryDisplay = candidate.country_code || candidate.country || '';

  const personalRows = [
    { label: 'الاسم الكامل', val: candidate.name },
    { label: 'المهنة', val: candidate.profession },
    { label: 'الجنسية', val: countryDisplay || '—' },
    { label: 'العمر', val: candidate.age_years != null ? formatYears(candidate.age_years) : candidate.age || '—' },
    { label: 'سنوات الخبرة', val: formatYears(candidate.experience_years) },
    { label: 'الديانة', val: candidate.religion || '—' },
    { label: 'الحالة الاجتماعية', val: candidate.marital_status || '—' },
    { label: 'المؤهل العلمي', val: candidate.education || '—' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]" dir="rtl">
      {/* Top Navigation Navbar */}
      <Navbar />

      {/* Main Details Body */}
      <main className="flex-1 max-w-[1010px] mx-auto w-full px-4 sm:px-6 pt-[90px] pb-12 flex flex-col gap-6 select-none">

        {/* Back Link Row */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#0A4D34] hover:text-[#063121] font-sans font-bold text-base transition-colors cursor-pointer group"
          >
            <span className="transition-transform group-hover:translate-x-1">→</span>
            <span>العودة للرئيسية</span>
          </Link>
          <span className="font-sans text-sm text-[#626467] bg-gray-100 rounded-full px-4 py-1.5 font-medium border border-black/5">
            تصفح السير الذاتية
          </span>
        </div>

        {/* Standalone Details Wrapper Card matching Figma spec */}
        <motion.div
          ref={cvRef}
          className="bg-white rounded-[24px] shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.05)] border border-[#e5e5e6] w-full overflow-hidden flex flex-col text-right"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* HEADER: Green Gradient Banner */}
          <div
            className="relative px-5 sm:px-8 py-8 md:py-10 shrink-0 w-full flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end justify-between border-b border-[#e5e5e6]"
            style={{ backgroundImage: "linear-gradient(162.817deg, rgb(63, 118, 78) 0%, rgb(9, 50, 25) 100%)" }}
          >
            {/* Left: Portrait picture + connection controls */}
            <div className="flex flex-col gap-4 items-center shrink-0 w-[192px] mx-auto md:mx-0 order-1 md:order-1">
              <div className="bg-white rounded-[14px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] w-[192px] h-[192px] overflow-hidden border border-white/10 shrink-0">
                <img
                  src={avatarSrc}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 w-full">
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-[10px] w-[48px] h-[40px] flex items-center justify-center cursor-pointer transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="bg-white hover:bg-gray-50 text-[#1a2b4a] font-sans font-medium text-[16px] rounded-[10px] flex-1 h-[40px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm">
                  <span>اتصال</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Info labels (Name, ID, Country) */}
            <div className="flex-1 flex flex-col gap-4 text-center md:text-right order-2 md:order-2 w-full">
              <div>
                <h1 className="font-sans font-bold text-[28px] md:text-[34px] text-white leading-tight">
                  {candidate.name}
                </h1>
                <p className="font-sans font-normal text-base md:text-[18px] text-[#bedbff] mt-1">
                  CV-{candidate.id}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-[10px] py-3 px-4 flex flex-col gap-1 items-center md:items-start text-center md:text-right min-w-[120px]">
                  <span className="font-sans font-normal text-xs text-[#bedbff]">الجنسية</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xl leading-none">{candidate.flag || '🌍'}</span>
                    <span className="font-sans font-bold text-sm text-white">{countryDisplay || '—'}</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-[10px] py-3 px-4 flex flex-col gap-1 items-center md:items-start text-center md:text-right min-w-[120px]">
                  <span className="font-sans font-normal text-xs text-[#bedbff]">الحالة</span>
                  <span className="font-sans font-bold text-sm text-white mt-0.5">{candidate.status || '—'}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-[10px] py-3 px-4 flex flex-col gap-1 items-center md:items-start text-center md:text-right min-w-[120px]">
                  <span className="font-sans font-normal text-xs text-[#bedbff]">سنوات الخبرة</span>
                  <span className="font-sans font-bold text-sm text-white mt-0.5">{formatYears(candidate.experience_years)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Content Area */}
          <div className="p-6 md:p-8 flex flex-col gap-8 bg-white">

            {/* الوصف - shown when description exists */}
            {candidate.description && (
              <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-3">
                <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">
                  نبذة عن المرشحة
                </h2>
                <p className="font-sans font-normal text-[15px] text-[#364153] leading-[1.9]">
                  {candidate.description}
                </p>
              </div>
            )}

            {/* البيانات الشخصية */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">
                  البيانات الشخصية
                </h2>
                <div className="flex flex-col gap-1">
                  {personalRows.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2.5 border-b border-[#f3f4f6] last:border-0 text-sm gap-4"
                    >
                      <span className="font-sans font-normal text-[#6a7282] shrink-0">{item.label}</span>
                      <span className="font-sans font-semibold text-[#364153] text-left truncate">
                        {formatYearLabel(item.val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages + Marital/Religion cards */}
              <div className="flex flex-col gap-6">
                <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                  <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">
                    اللغات
                  </h2>
                  {languages.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5 mt-1 justify-start">
                      {languages.map((lang) => (
                        <span
                          key={lang.id ?? lang.name}
                          className="bg-white border border-[#e5e5e6] text-[#364153] rounded-[10px] px-4 py-2.5 text-sm font-sans font-medium hover:bg-[#f3f4f6] transition-all cursor-default"
                        >
                          {lang.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#99a1af] font-sans">لا توجد لغات مسجلة.</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                    <h2 className="font-sans font-bold text-[18px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">الديانة</h2>
                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="font-sans font-normal text-[#6a7282]">الديانة</span>
                      <span className="font-sans font-semibold text-[#364153]">{candidate.religion || '—'}</span>
                    </div>
                  </div>
                  <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                    <h2 className="font-sans font-bold text-[18px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">الحالة الاجتماعية</h2>
                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="font-sans font-normal text-[#6a7282]">الحالة</span>
                      <span className="font-sans font-semibold text-[#364153]">{candidate.marital_status || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* المهارات */}
            <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
              <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">المهارات</h2>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2.5 mt-1 justify-start">
                  {skills.map((skill) => (
                    <span
                      key={skill.id ?? skill.name}
                      className="bg-white border border-[#e5e5e6] text-[#364153] rounded-[10px] px-4 py-2.5 text-sm font-sans font-medium hover:bg-[#f3f4f6] transition-all cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#99a1af] font-sans">لا توجد مهارات مسجلة.</p>
              )}
            </div>

          </div>

          {/* FOOTER ACTIONS PANEL */}
          <div className="border-t border-[#e5e5e6] bg-[#f9fafb] p-6 flex flex-col sm:flex-row gap-4 items-center shrink-0 w-full justify-between">
            <button
              className="w-full sm:flex-1 h-[56px] text-white font-sans font-bold text-[18px] bg-[#0A4D34] hover:bg-[#063121] rounded-[12px] shadow-sm hover:shadow-premium transition-all duration-300 transform active:scale-95 cursor-pointer text-center flex items-center justify-center"
              onClick={() => {
                alert(`تم حجز المرشحة ${candidate.name} بنجاح!`);
                navigate('/');
              }}
            >
              حجز المرشحة
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full sm:w-[230px] h-[56px] bg-[#1a2b4a] hover:bg-[#253d6a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-bold text-[15px] rounded-[12px] cursor-pointer transition-all duration-300 transform active:scale-95 text-center flex items-center justify-center gap-2.5 shadow-sm"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>جاري الإنشاء...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>تحميل PDF</span>
                </>
              )}
            </button>
          </div>

        </motion.div>
      </main>

      {/* Footer Navigation Bar */}
      <Footer />
    </div>
  );
}
