import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSettings } from '../services/api';

import appStoreBadge from '../assets/footer/Download - Component.png';
import googlePlayBadge from '../assets/footer/Download - Component (1).png';
import footerLogo from '../assets/logo.png';
import trustBadge1 from '../assets/footer/385f8df5a97ef6172e5d77a8d34e93e3b2a7c8f8.png';
import trustBadge2 from '../assets/footer/66b2ff9d31893e0555e855b3b291bcae5284c338.png';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]" aria-hidden="true">
    <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.16 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.77 8.44-4.93 8.44-9.93z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.97 6.817H1.673l7.73-8.835L1.254 2.25h6.832l4.713 6.231 5.445-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const PLATFORM_META = {
  facebook: { label: 'Facebook', Icon: FacebookIcon, match: /(facebook\.com|fb\.com|fb\.me)/i },
  twitter: { label: 'Twitter / X', Icon: TwitterIcon, match: /(twitter\.com|x\.com)/i },
  x: { label: 'Twitter / X', Icon: TwitterIcon, match: /(twitter\.com|x\.com)/i },
  instagram: { label: 'Instagram', Icon: InstagramIcon, match: /instagram\.com/i },
  linkedin: { label: 'LinkedIn', Icon: LinkedInIcon, match: /linkedin\.com/i },
  tiktok: { label: 'TikTok', Icon: TwitterIcon, match: /tiktok\.com/i },
  snapchat: { label: 'Snapchat', Icon: TwitterIcon, match: /snapchat\.com/i },
  whatsapp: { label: 'WhatsApp', Icon: TwitterIcon, match: /(whatsapp\.com|wa\.me)/i },
  telegram: { label: 'Telegram', Icon: TwitterIcon, match: /t\.me|telegram\.org/i },
};

// Settings fields that should be hidden from the social-links section
// (e.g. `youtube`, `about_video` are not social profiles).
const HIDDEN_SOCIAL_KEYS = new Set(['youtube', 'about_video', 'aboutVideo']);

function isSocialLinkField(key) {
  return !HIDDEN_SOCIAL_KEYS.has(key);
}

