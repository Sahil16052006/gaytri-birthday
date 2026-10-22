import React, { useState, useEffect } from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Menu, X, ArrowUp } from 'lucide-react';

interface NavigationProps {
  currentSectionId?: string;
}

export const Navigation: React.FC<NavigationProps> = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);

      setScrolledPastHero(window.scrollY > 300);

      const sections = birthdayConfig.chapters.map((ch) => document.getElementById(ch.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(birthdayConfig.chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Thin Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-blush/30"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-dustyRose via-champagneGold to-gold transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop Floating Navigation Bar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 hidden md:block ${
          scrolledPastHero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav
          className="glass-panel px-5 py-2 rounded-full shadow-scrapbook border border-blush/60 flex items-center gap-1.5 text-xs font-serif"
          aria-label="मुख्य सूची"
        >
          <span className="text-gold font-marathiScript font-bold mr-2 text-sm">
            गायत्री पवार
          </span>

          <div className="flex items-center gap-1">
            {birthdayConfig.chapters.map((ch) => {
              const isActive = activeSection === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollToSection(ch.id)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 font-sans text-xs ${
                    isActive
                      ? 'bg-dustyRose text-white font-medium shadow-sm'
                      : 'text-deepBlack/80 hover:text-deepBlack hover:bg-blush/40'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {ch.title}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Menu Button */}
      <div
        className={`fixed top-4 right-4 z-40 md:hidden transition-all duration-300 ${
          scrolledPastHero ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="glass-panel w-11 h-11 rounded-full shadow-scrapbook flex items-center justify-center text-deepBlack border border-blush/70"
          aria-label={mobileMenuOpen ? "मेनू बंद करा" : "मेनू उघडा"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-deepBlack/50 backdrop-blur-sm md:hidden flex justify-end animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 bg-cream h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blush/80 mb-6">
                <div>
                  <h2 className="font-serif text-lg font-bold text-deepBlack">माझ्या बहिणीसाठी</h2>
                  <p className="text-xs text-warmBrown font-handwritten">20th Birthday Edition</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-blush/40 text-warmBrown"
                  aria-label="मेनू बंद करा"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {birthdayConfig.chapters.map((ch, idx) => {
                  const isActive = activeSection === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollToSection(ch.id)}
                      className={`text-left px-4 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-blush text-deepBlack font-semibold'
                          : 'text-deepBlack/80 hover:bg-blush/30'
                      }`}
                    >
                      <span className="font-sans text-sm">{ch.title}</span>
                      <span className="text-[10px] text-warmBrown font-serif">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-blush/60 text-center">
              <p className="text-xs text-warmBrown font-handwritten">
                साहिलकडून, प्रेमाने ♡
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Back to top button */}
      {scrolledPastHero && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-5 left-5 z-40 glass-panel w-10 h-10 rounded-full shadow-scrapbook flex items-center justify-center text-warmBrown hover:text-deepBlack hover:bg-blush/50 transition-all border border-blush/60"
          aria-label="वर जा (सुरुवातीस जा)"
          title="सुरुवातीस जा"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
};
