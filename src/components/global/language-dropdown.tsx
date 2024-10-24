'use client';

import { LANGUAGE_OPTIONS } from '@/utils/constants/language-options';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import Image from 'next/image';
import { CheckIcon } from 'lucide-react';

export default function LanguageSwitcher() {
  const [selectedLanguageState, setSelectedLanguage] = useState('javascript');

  const selectedLanguage = LANGUAGE_OPTIONS.find(
    (lang) => lang.language === selectedLanguageState
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {selectedLanguage && (
          <Image
            src={selectedLanguage.svg}
            alt={selectedLanguage.language}
            width={24}
            height={24}
            unoptimized
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-black-75 text-white border-none"
        align="end"
      >
        {LANGUAGE_OPTIONS.map((lang) => (
          <DropdownMenuItem
            key={lang.language}
            onClick={() => setSelectedLanguage(lang.language)}
            className={`relative ${
              lang.language !== selectedLanguageState
                ? 'pointer-events-none'
                : ''
            }`}
          >
            <div className="flex items-center">
              <Image
                className={`relative ${
                  lang.language !== selectedLanguageState
                    ? 'blur-sm pointer-events-none'
                    : ''
                }`}
                src={lang.svg}
                alt={lang.language}
                width={24}
                height={24}
                unoptimized
              />
              <span className="ml-3 text-[10px] font-satoshi flex items-center gap-x-2">
                {lang.config.isActive ? lang.config.label : 'Coming soon'}
                {lang.language === selectedLanguageState && (
                  <CheckIcon className="size-3" />
                )}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="text-[10px] font-satoshi font-medium">
          Submit your suggestion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
