import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { allCandidates } from './candidatesData';

const countries = [
  { code: 'ALL', name: 'الكل', flag: '🌍' },
  { code: 'ID', name: 'إندونيسيا', flag: '🇮🇩' },
  { code: 'LK', name: 'سريلانكا', flag: '🇱🇰' },
  { code: 'PH', name: 'الفلبين', flag: '🇵🇭' },
  { code: 'UG', name: 'أوغندا', flag: '🇺🇬' },
  { code: 'KE', name: 'كينيا', flag: '🇰🇪' },
  { code: 'ER', name: 'إريتريا', flag: '🇪🇷' },
  { code: 'BD', name: 'بنغلاديش', flag: '🇧🇩' },
  { code: 'PK', name: 'باكستان', flag: '🇵🇰' },
  { code: 'BI', name: 'بوروندي', flag: '🇧🇮' },
  { code: 'ET', name: 'إثيوبيا', flag: '🇪🇹' },
];

const filterSections = [
  { id: 'skills', label: 'المهارات' },
  { id: 'age', label: 'العمر' },
  { id: 'religion', label: 'الديانة' },
  { id: 'experience', label: 'الخبرة' },
  { id: 'country', label: 'البلد' },
  { id: 'profession', label: 'المهنة' },
  { id: 'cv', label: 'السيرة الذاتية' },
];

const CARDS_PER_PAGE = 6;

// Icons as SVG components
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="2.5" r="1.5" stroke="#99a1af" strokeWidth="1.2" />
    <circle cx="12" cy="13.5" r="1.5" stroke="#99a1af" strokeWidth="1.2" />
    <circle cx="3" cy="8" r="1.5" stroke="#99a1af" strokeWidth="1.2" />
    <line x1="4.3" y1="7.1" x2="10.6" y2="3.4" stroke="#99a1af" strokeWidth="1.2" />
    <line x1="4.3" y1="8.9" x2="10.6" y2="12.6" stroke="#99a1af" strokeWidth="1.2" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M6 2L3 5L6 8" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M4 2L7 5L4 8" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="#99a1af" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="#99a1af" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ListIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="2" height="2" rx="1" fill={active ? '#fff' : '#4a5565'} />
    <rect x="2" y="9" width="2" height="2" rx="1" fill={active ? '#fff' : '#4a5565'} />
    <rect x="2" y="14" width="2" height="2" rx="1" fill={active ? '#fff' : '#4a5565'} />
    <rect x="6" y="4" width="12" height="2" rx="1" fill={active ? '#fff' : '#4a5565'} />
    <rect x="6" y="9" width="12" height="2" rx="1" fill={active ? '#fff' : '#4a5565'} />
    <rect x="6" y="14" width="12" height="2" rx="1" fill={active ? '#fff' : '#4a5565'} />
  </svg>
);

const GridIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="7" height="7" rx="1.5" fill={active ? '#fff' : '#4a5565'} />
    <rect x="11" y="2" width="7" height="7" rx="1.5" fill={active ? '#fff' : '#4a5565'} />
    <rect x="2" y="11" width="7" height="7" rx="1.5" fill={active ? '#fff' : '#4a5565'} />
    <rect x="11" y="11" width="7" height="7" rx="1.5" fill={active ? '#fff' : '#4a5565'} />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 2.5H2.5C2 2.5 1.5 3 1.5 3.5V11.5C1.5 12 2 12.5 2.5 12.5H10.5C11 12.5 11.5 12 11.5 11.5V8.5" stroke="#1a2b4a" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7.5 1.5H12.5V6.5" stroke="#1a2b4a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 1.5L6.5 7.5" stroke="#1a2b4a" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// CV Card Component
