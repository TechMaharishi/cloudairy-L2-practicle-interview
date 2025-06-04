import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Code, 
  Quote, 
  Image as ImageIcon,
  Minus,
  Link,
  Undo,
  Redo
} from 'lucide-react';
import { ToolbarButton}  from '@/components/ToolbarButton';
import type { ToolbarProps } from '@/types/types';

export const Toolbar: React.FC<ToolbarProps> = ({ editor, darkMode }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event) => {
      if (!event.target) return;
      
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        if (src) {
          editor.chain().focus().setImage({ src }).run();
        }
      };
      reader.readAsDataURL(file);
    };
    
    input.click();
  };

  const setLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-1 p-2 rounded-lg border mb-4 transition-colors duration-300 backdrop-blur-md bg-opacity-80 shadow-sm ${
      darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex items-center gap-1 mr-3">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          darkMode={darkMode}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          darkMode={darkMode}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          darkMode={darkMode}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </ToolbarButton>
      </div>
      
      <div className={`h-6 w-px mx-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />
      
      <div className="flex items-center gap-1 mr-3">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          darkMode={darkMode}
          title="Bold"
        >
          <Bold size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          darkMode={darkMode}
          title="Italic"
        >
          <Italic size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          darkMode={darkMode}
          title="Underline"
        >
          <Underline size={18} />
        </ToolbarButton>
      </div>
      
      <div className={`h-6 w-px mx-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />
      
      <div className="flex items-center gap-1 mr-3">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          darkMode={darkMode}
          title="Bullet List"
        >
          <List size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          darkMode={darkMode}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </ToolbarButton>
      </div>
      
      <div className={`h-6 w-px mx-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />
      
      <div className="flex items-center gap-1 mr-3">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          darkMode={darkMode}
          title="Code Block"
        >
          <Code size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          darkMode={darkMode}
          title="Blockquote"
        >
          <Quote size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          darkMode={darkMode}
          title="Horizontal Rule"
        >
          <Minus size={18} />
        </ToolbarButton>
      </div>
      
      <div className={`h-6 w-px mx-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />
      
      <div className="flex items-center gap-1 mr-3">
        <ToolbarButton
          onClick={addImage}
          darkMode={darkMode}
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={setLink}
          active={editor.isActive('link')}
          darkMode={darkMode}
          title="Insert Link"
        >
          <Link size={18} />
        </ToolbarButton>
      </div>
      
      <div className={`h-6 w-px mx-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />
      
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          darkMode={darkMode}
          title="Undo"
        >
          <Undo size={18} />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          darkMode={darkMode}
          title="Redo"
        >
          <Redo size={18} />
        </ToolbarButton>
      </div>
    </div>
  );
};