import { useState } from 'react';
import { Editor } from '@/components/Editor';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import type { EditorContent } from '@/types/types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [editorContent, setEditorContent] = useState<EditorContent>({
    html: '',
    json: '{}'
  });

  console.log(editorContent);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <header className="py-4 px-6 border-b border-opacity-20 transition-colors duration-300 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-opacity-80 shadow-sm"
        style={{ backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-blue-500">Cloudairy</span>
          <span>Editor</span>
        </h1>
        <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Editor
          darkMode={darkMode}
          onContentChange={setEditorContent}
        />
      </main>

      <footer className={`py-4 px-6 text-center text-sm transition-colors duration-300 ${darkMode ? 'text-slate-400' : ' text-slate-500'}`}>
        Built with React, Tiptap, and TailwindCSS for Cloudairy second round interview.
      </footer>
    </div>
  );
}

export default App;