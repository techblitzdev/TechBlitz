'use client'

import { Tag } from '@prisma/client'
/**
 * Context to share the state of the searchQuery
 */
import { createContext, useContext, useState } from 'react'

type FilterContextType = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  tags: Tag[]
}

const FilterContext = createContext<FilterContextType | null>(null)

export const FilterContextProvider = ({
  children,
  tags,
}: {
  children: React.ReactNode
  tags: Tag[]
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <FilterContext.Provider value={{ searchQuery, setSearchQuery, tags }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error(
      'useFilterContext must be used within a FilterContextProvider',
    )
  }
  return context
}
