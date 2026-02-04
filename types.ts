
export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  content: string;
}

export interface UserSettings {
  isDyslexiaMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  themeColor: 'cream' | 'blue' | 'pink' | 'green';
  lineSpacing: number;
}

export type ThemeSettings = {
  bg: string;
  card: string;
  text: string;
}
