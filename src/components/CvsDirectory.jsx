import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { candidatesAPI, skillsAPI, languagesAPI } from '../services/api';
import Pagination from './Pagination';

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
  { id: 'languages', label: 'اللغات' },
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
function FilterAccordion({
  label,
  options = [],
  selected = [],
  onToggle,
  loading = false,
  searchPlaceholder = 'ابحث...',
  emptyText = 'لا توجد خيارات',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => (o.name || '').toLowerCase().includes(q));
  }, [options, query]);

  const selectedCount = selected.length;

  return (
    <div className="border-b border-[#f3f4f6] last:border-0">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 px-1 text-sm text-[#4a5565] font-medium hover:text-[#1a2b4a] transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex items-center gap-2">
          {label}
          {selectedCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#00bc96] text-white text-[10px] font-bold">
              {selectedCount}
            </span>
          )}
        </span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 px-1 flex flex-col gap-2">
              {options.length > 5 && (
                <div className="relative">
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#99a1af]">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full border border-[#e5e7eb] rounded-[8px] pr-8 pl-2 py-1.5 text-xs text-[#4a5565] placeholder-[#99a1af] focus:outline-none focus:border-[#00bc96] bg-[#f9fafb] transition-colors"
                    dir="rtl"
                  />
                </div>
              )}

              <div className="max-h-[200px] overflow-y-auto flex flex-col gap-1 -mx-1 px-1">
                {loading ? (
                  <div className="flex items-center justify-center py-3">
                    <div className="w-4 h-4 border-2 border-[#00bc96] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : filteredOptions.length === 0 ? (
                  <p className="text-xs text-[#99a1af] py-2 text-center">{emptyText}</p>
                ) : (
                  filteredOptions.map((option) => {
                    const checked = selected.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-[6px] cursor-pointer text-xs transition-colors ${
                          checked
                            ? 'bg-[#f0fdf9] text-[#1a2b4a]'
                            : 'text-[#4a5565] hover:bg-[#f9fafb]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                            checked
                              ? 'bg-[#00bc96] border-[#00bc96]'
                              : 'border-[#d1d5db] bg-white'
                          }`}
                        >
                          {checked && (
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 5L4 7.5L8.5 2.5"
                                stroke="white"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => onToggle(option.id)}
                        />
                        <span className="truncate">{option.name}</span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Build a compact list of page tokens like [1, '...', 4, 5, 6, '...', 12]
// (helper moved to src/components/Pagination.jsx)

export default function CvsDirectory() {
  const [activeCountry, setActiveCountry] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: CARDS_PER_PAGE,
    has_next: false,
    has_prev: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [languagesLoading, setLanguagesLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const navigate = useNavigate();
  const flagsRef = useRef(null);

  // Fetch skills + languages once on mount
  useEffect(() => {
    let cancelled = false;

    const loadFilterOptions = async () => {
      setSkillsLoading(true);
      setLanguagesLoading(true);
      try {
        const [skillsList, languagesList] = await Promise.all([
          skillsAPI.getAllFlat().catch((err) => {
            console.error('Error fetching skills:', err);
            return [];
          }),
          languagesAPI.getAllFlat().catch((err) => {
            console.error('Error fetching languages:', err);
            return [];
          }),
        ]);

        if (cancelled) return;
        setSkills(skillsList);
        setLanguages(languagesList);
      } finally {
        if (!cancelled) {
          setSkillsLoading(false);
          setLanguagesLoading(false);
        }
      }
    };

    loadFilterOptions();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleId = (list, setter) => (id) => {
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSkill = toggleId(selectedSkills, setSelectedSkills);
  const toggleLanguage = toggleId(selectedLanguages, setSelectedLanguages);

  // Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = {
          page: currentPage,
          limit: CARDS_PER_PAGE,
          sort: 'id',
          order: sortOrder,
        };

        // Add country filter if not "ALL"
        if (activeCountry !== 'ALL') {
          params.country = activeCountry;
        }

        // Add search query if exists
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        // Add skill filters
        if (selectedSkills.length > 0) {
          params.skill_id = selectedSkills.join(',');
        }

        // Add language filters
        if (selectedLanguages.length > 0) {
          params.language_id = selectedLanguages.join(',');
        }

        const response = await candidatesAPI.getAll(params);
        
        if (response.success) {
          setCandidates(response.data.candidates);
          setPagination(response.data.pagination);
        } else {
          setError('فشل في تحميل البيانات');
        }
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('حدث خطأ في تحميل السير الذاتية');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [currentPage, activeCountry, sortOrder, searchQuery, selectedSkills, selectedLanguages]);

  // Reset page when filter changes
  useEffect(() => { 
    if (currentPage !== 1) {
      setCurrentPage(1); 
    }
  }, [activeCountry, searchQuery, selectedSkills, selectedLanguages]);

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
              ) : candidates.length > 0 ? (
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
                  {candidates.map((candidate) => (
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
                    onClick={() => {
                      setActiveCountry('ALL');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-sm text-[#00bc96] font-semibold hover:underline"
                  >
                    عرض الكل
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {!loading && !error && pagination.total_pages > 1 && (
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.total_pages}
                onPageChange={setCurrentPage}
                hasPrev={pagination.has_prev}
                hasNext={pagination.has_next}
              />
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
              {filterSections.map(section => {
                if (section.id === 'skills') {
                  return (
                    <FilterAccordion
                      key={section.id}
                      label={section.label}
                      options={skills}
                      selected={selectedSkills}
                      onToggle={toggleSkill}
                      loading={skillsLoading}
                      emptyText="لا توجد مهارات"
                    />
                  );
                }
                if (section.id === 'languages') {
                  return (
                    <FilterAccordion
                      key={section.id}
                      label={section.label}
                      options={languages}
                      selected={selectedLanguages}
                      onToggle={toggleLanguage}
                      loading={languagesLoading}
                      emptyText="لا توجد لغات"
                    />
                  );
                }
                return <FilterAccordion key={section.id} label={section.label} />;
              })}
            </div>

            {/* Search Button */}
            <button 
              onClick={() => {
                setCurrentPage(1);
              }}
              className="w-full bg-[#00bc96] hover:bg-[#00a884] text-white font-bold text-sm py-3 rounded-[10px] flex items-center justify-center gap-2 transition-colors duration-200 mt-1"
            >
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
                {filterSections.map(section => {
                  if (section.id === 'skills') {
                    return (
                      <FilterAccordion
                        key={section.id}
                        label={section.label}
                        options={skills}
                        selected={selectedSkills}
                        onToggle={toggleSkill}
                        loading={skillsLoading}
                        emptyText="لا توجد مهارات"
                      />
                    );
                  }
                  if (section.id === 'languages') {
                    return (
                      <FilterAccordion
                        key={section.id}
                        label={section.label}
                        options={languages}
                        selected={selectedLanguages}
                        onToggle={toggleLanguage}
                        loading={languagesLoading}
                        emptyText="لا توجد لغات"
                      />
                    );
                  }
                  return <FilterAccordion key={section.id} label={section.label} />;
                })}
              </div>

              {/* Search Button */}
              <button
                onClick={() => {
                  setCurrentPage(1);
                  setShowMobileFilters(false);
                }}
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
