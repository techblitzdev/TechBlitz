import { Filter } from 'bad-words'

import type { StatsChartData } from '@/components/app/statistics/total-question-chart'

/**
 * Method to get the current environment
 *
 * @returns 'development' | 'production' | 'test'
 */
const getEnv = () => process.env.NODE_ENV

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_URL || ''
  return getEnv() === 'development' ? 'http://localhost:3000' : publicRootDomain
}

export const capitalise = (string: string) => {
  if (!string) return ''
  // lowercase the whole string
  const lowercaseString = string?.toLowerCase()
  return lowercaseString[0]?.toUpperCase() + lowercaseString?.slice(1)
}

export const getQuestionDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'BEGINNER':
      return {
        bg: 'bg-blue-600/20',
        text: 'text-blue-300',
        border: 'border-blue-600/30',
        hover: 'hover:bg-blue-600/30',
      }
    case 'EASY':
      return {
        bg: 'bg-green-500/20',
        text: 'text-green-300',
        border: 'border-green-500/30',
        hover: 'hover:bg-green-500/30',
      }
    case 'MEDIUM':
      return {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-300',
        border: 'border-yellow-500/30',
        hover: 'hover:bg-yellow-500/30',
      }
    case 'HARD':
      return {
        bg: 'bg-red-500/20',
        text: 'text-red-300',
        border: 'border-red-500/30',
        hover: 'hover:bg-red-500/30',
      }
    default:
      return {
        bg: 'bg-gray-500/20',
        text: 'text-gray-300',
        border: 'border-gray-500/30',
        hover: 'hover:bg-gray-500/30',
      }
  }
}

/**
 * A method to easily truncate and add ellipsis to any string.
 *
 * @param content
 * @param wordLimit
 */
export const shortenText = (content: string, wordLimit: number) => {
  return content.length > wordLimit
    ? `${content.substring(0, wordLimit)}...`
    : content
}

export const filterBadWords = (content: string) => {
  const filter = new Filter({ placeHolder: '*' })
  return filter.clean(content)
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateFakeData(days: number): StatsChartData {
  const data: StatsChartData = {}
  const tags = ['Arrays', 'Strings', 'Dynamic Programming', 'Trees', 'Graphs']
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(currentDate.getDate() + i)
    const dateString = currentDate.toISOString().split('T')[0]

    const totalQuestions = randomInt(5, 30)
    const tagCounts: Record<string, number> = {}
    tags.forEach((tag) => {
      tagCounts[tag] = randomInt(0, Math.floor(totalQuestions / 2))
    })

    data[dateString] = {
      totalQuestions,
      tagCounts,
      tags,
    }
  }

  return data
}
