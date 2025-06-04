import React, { useState } from 'react';
import type { OutputViewProps } from '@/types/types';

export const OutputView: React.FC<OutputViewProps> = ({ html, json, darkMode }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'json'>('html');
  
  return (
    <div className={`rounded-lg border transition-colors duration-300 ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'}`}>
      <div className={`border-b px-4 py-3 transition-colors duration-300 ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <h2 className="text-lg font-medium">Output Preview</h2>
      </div>
      <div className="p-4">
        <div className="flex mb-4 border-b pb-2">
          <button 
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 rounded-t-lg transition-colors duration-200 font-medium ${
              activeTab === 'html' 
                ? darkMode 
                  ? 'bg-slate-700 text-white' 
                  : 'bg-blue-100 text-blue-700' 
                : darkMode 
                  ? 'text-slate-300 hover:bg-slate-700' 
                  : 'text-slate-700 hover:bg-gray-100'
            }`}
          >
            HTML
          </button>
          <button 
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 rounded-t-lg transition-colors duration-200 font-medium ${
              activeTab === 'json' 
                ? darkMode 
                  ? 'bg-slate-700 text-white' 
                  : 'bg-blue-100 text-blue-700' 
                : darkMode 
                  ? 'text-slate-300 hover:bg-slate-700' 
                  : 'text-slate-700 hover:bg-gray-100'
            }`}
          >
            JSON
          </button>
        </div>
        <div className={`rounded-lg p-4 font-mono text-sm overflow-auto max-h-64 transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-300' : 'bg-gray-100 text-slate-800'}`}>
          <pre>{activeTab === 'html' ? html || '<p>Start typing to see the HTML output...</p>' : json || '{}'}</pre>
        </div>
      </div>
    </div>
  );
};