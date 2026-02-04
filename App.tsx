
import React, { useState, useEffect } from 'react';
import { LESSONS, THEMES } from './constants';
import { UserSettings, Lesson } from './types';
import SettingsPanel from './components/SettingsPanel';
import LessonModal from './components/LessonModal';

const App: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    isDyslexiaMode: true,
    fontSize: 'medium',
    themeColor: 'cream',
    lineSpacing: 1.5,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isAppVisible, setIsAppVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const theme = THEMES[settings.themeColor];

  const getTypographyClass = () => {
    let classes = settings.isDyslexiaMode ? 'dyslexia-friendly-text font-["Lexend"]' : 'font-["Lexend"]';
    return classes;
  };

  // Parallax offsets
  const logoParallax = Math.min(scrollY * 0.15, 60);
  const titleParallax = Math.min(scrollY * 0.08, 40);

  if (!isAppVisible) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-b from-sky-300 via-indigo-200 to-emerald-100 ${getTypographyClass()}`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-9xl animate-bounce">☁️</div>
          <div className="absolute top-40 right-20 text-8xl opacity-40">☁️</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-pulse">🌸</div>
          <div className="absolute bottom-40 right-40 text-8xl animate-bounce" style={{animationDelay: '1s'}}>🌻</div>
        </div>

        <div className="relative z-10 space-y-8 max-w-2xl bg-white/60 backdrop-blur-md p-12 rounded-[4rem] border-8 border-dashed border-white shadow-2xl cartoon-wobble">
          <h1 className="text-6xl md:text-8xl font-black text-indigo-900 tracking-tighter">
            Welcome to <br/>
            <span className="text-pink-500">D</span>
            <span className="text-blue-500">y</span>
            <span className="text-green-500">x</span>
            <span className="text-amber-500">i</span>!
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-700 font-bold leading-relaxed">
            Are you ready for a magical <br/> learning adventure?
          </p>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => setIsAppVisible(true)}
              className="group relative bg-amber-400 hover:bg-amber-500 text-white p-10 rounded-full shadow-[0_20px_50px_rgba(245,158,11,0.4)] transition-all transform hover:scale-110 active:scale-95 border-b-[12px] border-amber-600"
              aria-label="Enter the Meadow"
            >
              <span className="text-8xl group-hover:rotate-12 transition-transform inline-block">⭐</span>
              <div className="absolute -top-4 -right-4 bg-pink-500 text-white px-4 py-2 rounded-full font-black text-xl animate-pulse">
                Click Me!
              </div>
            </button>
            <p className="text-indigo-900 font-black text-xl animate-pulse">Tap the Magic Star to start!</p>
          </div>
        </div>

        <div className="mt-12 text-slate-600 font-bold text-lg flex items-center gap-2">
           Loading your meadow... 🌈
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 animate-in fade-in zoom-in-95 pb-20 ${theme.bg} ${getTypographyClass()}`}>
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">🌈</div>
        <div className="absolute bottom-20 right-10 text-6xl animate-bounce">🦋</div>
        <div className="absolute top-1/2 left-20 text-6xl rotate-12">⭐</div>
        <div className="absolute top-40 right-20 text-5xl">🍭</div>
        <div className="absolute bottom-40 left-10 text-5xl rotate-45">🎨</div>
      </div>

      {/* Comical Cartoon Header with Parallax */}
      <header className="relative z-10 p-8 md:p-14 max-w-7xl mx-auto overflow-hidden">
        <div 
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-white/40 backdrop-blur-sm p-8 rounded-[4rem] border-4 border-dashed border-amber-300 comic-shadow transition-transform duration-75 ease-out"
        >
          
          {/* Wobbly Cartoonish Logo Container with Parallax */}
          <div 
            className="relative group"
            style={{ transform: `translateY(${logoParallax}px)` }}
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 cartoon-wobble opacity-70 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative w-32 h-32 md:w-44 md:h-44 bg-white p-4 cartoon-wobble border-4 border-white shadow-xl overflow-hidden flex items-center justify-center cartoon-float">
              <img 
                src="dyxi_logo_4.png" 
                alt="Dyxi Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {/* Pop-out decorations */}
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">✨</div>
            <div className="absolute -bottom-4 -left-4 text-4xl">🎈</div>
          </div>

          <div 
            className="text-center md:text-left space-y-2 transition-transform duration-75 ease-out"
            style={{ transform: `translateY(${titleParallax}px)` }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tight flex justify-center md:justify-start">
              {['D','y','x','i'].map((char, i) => (
                <span 
                  key={i} 
                  className={`letter-vibrant inline-block ${
                    i === 0 ? 'text-pink-500 -rotate-6' : 
                    i === 1 ? 'text-blue-500 rotate-3' : 
                    i === 2 ? 'text-green-500 -rotate-3' : 'text-amber-500 rotate-6'
                  } transition-transform hover:scale-125`}
                  style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.05)' }}
                >
                  {char}
                </span>
              ))}
            </h1>
            <div className="bg-amber-400 inline-block px-6 py-2 rounded-full transform -rotate-2 shadow-lg">
              <p className="text-white font-black text-xl md:text-2xl uppercase tracking-widest">
                Learning Meadow
              </p>
            </div>
            <p className="text-slate-600 font-bold text-lg md:text-xl mt-2 flex items-center justify-center md:justify-start gap-2">
              For the Neuro-Divergent 🎒 
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`group text-left p-10 rounded-[3rem] border-b-8 shadow-xl transition-all transform hover:-translate-y-3 hover:rotate-1 active:scale-95 flex flex-col items-center sm:flex-row gap-8 ${lesson.color}`}
            >
              <div className="text-8xl transition-transform group-hover:scale-125 group-hover:rotate-12 cartoon-float">
                {lesson.icon}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-3xl font-black mb-3">{lesson.title}</h3>
                <p className="text-xl font-medium opacity-80 leading-snug">
                  {lesson.description}
                </p>
                <div className="mt-6 inline-flex items-center font-bold text-lg group-hover:translate-x-2 transition-transform bg-white/40 px-4 py-1 rounded-full">
                  Let's Play! <span className="ml-2">➔</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Store Links & Tablet Compatibility Section */}
        <section className="mt-16 mb-20 bg-indigo-50/80 backdrop-blur-sm p-12 rounded-[4rem] border-4 border-indigo-200 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="text-9xl">📱</span>
          </div>
          
          <div className="relative z-10">

            <p className="text-xl text-indigo-700 max-w-xl mx-auto mb-10 leading-relaxed font-bold">
              Dyxi helps detects early signs of dyslexia, dyscalculia and other learning differences through fun, interactive lessons designed for young learners.
            </p>
            <hr className="border-indigo-300 my-6"></hr>
            <div className="bg-indigo-500 text-white inline-block px-8 py-3 rounded-full font-black text-2xl mb-6 transform -rotate-1 shadow-lg">
              Optimized for Tablets! 📟
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-indigo-900 mb-4">
              Take Dyxi on Every Adventure!
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-indigo-900 mb-4">
              Identify Dyslexia, ADHD
            </h3>
            <p className="text-xl text-indigo-700 max-w-xl mx-auto mb-10 leading-relaxed font-bold">
              Dyxi works best on big screens like iPads and Android tablets. Grab the app for the best experience!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-[2rem] border-b-8 border-slate-700 hover:scale-105 active:scale-95 transition-all group"
              >
                <span className="text-4xl group-hover:animate-bounce">🍎</span>
                <div className="text-left">
                  <p className="text-xs uppercase font-bold opacity-70">Download on the</p>
                  <p className="text-2xl font-black leading-tight">App Store</p>
                </div>
              </a>

              <a 
                href="https://play.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center gap-4 bg-green-600 text-white px-8 py-4 rounded-[2rem] border-b-8 border-green-800 hover:scale-105 active:scale-95 transition-all group"
              >
                <span className="text-4xl group-hover:animate-spin">🛍️</span>
                <div className="text-left">
                  <p className="text-xs uppercase font-bold opacity-70">Get it on</p>
                  <p className="text-2xl font-black leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Settings Modal */}
      <SettingsPanel 
        settings={settings} 
        updateSettings={updateSettings} 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      {/* Lesson View Modal */}
      {selectedLesson && (
        <LessonModal 
          lesson={selectedLesson} 
          settings={settings} 
          onClose={() => setSelectedLesson(null)} 
        />
      )}

      {/* Bottom Nav / Quick Links */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-6">
        <div className="bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-full flex justify-around items-center shadow-2xl border-4 border-slate-700">
          <button className="text-3xl hover:scale-125 transition-transform" aria-label="Home">🏠</button>
          <button className="text-3xl hover:scale-125 transition-transform" aria-label="Badges">🏆</button>
          <button className="text-3xl hover:scale-125 transition-transform" aria-label="Profile">👤</button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-3xl hover:scale-125 transition-transform p-3 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse" 
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
