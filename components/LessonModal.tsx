
import React, { useState } from 'react';
import { Lesson, UserSettings } from '../types';
import { speakText, getSimpleExplanation } from '../services/geminiService';

interface LessonModalProps {
  lesson: Lesson;
  settings: UserSettings;
  onClose: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, settings, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleSpeech = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    await speakText(lesson.content);
    setIsSpeaking(false);
  };

  const handleAskGemini = async () => {
    setLoadingAi(true);
    const explanation = await getSimpleExplanation(lesson.title);
    setAiExplanation(explanation || "I couldn't find an answer right now, let's try again!");
    setLoadingAi(false);
    if (explanation) speakText(explanation);
  };

  const textClass = `
    ${settings.isDyslexiaMode ? 'dyslexia-friendly-text' : ''}
    ${settings.fontSize === 'large' ? 'text-2xl md:text-3xl' : settings.fontSize === 'medium' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" role="dialog">
      <div className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 shadow-2xl relative border-8 ${lesson.color.split(' ')[1]} ${
        settings.themeColor === 'cream' ? 'bg-[#FFFBEB]' : 
        settings.themeColor === 'blue' ? 'bg-[#F0F9FF]' : 
        settings.themeColor === 'pink' ? 'bg-[#FDF2F8]' : 'bg-[#F0FDF4]'
      }`}>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-4xl hover:scale-125 transition-transform"
          aria-label="Close lesson"
        >
          ❌
        </button>

        <header className="mb-8 text-center">
          <div className="text-7xl mb-4 animate-bounce">{lesson.icon}</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
            {lesson.title}
          </h2>
        </header>

        <div className="space-y-8">
          <div className={`bg-white/80 p-8 rounded-[2rem] shadow-inner ${textClass} text-slate-800 leading-relaxed text-left`}>
            {lesson.content}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSpeech}
              disabled={isSpeaking}
              className={`flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-5 px-8 rounded-full text-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${isSpeaking ? 'opacity-70 animate-pulse' : ''}`}
            >
              {isSpeaking ? '💬 Reading...' : '🔊 Read Aloud'}
            </button>

            <button
              onClick={handleAskGemini}
              disabled={loadingAi}
              className={`flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-bold py-5 px-8 rounded-full text-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${loadingAi ? 'opacity-70 animate-spin' : ''}`}
            >
              {loadingAi ? '✨ Thinking...' : '💡 Tell Me More'}
            </button>
          </div>

          {aiExplanation && (
            <div className="bg-white p-6 rounded-[2rem] border-4 border-dashed border-teal-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-teal-900 font-bold text-xl flex items-start gap-3">
                <span className="text-2xl">✨</span>
                {aiExplanation}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={onClose}
            className="text-slate-500 font-bold text-lg hover:underline"
          >
            Finished Learning? Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
