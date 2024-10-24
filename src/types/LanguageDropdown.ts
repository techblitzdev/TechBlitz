export type Languages = 'javascript' | 'typescript' | 'python' | 'golang';

export type LanguageConfig = {
  label: string;
  isActive: boolean;
};

export interface LanguageDropdown {
  language: Languages;
  config: LanguageConfig;
  svg: string;
}
