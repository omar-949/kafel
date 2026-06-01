import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import logoMain from '../assets/navbar/logo1.svg';
import logoBadge from '../assets/navbar/logo2.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const useSolidStyle = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track active section based on scroll position
  useEffect(() => {
    if (!isHomePage) return;

    const sections = [
      { id: 'about', element: null },
      { id: 'services', element: null },
      { id: 'why-kafel', element: null },
      { id: 'cvs', element: null },
      { id: 'news', element: null },
      { id: 'contact', element: null },
    ];

    // Get all section elements
    sections.forEach(section => {
      section.element = document.getElementById(section.id);
    });

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check if we're at the top of the page
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHomePage]);

  const navLinks = [
    { 
      href: isHomePage ? '#' : '/', 
      label: 'الرئيسية', 
      section: '',
      active: location.pathname === '/' && activeSection === '' 
    },
    { 
      href: isHomePage ? '#about' : '/#about', 
      label: 'من نحن',
      section: 'about',
      active: activeSection === 'about'
    },
    { 
      href: isHomePage ? '#services' : '/#services', 
      label: 'خدماتنا',
      section: 'services',
      active: activeSection === 'services'
    },
    { 
      href: isHomePage ? '#why-kafel' : '/#why-kafel', 
      label: 'لماذا كافل ؟',
      section: 'why-kafel',
      active: activeSection === 'why-kafel'
    },
    { 
      href: isHomePage ? '#cvs' : '/#cvs', 
      label: 'السير الذاتية',
      section: 'cvs',
      active: activeSection === 'cvs'
    },
    { 
      href: isHomePage ? '#news' : '/#news', 
      label: 'آخر الأخبار',
      section: 'news',
      active: activeSection === 'news'
    },
    { 
      href: isHomePage ? '#contact' : '/#contact', 
      label: 'تواصل معنا',
      section: 'contact',
      active: activeSection === 'contact'
    },
  ];

  return (
    <>
      <motion.header
        className={`
          left-0 right-0 z-50 transition-all duration-300
          ${useSolidStyle
            ? 'fixed top-0 bg-[#093219] backdrop-blur-md shadow-lg border-b border-white/10 py-1'
            : 'absolute top-0 pt-4 sm:pt-6 bg-transparent'
          }
        `}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`
              flex items-center justify-between px-4 sm:px-8 transition-all duration-300 relative
              ${useSolidStyle
                ? 'h-[68px] bg-transparent border-none shadow-none'
                : 'backdrop-blur-md rounded-2xl border border-white/12 h-[72px] sm:h-[85px] shadow-lg'
              }
            `}
            style={!useSolidStyle ? {
              background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)',
            } : {}}
          >
            {/* RIGHT: Logo */}
            <motion.a
              href="/"
              className="flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src={logoMain} alt="Kafel Logo" className="h-9 sm:h-12 w-auto" />
            </motion.a>

            {/* CENTER: Nav links — desktop only */}
            <nav className="hidden lg:block">
              <motion.ul
                className="flex items-center gap-7 list-none"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
                }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    className="relative group"
                    variants={{
                      hidden: { opacity: 0, y: -12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                    }}
                  >
                    <a
                      href={link.href}
                      className={`
                        text-sm font-semibold py-2 block relative transition-colors duration-300
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent-gold after:transition-all after:duration-300
                        ${link.active
                          ? 'text-accent-gold after:w-full'
                          : 'text-white/90 hover:text-accent-gold after:w-0 group-hover:after:w-full'
                        }
                      `}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* LEFT: CTA + Vision badge + hamburger */}
            <motion.div
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {/* CTA Button */}
              <a
                href={isHomePage ? '#contact' : '/#contact'}
                className="inline-flex items-center justify-center bg-accent-gold text-primary-green-dark px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(231,184,58,0.25)] hover:bg-accent-gold-light hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                <span className="hidden sm:inline">اطلب الخدمة الآن</span>
                <span className="sm:hidden">اطلب الآن</span>
              </a>

              {/* Vision 2030 badge — hidden on small screens */}
              <div className="hidden sm:flex items-center">
                <img src={logoBadge} alt="Vision 2030 Logo" className="h-12 w-auto" />
              </div>

              {/* Hamburger — mobile only, below lg */}
              <button
                className="flex lg:hidden flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-1 w-8 h-8"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Dropdown Menu ── separate from header so it doesn't affect layout */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-[69px] left-0 right-0 z-40 bg-[#093219] border-b-2 border-accent-gold shadow-2xl lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <ul className="flex flex-col list-none px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      block w-full text-right py-3 px-4 rounded-xl text-base font-semibold transition-all duration-200
                      ${link.active
                        ? 'text-accent-gold bg-white/5'
                        : 'text-white/85 hover:text-accent-gold hover:bg-white/5'
                      }
                    `}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
