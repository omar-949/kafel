import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setFormError('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      phone: '',
      message: ''
    });
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#fbfbfc] relative overflow-hidden select-none">
      {/* Decorative subtle top/bottom borders or patterns */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e5e5e6] to-transparent pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Right Column: Hero Content & Checklist */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6 text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-sans font-extrabold text-[36px] md:text-[48px] text-[#252527] leading-[48px] md:leading-[64px] tracking-tight">
              ابدأ الآن مع كافل وخلي كل شيء أسهل
            </h2>
            <p className="font-sans font-normal text-base md:text-[20px] text-[#626467] leading-relaxed md:leading-[32px] max-w-[580px]">
              انضم لآلاف العملاء الذين يثقون في خدماتنا
            </p>

            {/* CTA Button */}
            <motion.button
              className="mt-4 px-10 py-4 text-[18px] font-sans font-bold text-white bg-[#0A4D34] hover:bg-[#063121] rounded-[12px] shadow-sm hover:shadow-premium transition-all duration-300 transform active:scale-95 cursor-pointer text-center w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ابدأ رحلتك الآن
            </motion.button>

            {/* Bottom Horizontal Checklist */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-8 lg:mt-20 text-right justify-start">
              {[
                'بدون رسوم خفية',
                'ضمان الجودة',
                'دعم فوري'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[#626467]" dir="rtl">
                  <svg className="w-5 h-5 text-[#252527] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-sans text-[16px] font-medium text-[#626467]">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Left Column: Premium Contact Form Card */}
          <motion.div
            className="lg:col-span-5 relative z-10 w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] border border-[#e5e5e6] w-full max-w-[460px] mx-auto transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]">
              <span className="font-sans font-extrabold text-[24px] text-[#252527] text-center mb-8 block">
                تواصل معنا
              </span>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">

                {/* Success Message Alert */}
                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-green-700"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="font-sans font-semibold text-sm">تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message Alert */}
                <AnimatePresence>
                  {formError && (
                    <motion.div
                      className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-700 text-sm font-semibold flex items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="font-sans">{formError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-[16px] text-[#252527] text-right" htmlFor="name">
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-[#fcfcfd] border border-[#e5e5e6] px-4 py-3.5 rounded-[12px] text-sm text-[#252527] focus:outline-none focus:border-[#0A4D34] focus:ring-4 focus:ring-[#0A4D34]/5 transition-all font-sans text-right"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>

                {/* Phone Input */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-[16px] text-[#252527] text-right" htmlFor="phone">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-[#fcfcfd] border border-[#e5e5e6] px-4 py-3.5 rounded-[12px] text-sm text-[#252527] focus:outline-none focus:border-[#0A4D34] focus:ring-4 focus:ring-[#0A4D34]/5 transition-all font-sans text-right"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-[16px] text-[#252527] text-right" htmlFor="message">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-[#fcfcfd] border border-[#e5e5e6] px-4 py-3.5 rounded-[12px] text-sm text-[#252527] focus:outline-none focus:border-[#0A4D34] focus:ring-4 focus:ring-[#0A4D34]/5 transition-all font-sans resize-none h-[110px] text-right"
                    placeholder="اكتب رسالتك هنا..."
                    value={formData.message}
                    onChange={handleFormChange}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-[#0A4D34] hover:bg-[#063121] text-white py-4 rounded-[12px] font-sans font-bold text-[18px] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-premium"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>إرسال الطلب</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180 shrink-0">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
