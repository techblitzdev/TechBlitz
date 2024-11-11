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
import { Button } from '@/components/ui/button';

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
            width={32}
            height={32}
            unoptimized
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-black-75 text-white border-none space-y-3"
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
              <span className="ml-3 font-satoshi flex items-center gap-x-2">
                {lang.config.isActive ? lang.config.label : 'Coming soon'}
                {lang.language === selectedLanguageState && (
                  <CheckIcon className="size-3" />
                )}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        <Button variant="secondary">Submit your suggestion</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