function CvCard({ candidate, viewMode, onSelect }) {
  const isAvailable = candidate.status === 'متاحة';

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="bg-white border border-[#e5e5e6] rounded-[10px] overflow-hidden hover:shadow-md hover:border-[#00bc96]/40 transition-all duration-300"
      >
        <div className="flex gap-4 p-4 items-center">
          {/* Image */}
          <div className="bg-[#f3f4f6] rounded-[10px] shrink-0 w-16 h-16 overflow-hidden">
            <img src={candidate.avatar} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-xl">{candidate.flag}</span>
              <span className="text-[#364153] font-medium text-sm">{candidate.country}</span>
            </div>
            <div className="flex gap-6 text-sm">
              <span><span className="font-semibold text-[#1a2b4a]">المهنة:</span> <span className="text-[#4a5565]">{candidate.profession}</span></span>
              <span><span className="font-semibold text-[#1a2b4a]">الخبرة:</span> <span className="text-[#4a5565]">{candidate.experience}</span></span>
              <span><span className="font-semibold text-[#1a2b4a]">العمر:</span> <span className="text-[#4a5565]">{candidate.age}</span></span>
            </div>
          </div>
          {/* Status + Link */}
          <div className="flex items-center gap-4 shrink-0">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${isAvailable ? 'bg-[#dcfce7] text-[#008236]' : 'bg-[#ffedd4] text-[#ca3500]'}`}>
              {candidate.status}
            </span>
            <button
              onClick={onSelect}
              className="text-sm font-medium text-[#1a2b4a] hover:text-[#00bc96] flex items-center gap-1 transition-colors cursor-pointer"
            >
              المزيد <ExternalLinkIcon />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="bg-white border border-[#e5e5e6] rounded-[10px] overflow-hidden pt-6 px-6 pb-0 flex flex-col hover:shadow-md hover:border-[#00bc96]/40 transition-all duration-300"
    >
      <div className="flex gap-4 items-start">
        {/* Photo */}
        <div className="bg-[#f3f4f6] rounded-[10px] shrink-0 w-24 h-24 overflow-hidden">
          <img src={candidate.avatar} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* CV badge + Share */}
          <div className="flex items-start justify-between">
            <div className="bg-[#eff6ff] rounded-[8px] px-3 py-1 inline-flex">
              <span className="text-[#00bc88] font-bold text-sm leading-5">CV-{candidate.id}</span>
            </div>
            <button className="text-[#99a1af] hover:text-[#4a5565] transition-colors p-1" title="مشاركة">
              <ShareIcon />
            </button>
          </div>

          {/* Country */}
          <div className="flex items-center gap-2">
            <span className="text-2xl leading-none">{candidate.flag}</span>
            <span className="text-[#364153] font-medium text-base">{candidate.country}</span>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-[#1a2b4a]">المهنة:</span>
              <span className="text-[#99a1af]">•</span>
              <span className="text-[#4a5565]">{candidate.profession}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-[#1a2b4a]">الديانة:</span>
              <span className="text-[#99a1af]">•</span>
              <span className="text-[#4a5565]">{candidate.religion}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-[#1a2b4a]">الخبرة:</span>
              <span className="text-[#99a1af]">•</span>
              <span className="text-[#4a5565]">{candidate.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-[#1a2b4a]">العمر:</span>
              <span className="text-[#99a1af]">•</span>
              <span className="text-[#4a5565]">{candidate.age}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#f3f4f6] mt-4 py-2 flex items-center justify-between">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isAvailable ? 'bg-[#dcfce7] text-[#008236]' : 'bg-[#ffedd4] text-[#ca3500]'}`}>
          {candidate.status}
        </span>
        <button
          onClick={onSelect}
          className="flex items-center gap-1 text-sm font-medium text-[#1a2b4a] hover:text-[#00bc96] transition-colors cursor-pointer"
        >
          المزيد من التفاصيل
          <ExternalLinkIcon />
        </button>
      </div>
    </motion.div>
  );
}

