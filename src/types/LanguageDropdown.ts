type Languages = "javascript" | "typescript" | "python" | "go";

type LanguageConfig = {
  label: string;
  isActive: boolean;
};

export interface LanguageDropdown {
  language: Languages;
  config: LanguageConfig;
  svg: string;
}
