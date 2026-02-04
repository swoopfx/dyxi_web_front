
import React from 'react';
import { UserSettings } from '../types';

interface SettingsPanelProps {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, updateSettings, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-amber-400">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
            <span>⚙️</span> Magic Settings
          </h2>
          <button 
            onClick={onClose}
            className="text-3xl hover:scale-110 transition-transform"
            aria-label="Close settings"
          >
            ❌
          </button>
        </div>

        <div className="space-y-6">
          {/* Dyslexia Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border-2 border-amber-200">
            <div>
              <p className="font-bold text-lg text-amber-900">Easy Reading Mode</p>
              <p className="text-sm text-amber-700">Makes letters easier to see!</p>
            </div>
            <button
              onClick={() => updateSettings({ isDyslexiaMode: !settings.isDyslexiaMode })}
              className={`w-14 h-8 rounded-full transition-colors relative ${settings.isDyslexiaMode ? 'bg-green-500' : 'bg-gray-300'}`}
              aria-pressed={settings.isDyslexiaMode}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.isDyslexiaMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {/* Theme Colors */}
          <div>
            <p className="font-bold text-lg text-amber-900 mb-2">Paper Color</p>
            <div className="flex gap-4">
              {(['cream', 'blue', 'pink', 'green'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => updateSettings({ themeColor: color })}
                  className={`w-12 h-12 rounded-full border-4 transition-all ${
                    settings.themeColor === color ? 'border-amber-500 scale-110' : 'border-gray-100 hover:border-amber-200'
                  } ${
                    color === 'cream' ? 'bg-[#FFFBEB]' : 
                    color === 'blue' ? 'bg-[#F0F9FF]' : 
                    color === 'pink' ? 'bg-[#FDF2F8]' : 'bg-[#F0FDF4]'
                  }`}
                  aria-label={`Switch to ${color} background`}
                />
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <p className="font-bold text-lg text-amber-900 mb-2">How Big is the Text?</p>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`py-2 rounded-xl font-bold transition-all ${
                    settings.fontSize === size 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {size === 'small' ? 'ABC' : size === 'medium' ? 'Abc' : 'ABC'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-2xl text-xl shadow-lg transition-transform active:scale-95"
          >
            Yay, Let's Go! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
