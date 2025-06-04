export interface EditorContent {
  html: string;
  json: string;
}

export interface ThemeSwitcherProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface EditorProps {
  darkMode: boolean;
  onContentChange: (content: EditorContent) => void;
}

export interface ToolbarProps {
  editor: any | null;
  darkMode: boolean;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  darkMode: boolean;
  children: React.ReactNode;
  title?: string;
}

export interface OutputViewProps {
  html: string;
  json: string;
  darkMode: boolean;
}