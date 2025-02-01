'use client'

import { FileIcon, CopyIcon, CheckIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeSnippetProps {
  code: string
  language: string
  filename: string
  lightTheme: string
  darkTheme: string
}

export default function CodeSnippet({
  code,
  language,
  filename,
  lightTheme,
  darkTheme,
}: CodeSnippetProps) {
  const { theme, systemTheme } = useTheme()
  const [highlightedCode, setHighlightedCode] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    const selectedTheme = currentTheme === 'dark' ? darkTheme : lightTheme

    async function highlightCode() {
      const highlighted = await codeToHtml(code, {
        lang: language,
        theme: selectedTheme,
      })
      setHighlightedCode(highlighted)
    }

    highlightCode()
  }, [theme, systemTheme, code, language, lightTheme, darkTheme])

  const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          className="max-h-96 overflow-auto  bg-[#000] font-inter text-[10px] sm:text-xs [&>pre]:h-full [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      )
    } else {
      return (
        <pre className="h-full overflow-auto break-all p-4 font-inter text-xs  bg-[#000]">
          {code}
        </pre>
      )
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative w-full overflow-hidden rounded-xl border border-black-50">
        <div className="relative">
          <div
            className="flex items-center p-3 text-sm text-foreground justify-between"
            style={{
              background:
                'radial-gradient(128% 107% at 50% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
            }}
          >
            <div className="flex items-center">
              <FileIcon className="mr-2 h-4 w-4" />
              <span className="font-medium font-onest">{filename}</span>
            </div>
            <motion.div
              className="relative flex items-center cursor-pointer z-"
              onClick={handleCopy}
              title="Copy code"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CopyIcon className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          {renderCode(code, highlightedCode)}
        </div>
      </div>
    </div>
  )
}
