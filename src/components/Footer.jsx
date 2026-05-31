import { motion } from 'framer-motion';

import appStoreBadge from '../assets/footer/Download - Component.png';
import googlePlayBadge from '../assets/footer/Download - Component (1).png';
import footerLogo from '../assets/logo.png'; // gold logo
import trustBadge1 from '../assets/footer/385f8df5a97ef6172e5d77a8d34e93e3b2a7c8f8.png'; // Image 6 (cr/vat logo 1)
import trustBadge2 from '../assets/footer/66b2ff9d31893e0555e855b3b291bcae5284c338.png'; // Image 8 (cr/vat logo 2)

import footerSocial1 from '../assets/footer/Icon.svg';
import footerSocial2 from '../assets/footer/Icon (1).svg';
import footerSocial3 from '../assets/footer/Icon (2).svg';
import footerSocial4 from '../assets/footer/Icon (3).svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full py-16 px-6 md:px-12 select-none overflow-hidden"
      style={{ backgroundImage: "linear-gradient(163.895deg, rgb(63, 118, 78) 0%, rgb(9, 50, 25) 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col gap-12">

        {/* Main Footer Links & Branding Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start text-right"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >

          {/* Column 1: Brand Column (Right side) - takes 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-5 items-start text-right">
            {/* Logo Box */}
            <div className="bg-[#002d12] rounded-[16px] w-[96px] h-[98.89px] flex items-center justify-center p-2 shadow-md border border-white/5">
              <img
                src={footerLogo}
                alt="كافل"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Paragraph Description */}
            <p className="font-sans font-normal text-sm md:text-[16px] text-[#fdefde]/60 leading-[24px] max-w-[340px]">
              منصة رائدة في خدمات الموارد البشرية والعمالة
            </p>
            {/* Trust CR and Tax numbers with Saudi CR trust badges */}
            <div className="flex flex-wrap gap-4 mt-2 items-center justify-start">
              {/* Trust Badge 1 */}
              <img
                src={trustBadge1}
                alt="موثق"
                className="h-[36px] w-auto object-contain cursor-pointer transition-transform hover:scale-105"
              />
              {/* Record tax info */}
              <div className="flex flex-col text-right justify-center">
                <span className="font-sans font-normal text-[12px] md:text-[14px] text-[#d1d5dc]">رقم ضريبي</span>
                <span className="font-sans font-extrabold text-[16px] md:text-[18px] text-white tracking-wide">1131021685</span>
              </div>
              <div className="flex flex-col text-right justify-center">
                <span className="font-sans font-normal text-[12px] md:text-[14px] text-[#d1d5dc]">سجل تجاري</span>
                <span className="font-sans font-extrabold text-[16px] md:text-[18px] text-white tracking-wide">1131021685</span>
              </div>
              {/* Trust Badge 2 */}
              <img
                src={trustBadge2}
                alt="سجل تجاري معتمد"
                className="h-[36px] w-auto object-contain cursor-pointer transition-transform hover:scale-105"
              />
            </div>
          </div>

          {/* Column 2: Support Column - takes 3 cols */}
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
            {/* App Store Download Badges under Support */}
            <div className="flex gap-3 mt-4 items-center">
              <a href="#" className="w-[120px] transition-transform hover:-translate-y-1 block duration-300">
                <img src={appStoreBadge} alt="App Store download" className="w-full h-auto object-contain" />
              </a>
              <a href="#" className="w-[120px] transition-transform hover:-translate-y-1 block duration-300">
                <img src={googlePlayBadge} alt="Google Play download" className="w-full h-auto object-contain" />
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links Column - takes 2 cols */}
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

          {/* Column 4: Follow Us Column (Left side) - takes 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4 items-start text-right">
            <span className="font-sans font-bold text-[18px] text-[#fdefde] pb-1 border-b border-[#fdefde]/10 w-full block">
              تابعنا
            </span>
            <div className="flex gap-2.5 mt-1">
              {[
                { img: footerSocial1, label: 'Facebook' },
                { img: footerSocial2, label: 'Twitter' },
                { img: footerSocial3, label: 'LinkedIn' },
                { img: footerSocial4, label: 'Instagram' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={social.label}
                  className="bg-[rgba(199,188,172,0.15)] rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#00bc9c] hover:scale-105"
                >
                  <img
                    src={social.img}
                    alt={social.label}
                    className="w-[20px] h-[20px]"
                  />
                </a>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Bottom copyright section with custom divider line */}
        <div className="border-t border-white/10 pt-8 flex items-center justify-center text-center">
          <p className="font-sans font-normal text-sm md:text-[16px] text-[#fdefde]/60">
            © {currentYear} كافل. جميع الحقوق محفوظة.
          </p>
        </div>

      </div>
    </footer>
  );
}
