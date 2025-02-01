'use client'

import { deleteRoadmap } from '@/actions/roadmap/delete-roadmap'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash2 } from 'lucide-react'

export default function RoadmapCardMenu(opts: {
  roadmapUid: string
  onDeleteStart: () => void
  onDeleteEnd: () => void
}) {
  const { roadmapUid, onDeleteStart, onDeleteEnd } = opts

  const userDeleteRoadmap = async () => {
    onDeleteStart()
    try {
      await deleteRoadmap(roadmapUid)
    } finally {
      onDeleteEnd()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          padding="none"
          className="hover:bg-black-50 h-fit p-0.5"
        >
          <MoreHorizontal className="size-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="bg-black-75 border border-black-50 text-white hover:text-white"
      >
        <DropdownMenuItem>
          <button
            onClick={userDeleteRoadmap}
            className="flex items-center gap-2"
          >
            <Trash2 className="size-4 text-destructive" />
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