function buildSocialLinks(settings) {
  if (!settings || typeof settings !== 'object') return [];
  const links = [];

  for (const [key, value] of Object.entries(settings)) {
    if (typeof value !== 'string') continue;
    const platformKey = key.toLowerCase();
    if (!isSocialLinkField(platformKey)) continue;

    const url = value.trim();
    if (!url || !/^https?:\/\//i.test(url)) continue;

    const meta =
      PLATFORM_META[platformKey] ||
      Object.values(PLATFORM_META).find((m) => m.match && m.match.test(url)) ||
      null;

    links.push({
      key: platformKey,
      label: meta?.label || platformKey,
      url,
      Icon: meta?.Icon || TwitterIcon,
    });
  }

  return links;
}

function buildStoreLinks(settings) {
  if (!settings || typeof settings !== 'object') return { googlePlay: null, appleStore: null };
  const googlePlay =
    typeof settings.google_play === 'string' && /^https?:\/\//i.test(settings.google_play.trim())
      ? settings.google_play.trim()
      : null;
  const appleStore =
    typeof settings.apple_store === 'string' && /^https?:\/\//i.test(settings.apple_store.trim())
      ? settings.apple_store.trim()
      : null;
  return { googlePlay, appleStore };
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState([]);
  const [storeLinks, setStoreLinks] = useState({ googlePlay: null, appleStore: null });

  useEffect(() => {
    let cancelled = false;
    getSettings()
      .then((data) => {
        if (cancelled) return;
        setSocialLinks(buildSocialLinks(data));
        setStoreLinks(buildStoreLinks(data));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Error loading settings:', err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer
      className="relative w-full py-16 px-6 md:px-12 select-none overflow-hidden"
      style={{ backgroundImage: "linear-gradient(163.895deg, rgb(63, 118, 78) 0%, rgb(9, 50, 25) 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col gap-12">

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start text-right"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >

          {/* Column 1: Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-5 items-start text-right">
            <div className="bg-[#002d12] rounded-[16px] w-[96px] h-[98.89px] flex items-center justify-center p-2 shadow-md border border-white/5">
              <img
                src={footerLogo}
                alt="كافل"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-sans font-normal text-sm md:text-[16px] text-[#fdefde]/60 leading-[24px] max-w-[340px]">
              منصة رائدة في خدمات الموارد البشرية والعمالة
            </p>
            <div className="flex flex-wrap gap-4 mt-2 items-center justify-start">
              <img
                src={trustBadge1}
                alt="موثق"
                className="h-[36px] w-auto object-contain cursor-pointer transition-transform hover:scale-105"
              />
              <div className="flex flex-col text-right justify-center">
                <span className="font-sans font-normal text-[12px] md:text-[14px] text-[#d1d5dc]">رقم ضريبي</span>
                <span className="font-sans font-extrabold text-[16px] md:text-[18px] text-white tracking-wide">1131021685</span>
              </div>
              <div className="flex flex-col text-right justify-center">
                <span className="font-sans font-normal text-[12px] md:text-[14px] text-[#d1d5dc]">سجل تجاري</span>
                <span className="font-sans font-extrabold text-[16px] md:text-[18px] text-white tracking-wide">1131021685</span>
              </div>
              <img
                src={trustBadge2}
                alt="سجل تجاري معتمد"
                className="h-[36px] w-auto object-contain cursor-pointer transition-transform hover:scale-105"
              />
            </div>
          </div>

          {/* Column 2: Support Column */}
          <div className="lg:col-span-3 flex flex-col gap-4 items-start text-right">
            <span className="font-sans font-bold text-[18px] text-[#fdefde] pb-1 border-b border-[#fdefde]/10 w-full block">
              الدعم
            </span>
            <div className="flex flex-col gap-3 font-sans font-normal text-[16px] text-[#fdefde]/60">
              <a href="#contact" className="hover:text-white transition-colors">تواصل معنا</a>
              <a href="#contact" className="hover:text-white transition-colors">الأسئلة الشائعة</a>
              <a href="#contact" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#contact" className="hover:text-white transition-colors">الشروط والأحكام</a>
            </div>
            <div className="flex gap-3 mt-4 items-center">
              {storeLinks.appleStore ? (
                <a
                  href={storeLinks.appleStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[120px] transition-transform hover:-translate-y-1 block duration-300"
                >
                  <img src={appStoreBadge} alt="App Store download" className="bg-white w-full h-auto object-contain" />
                </a>
              ) : (
                <div className="w-[120px] transition-transform block duration-300 opacity-50 cursor-not-allowed">
                  <img src={appStoreBadge} alt="App Store download" className="bg-white w-full h-auto object-contain" />
                </div>
              )}
              {storeLinks.googlePlay ? (
                <a
                  href={storeLinks.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[120px] transition-transform hover:-translate-y-1 block duration-300"
                >
                  <img src={googlePlayBadge} alt="Google Play download" className="bg-white w-full h-auto object-contain" />
                </a>
              ) : (
                <div className="w-[120px] transition-transform block duration-300 opacity-50 cursor-not-allowed">
                  <img src={googlePlayBadge} alt="Google Play download" className="bg-white w-full h-auto object-contain" />
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 items-start text-right">
            <span className="font-sans font-bold text-[18px] text-[#fdefde] pb-1 border-b border-[#fdefde]/10 w-full block">
              روابط سريعة
            </span>
            <div className="flex flex-col gap-3 font-sans font-normal text-[16px] text-[#fdefde]/60">
              <a href="#services" className="hover:text-white transition-colors">خدماتنا</a>
              <a href="#about" className="hover:text-white transition-colors">من نحن</a>
              <a href="#news" className="hover:text-white transition-colors">آخر الأخبار</a>
              <a href="#contact" className="hover:text-white transition-colors">تواصل معنا</a>
            </div>
          </div>

          {/* Column 4: Follow Us Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 items-start text-right">
            <span className="font-sans font-bold text-[18px] text-[#fdefde] pb-1 border-b border-[#fdefde]/10 w-full block">
              تابعنا
            </span>
            {socialLinks.length === 0 ? (
              <div className="flex flex-nowrap gap-2 mt-1" aria-hidden="true">
                {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map((Icon, idx) => (
                  <span
                    key={idx}
                    className="bg-[rgba(199,188,172,0.15)] rounded-full w-[40px] h-[40px] shrink-0 flex items-center justify-center text-[#fdefde]/40"
                  >
                    <Icon />
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex flex-nowrap gap-2 mt-1">
                {socialLinks.map(({ key, label, url, Icon }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="bg-[rgba(199,188,172,0.15)] rounded-full w-[40px] h-[40px] shrink-0 flex items-center justify-center cursor-pointer transition-all duration-300 text-[#fdefde] hover:bg-[#00bc9c] hover:scale-105 hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

        </motion.div>

        <div className="border-t border-white/10 pt-8 flex items-center justify-center text-center">
          <p className="font-sans font-normal text-sm md:text-[16px] text-[#fdefde]/60">
            © {currentYear} كافل. جميع الحقوق محفوظة.
          </p>
        </div>

      </div>
    </footer>
  );
}
