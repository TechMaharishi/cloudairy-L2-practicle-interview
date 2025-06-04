import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Toolbar } from '@/components/Toolbar';
import { OutputView } from '@/components/OutputView';
import type { EditorProps } from '@/types/types';
import DropCursor from '@tiptap/extension-dropcursor';

export const Editor: React.FC<EditorProps> = ({ darkMode, onContentChange }) => {
  const [htmlOutput, setHtmlOutput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('{}');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: darkMode
            ? 'text-blue-400 underline decoration-dotted hover:text-blue-300'
            : 'text-blue-600 underline decoration-dotted hover:text-blue-800',
        },
      }),
      DropCursor,
    ],
    content: `
      <span>Welcome to the Cloudairy Editor</span>
    `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = JSON.stringify(editor.getJSON(), null, 2);

      setHtmlOutput(html);
      setJsonOutput(json);

      onContentChange({
        html,
        json
      });
    },
  });

  // Reacting to Dark Mode
  useEffect(() => {
    if (editor) {
      editor.extensionManager.extensions.forEach(extension => {
        if (extension.name === 'link') {
          extension.options.HTMLAttributes = {
            class: darkMode
              ? 'text-blue-400 underline decoration-dotted hover:text-blue-300'
              : 'text-blue-600 underline decoration-dotted hover:text-blue-800',
          };
        }
      });
    }
  }, [darkMode, editor]);

  // Image Drop Handler
  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      if (!editor || !event.dataTransfer) return;

      const hasFiles = event.dataTransfer.files?.length;

      if (!hasFiles) return;

      const file = event.dataTransfer.files[0];
      const isImage = file.type.startsWith('image/');

      if (!isImage) return;

      event.preventDefault();

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        if (src && editor) {
          const { view } = editor;
          const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;

          if (pos !== undefined) {
            editor.chain().focus().setImage({ src }).run();
          }
        }
      };
      reader.readAsDataURL(file);
    };

    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('drop', handleDrop);
    };
  }, [editor]);

  return (
    <div>
      <Toolbar editor={editor} darkMode={darkMode} />

      <div className={`mb-8 rounded-lg border transition-colors duration-300 ${darkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
        <EditorContent
          editor={editor}
          className={`prose max-w-none transition-colors duration-300 ${darkMode ? 'prose-invert' : ''
            }`}
        />
        {/* Custom styles */}
        <style>{`
          .ProseMirror {
            padding: 1rem;
            min-height: 700px;
            outline: none;
            overflow-y: auto;
          }
          
          .ProseMirror h1 {
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
          }
          
          .ProseMirror h2 {
            font-size: 1.5rem;
            line-height: 2rem;
            font-weight: 600;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
          }
          
          .ProseMirror h3 {
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .ProseMirror p {
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
            line-height: 1.5;
          }
          
          .ProseMirror ul, .ProseMirror ol {
            padding-left: 1.5rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .ProseMirror ul {
            list-style-type: disc;
          }
          
          .ProseMirror ol {
            list-style-type: decimal;
          }
          
          .ProseMirror blockquote {
            border-left-width: 4px;
            border-left-style: solid;
            padding-left: 1rem;
            font-style: italic;
            margin-left: 0;
            margin-right: 0;
            ${darkMode ? 'border-left-color: rgb(51, 65, 85);' : 'border-left-color: rgb(226, 232, 240);'}
          }
          
          .ProseMirror pre {
            padding: 0.75rem;
            border-radius: 0.375rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            ${darkMode ? 'background-color: rgb(15, 23, 42);' : 'background-color: rgb(241, 245, 249);'}
          }
          
          .ProseMirror img {
            max-width: 100%;
            height: auto;
            margin: 1rem 0;
            border-radius: 0.375rem;
          }
          
          .ProseMirror hr {
            margin-top: 1rem;
            margin-bottom: 1rem;
            border-top-width: 1px;
            ${darkMode ? 'border-color: rgb(51, 65, 85);' : 'border-color: rgb(226, 232, 240);'}
          }
          
          .ProseMirror code {
            font-family: monospace;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            ${darkMode ? 'background-color: rgb(30, 41, 59);' : 'background-color: rgb(241, 245, 249);'}
          }
          
          .ProseMirror a {
            text-decoration: underline;
            text-decoration-style: dotted;
            ${darkMode ? 'color: rgb(96, 165, 250);' : 'color: rgb(37, 99, 235);'}
          }
          
          .ProseMirror a:hover {
            ${darkMode ? 'color: rgb(147, 197, 253);' : 'color: rgb(59, 130, 246);'}
          }
        `}</style>
      </div>

      <OutputView
        html={htmlOutput}
        json={jsonOutput}
        darkMode={darkMode}
      />
    </div>
  );
};