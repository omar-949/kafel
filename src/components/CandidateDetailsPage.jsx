import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { allCandidates } from './candidatesData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Mock expanded database for all candidates, falling back to dynamic generation
const getExpandedCandidateDetails = (candidate) => {
  const baseDetails = {
    fullName: candidate.name,
    passportNo: `A${Math.floor(1000000 + Math.random() * 9000000)}`,
    birthDate: '1995/03/15',
    birthPlace: `${candidate.country === 'إندونيسيا' ? 'جاكرتا' : candidate.country === 'كينيا' ? 'نيروبي' : 'أديس أبابا'}، ${candidate.country}`,
    height: '165 سم',
    weight: '58 كجم',
    skinColor: candidate.country === 'إثيوبيا' ? 'سمراء فاتحة' : 'سمراء',
    religion: candidate.religion,
    maritalStatus: 'عزباء',
    children: 'لا يوجد',
    languages: candidate.country === 'إندونيسيا' ? 'الإندونيسية، العربية (مبتدئ)' : 'الإنجليزية، السواحلية',
    skills: [
      'الطبخ العربي (متوسط)',
      'الخياطة (جيد)',
      'الكي (جيد)',
      'رعاية الأطفال (جيد جداً)',
      'التنظيف (ممتاز)',
      'الطبخ (ممتاز)',
      'استخدام الأجهزة الحديثة (ممتاز)'
    ],
    passportIssueDate: '2023/01/10',
    passportExpiryDate: '2028/01/10',
    passportIssuePlace: candidate.country === 'إندونيسيا' ? 'جاكرتا' : 'نيروبي',
    smoking: 'لا',
    education: 'شهادة ثانوية',
    swimming: 'نعم',
    driving: 'لا',
    elderCare: 'نعم',
    pets: 'لا مانع',
    experiences: [
      {
        profession: 'عاملة منزلية',
        duration: '3 سنوات (2020 - 2023)',
        country: 'السعودية - الرياض',
        description: 'العمل في منزل عائلة مكونة من 5 أفراد. المهام شملت الطبخ والتنظيف ورعاية الأطفال.'
      },
      {
        profession: 'عاملة منزلية',
        duration: 'سنتان (2018 - 2020)',
        country: 'الكويت - مدينة الكويت',
        description: 'العمل في منزل عائلة مكونة من 3 أفراد. التركيز على الطبخ والتنظيف.'
      }
    ]
  };

  // Explicit customized profiles for realism
  if (candidate.id === 2548) {
    return {
      ...baseDetails,
      fullName: 'ماريا سانتوس',
      passportNo: 'A1234567',
      birthDate: '1995/03/15',
      height: '165 سم',
      weight: '58 كجم',
      languages: 'الإندونيسية، العربية (مبتدئ)'
    };
  }

  if (candidate.id === 2547) {
    return {
      ...baseDetails,
      fullName: 'أميليا جونسون',
      passportNo: 'EP928347',
      birthDate: '1998/05/12',
      height: '160 سم',
      weight: '55 كجم',
      skinColor: 'سمراء فاتحة',
      languages: 'الأمهرية، الإنجليزية (متوسط)',
      skills: ['التنظيف (ممتاز)', 'رعاية الأطفال (جيد)', 'الكي (جيد)', 'الطبخ العربي (مبتدئ)'],
      experiences: [
        {
          profession: 'عاملة منزلية',
          duration: '3 سنوات (2021 - 2024)',
          country: 'السعودية - الرياض',
          description: 'العمل في منزل عائلة مكونة من 5 أفراد. شملت المهام التنظيف والترتيب ورعاية الأطفال.'
        }
      ]
    };
  }

  return baseDetails;
};

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const parsedId = parseInt(id, 10);
  const candidate = allCandidates.find(c => c.id === parsedId);
  const cvRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!cvRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const element = cvRef.current;

      // Scroll to top so html2canvas captures correctly, then restore
      const savedScrollY = window.scrollY;
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 120)); // let layout settle

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

      const pdfWidth  = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth  = canvas.width;
      const imgHeight = canvas.height;
      const ratio     = pdfWidth / imgWidth;
      const scaledH   = imgHeight * ratio;

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

  if (!candidate) {
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

  const details = getExpandedCandidateDetails(candidate);

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
              {/* Picture box */}
              <div className="bg-white rounded-[14px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] w-[192px] h-[192px] overflow-hidden border border-white/10 shrink-0">
                <img 
                  src={candidate.avatar} 
                  alt={candidate.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Action buttons (اتصال and مشاركة) */}
              <div className="flex gap-2 w-full">
                {/* Share button */}
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-[10px] w-[48px] h-[40px] flex items-center justify-center cursor-pointer transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Call button */}
                <button className="bg-white hover:bg-gray-50 text-[#1a2b4a] font-sans font-medium text-[16px] rounded-[10px] flex-1 h-[40px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm">
                  <span>اتصال</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Info labels (Name, ID, Country) - order 1 */}
            <div className="flex-1 flex flex-col gap-4 text-center md:text-right order-1 md:order-2 w-full">
              <div>
                <h1 className="font-sans font-bold text-[28px] md:text-[34px] text-white leading-tight">
                  {candidate.name}
                </h1>
                <p className="font-sans font-normal text-base md:text-[18px] text-[#bedbff] mt-1">
                  CV-{candidate.id}
                </p>
              </div>

              {/* Horizontal pill grid */}
              <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
                {/* Nationality */}
                <div className="bg-white/10 backdrop-blur-sm rounded-[10px] py-3 px-4 flex flex-col gap-1 items-center md:items-start text-center md:text-right min-w-[120px]">
                  <span className="font-sans font-normal text-xs text-[#bedbff]">الجنسية</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xl leading-none">{candidate.flag}</span>
                    <span className="font-sans font-bold text-sm text-white">{candidate.country}</span>
                  </div>
                </div>
                {/* Status */}
                <div className="bg-white/10 backdrop-blur-sm rounded-[10px] py-3 px-4 flex flex-col gap-1 items-center md:items-start text-center md:text-right min-w-[120px]">
                  <span className="font-sans font-normal text-xs text-[#bedbff]">الحالة</span>
                  <span className="font-sans font-bold text-sm text-white mt-0.5">{candidate.status}</span>
                </div>
                {/* Experience */}
                <div className="bg-white/10 backdrop-blur-sm rounded-[10px] py-3 px-4 flex flex-col gap-1 items-center md:items-start text-center md:text-right min-w-[120px]">
                  <span className="font-sans font-normal text-xs text-[#bedbff]">سنوات الخبرة</span>
                  <span className="font-sans font-bold text-sm text-white mt-0.5">{candidate.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Content Area */}
          <div className="p-6 md:p-8 flex flex-col gap-8 bg-white">
            
            {/* Grid layout for structured personal and passport details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Box 1: Personal details (البيانات الشخصية) */}
              <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">
                  البيانات الشخصية
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'الاسم الكامل', val: details.fullName },
                    { label: 'الجنسية', val: details.birthPlace.split('،')[1]?.trim() || candidate.country },
                    { label: 'تاريخ الميلاد', val: details.birthDate },
                    { label: 'العمر', val: candidate.age },
                    { label: 'مكان الميلاد', val: details.birthPlace },
                    { label: 'الطول', val: details.height },
                    { label: 'الوزن', val: details.weight },
                    { label: 'لون البشرة', val: details.skinColor },
                    { label: 'الحالة الصحية', val: details.healthStatus || 'ممتازة' },
                    { label: 'اللغات', val: details.languages }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-[#f3f4f6] last:border-0 text-sm">
                      <span className="font-sans font-normal text-[#6a7282]">{item.label}</span>
                      <span className="font-sans font-semibold text-[#364153]">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: Passport, Religion & Marital Details */}
              <div className="flex flex-col gap-8">
                {/* Passport Details (بيانات جواز السفر) */}
                <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                  <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6] flex items-center justify-start gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1a2b4a]">
                      <rect x="3" y="4" width="18" height="16" rx="2"/>
                      <path d="M7 8h10M7 12h10M7 16h6"/>
                    </svg>
                    <span>بيانات جواز السفر</span>
                  </h2>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: 'رقم الجواز', val: details.passportNo },
                      { label: 'تاريخ الإصدار', val: details.passportIssueDate },
                      { label: 'تاريخ الانتهاء', val: details.passportExpiryDate },
                      { label: 'مكان الإصدار', val: details.passportIssuePlace }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-[#f3f4f6] last:border-0 text-sm">
                        <span className="font-sans font-normal text-[#6a7282]">{item.label}</span>
                        <span className="font-sans font-semibold text-[#364153]">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid block for Religion and Marital status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Religion Details */}
                  <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                    <h2 className="font-sans font-bold text-[18px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">الديانة</h2>
                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="font-sans font-normal text-[#6a7282]">الديانة</span>
                      <span className="font-sans font-semibold text-[#364153]">{details.religion}</span>
                    </div>
                  </div>

                  {/* Marital Details */}
                  <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
                    <h2 className="font-sans font-bold text-[18px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">الحالة الاجتماعية</h2>
                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex justify-between items-center py-1">
                        <span className="font-sans font-normal text-[#6a7282]">الحالة</span>
                        <span className="font-sans font-semibold text-[#364153]">{details.maritalStatus}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-t border-[#f3f4f6] pt-2">
                        <span className="font-sans font-normal text-[#6a7282]">عدد الأطفال</span>
                        <span className="font-sans font-semibold text-[#364153]">{details.children}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Section: Skills (المهارات) */}
            <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
              <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">المهارات</h2>
              <div className="flex flex-wrap gap-2.5 mt-1 justify-start">
                {details.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="bg-white border border-[#e5e5e6] text-[#364153] rounded-[10px] px-4 py-2.5 text-sm font-sans font-medium hover:bg-[#f3f4f6] transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Section: Work Experience (الخبرة العملية) */}
            <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
              <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6] flex items-center justify-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1a2b4a]">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span>الخبرة العملية</span>
              </h2>
              <div className="flex flex-col gap-6 mt-1">
                {details.experiences.map((exp, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-r-2 border-[#0A4D34]/30 pr-4 relative">
                    <div className="absolute right-[-6px] top-1.5 w-[10px] h-[10px] rounded-full bg-[#0A4D34]" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-sans font-bold text-[18px] text-[#1a2b4a]">
                          {exp.profession}
                        </span>
                        <span className="font-sans font-normal text-sm text-[#6a7282] bg-white border border-[#e5e5e6] rounded-full px-3 py-1">
                          {exp.duration}
                        </span>
                      </div>
                      <span className="font-sans font-semibold text-sm text-[#0A4D34]">{exp.country}</span>
                      <p className="font-sans font-normal text-sm text-[#626467] leading-relaxed mt-1">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Additional Info (معلومات إضافية) */}
            <div className="bg-[#fcfcfd] rounded-[14px] border border-[#e5e5e6] p-6 flex flex-col gap-4">
              <h2 className="font-sans font-bold text-[20px] text-[#1a2b4a] pb-2 border-b border-[#e5e5e6]">معلومات إضافية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
                {[
                  { label: 'التدخين', val: details.smoking },
                  { label: 'السباحة', val: details.swimming },
                  { label: 'العمل مع كبار السن', val: details.elderCare },
                  { label: 'المؤهل الدراسي', val: details.education },
                  { label: 'قيادة السيارة', val: details.driving },
                  { label: 'الحيوانات الأليفة', val: details.pets }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-[#f3f4f6] last:border-0 md:odd:border-l md:odd:pl-8 text-sm">
                    <span className="font-sans font-normal text-[#6a7282]">{item.label}</span>
                    <span className="font-sans font-semibold text-[#364153]">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* FOOTER ACTIONS PANEL */}
          <div className="border-t border-[#e5e5e6] bg-[#f9fafb] p-6 flex flex-col sm:flex-row gap-4 items-center shrink-0 w-full justify-between">
            {/* Reservation Button */}
            <button 
              className="w-full sm:flex-1 h-[56px] text-white font-sans font-bold text-[18px] bg-[#0A4D34] hover:bg-[#063121] rounded-[12px] shadow-sm hover:shadow-premium transition-all duration-300 transform active:scale-95 cursor-pointer text-center flex items-center justify-center"
              onClick={() => {
                alert(`تم حجز المرشحة ${candidate.name} بنجاح!`);
                navigate('/');
              }}
            >
              حجز المرشحة
            </button>
            
            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full sm:w-[230px] h-[56px] bg-[#1a2b4a] hover:bg-[#253d6a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-bold text-[15px] rounded-[12px] cursor-pointer transition-all duration-300 transform active:scale-95 text-center flex items-center justify-center gap-2.5 shadow-sm"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  <span>جاري الإنشاء...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
