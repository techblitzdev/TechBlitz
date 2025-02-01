import { LanguageDropdown } from "@/types/LanguageDropdown";
import JavascriptSvg from "@/public/language-imgs/javascript.svg";
import TypescriptSvg from "@/public/language-imgs/typescript.svg";
import PythonSvg from "@/public/language-imgs/python.svg";
import GolangSvg from "@/public/language-imgs/golang.svg";

export const LANGUAGE_OPTIONS: LanguageDropdown[] = [
  {
    language: "javascript",
    config: {
      isActive: true,
      label: "JavaScript",
    },
    svg: JavascriptSvg,
  },
  {
    language: "typescript",
    config: {
      isActive: false,
      label: "TypeScript",
    },
    svg: TypescriptSvg,
  },
  {
    language: "python",
    config: {
      isActive: false,
      label: "Python",
    },
    svg: PythonSvg,
  },
  {
    language: "go",
    config: {
      isActive: false,
      label: "Go",
    },
    svg: GolangSvg,
  },
];