// Accordion filter item
function FilterAccordion({ label }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#f3f4f6] last:border-0">
      <button
        className="w-full flex items-center justify-between py-3 px-1 text-sm text-[#4a5565] font-medium hover:text-[#1a2b4a] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span>{label}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 px-1 text-xs text-[#99a1af]">خيارات {label}...</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CvsDirectory() {
  const [activeCountry, setActiveCountry] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();
  const flagsRef = useRef(null);

  const filtered = allCandidates.filter(c =>
    (activeCountry === 'ALL' || c.countryCode === activeCountry)
  );

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);

  // Reset page when filter changes
  useEffect(() => { setCurrentPage(1); }, [activeCountry]);

  const scrollFlags = (dir) => {
    if (flagsRef.current) {
      flagsRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <section id="cvs" className="py-25 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Title */}
        <motion.h2
          className="text-center font-bold text-[#00bc96] mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.2', fontFamily: "'Cairo', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          سير ذاتية متعددة
        </motion.h2>

        {/* Country Flags Navigation */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Prev Arrow */}
          <button
            onClick={() => scrollFlags(-1)}
            className="shrink-0 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors border border-[#e5e5e6]"
          >
            <ArrowRightIcon />
          </button>

          {/* Scrollable flags */}
          <div
            ref={flagsRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 min-w-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {countries.map((c) => {
              const isActive = activeCountry === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => setActiveCountry(c.code)}
                  className={`shrink-0 flex flex-col items-center gap-2 p-3 rounded-[10px] w-[90px] transition-all duration-200 border
                    ${isActive
                      ? 'bg-[#f0fdf9] border-[#00bc96] shadow-sm'
                      : 'bg-white border-transparent hover:bg-gray-50 hover:border-[#e5e5e6]'
                    }`}
                >
                  <span className="text-3xl leading-none">{c.flag}</span>
                  <span className={`text-xs font-medium leading-tight text-center ${isActive ? 'text-[#00bc96]' : 'text-[#364153]'}`}>
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => scrollFlags(1)}
            className="shrink-0 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors border border-[#e5e5e6]"
          >
            <ArrowLeftIcon />
          </button>
        </motion.div>

        {/* Main Layout: Cards + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left: Cards Area */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Toolbar */}
            <div className="bg-white border border-[#e5e5e6] rounded-[10px] px-4 h-[60px] flex items-center justify-between">
              {/* Sort */}
              <div className="flex items-center gap-3 text-sm text-[#4a5565]">
                <span>ترتيب حسب:</span>
                <div className="relative">
                  <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    className="appearance-none bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] px-3 py-1.5 pr-7 text-sm text-[#4a5565] cursor-pointer focus:outline-none focus:border-[#00bc96]"
                  >
                    <option value="desc">تنازلي</option>
                    <option value="asc">تصاعدي</option>
                  </select>
                  <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* View Toggle & Mobile Filter Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden w-9 h-9 rounded-[10px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-[#4a5565]"
                  title="البحث المتقدم"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-all duration-200
                    ${viewMode === 'list' ? 'bg-[#00bc96] text-white' : 'hover:bg-gray-100'}`}
                  title="عرض قائمة"
                >
                  <ListIcon active={viewMode === 'list'} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-all duration-200
                    ${viewMode === 'grid' ? 'bg-[#00bc96] text-white' : 'hover:bg-gray-100'}`}
                  title="عرض شبكي"
                >
                  <GridIcon active={viewMode === 'grid'} />
                </button>
              </div>
            </div>

            {/* Cards Grid / List */}
            <AnimatePresence mode="wait">
              {paginated.length > 0 ? (
                <motion.div
                  key={`${activeCountry}-${currentPage}-${viewMode}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
                    : 'flex flex-col gap-3'
                  }
                >
                  {paginated.map((candidate) => (
                    <CvCard
                      key={candidate.id}
                      candidate={candidate}
                      viewMode={viewMode}
                      onSelect={() => navigate('/cv/' + candidate.id)}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-gray-50 rounded-[10px] border border-dashed border-[#e5e5e6]"
                >
                  <p className="text-[#99a1af] font-medium">لا توجد سير ذاتية مطابقة</p>
                  <button
                    onClick={() => setActiveCountry('ALL')}
                    className="mt-3 text-sm text-[#00bc96] font-semibold hover:underline"
                  >
                    عرض الكل
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2 pb-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-[8px] border border-[#e5e5e6] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[#4a5565]"
                >
                  →
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-[8px] border text-sm font-semibold transition-all duration-200
                      ${currentPage === p
                        ? 'bg-[#00bc96] border-[#00bc96] text-white'
                        : 'border-[#e5e5e6] text-[#4a5565] hover:bg-gray-50'
                      }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-[8px] border border-[#e5e5e6] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[#4a5565]"
                >
                  ←
                </button>
              </div>
            )}
          </div>

          {/* Right: Advanced Search Sidebar */}
          <motion.aside
            className="hidden lg:flex w-[260px] shrink-0 bg-white border border-[#e5e5e6] rounded-[12px] p-5 flex-col gap-4 sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Sidebar Title */}
            <h3 className="text-base font-bold text-[#1a2b4a] border-b border-[#f3f4f6] pb-3">
              بحث متقدم
            </h3>

            {/* Search Input */}
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث..."
                className="w-full border border-[#e5e7eb] rounded-[10px] pr-9 pl-3 py-2 text-sm text-[#4a5565] placeholder-[#99a1af] focus:outline-none focus:border-[#00bc96] bg-[#f9fafb] transition-colors"
                dir="rtl"
              />
            </div>

            {/* Filter Accordions */}
            <div className="flex flex-col">
              {filterSections.map(section => (
                <FilterAccordion key={section.id} label={section.label} />
              ))}
            </div>

            {/* Search Button */}
            <button className="w-full bg-[#00bc96] hover:bg-[#00a884] text-white font-bold text-sm py-3 rounded-[10px] flex items-center justify-center gap-2 transition-colors duration-200 mt-1">
              <SearchIcon2 />
              بحث
            </button>
          </motion.aside>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />

            {/* Drawer Content */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 h-full w-[280px] bg-white z-50 p-6 flex flex-col gap-4 shadow-2xl lg:hidden overflow-y-auto"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-3">
                <h3 className="text-base font-bold text-[#1a2b4a]">
                  بحث متقدم
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="ابحث..."
                  className="w-full border border-[#e5e7eb] rounded-[10px] pr-9 pl-3 py-2 text-sm text-[#4a5565] placeholder-[#99a1af] focus:outline-none focus:border-[#00bc96] bg-[#f9fafb] transition-colors"
                />
              </div>

              {/* Filter Accordions */}
              <div className="flex flex-col flex-1">
                {filterSections.map(section => (
                  <FilterAccordion key={section.id} label={section.label} />
                ))}
              </div>

              {/* Search Button */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#00bc96] hover:bg-[#00a884] text-white font-bold text-sm py-3 rounded-[10px] flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <SearchIcon2 />
                تطبيق الفلاتر
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// White search icon for button
function SearchIcon2() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
