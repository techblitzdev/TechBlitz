'use client';
import { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EditRoadmapModal } from './edit-roadmap-modal';
import { updateRoadmapDetails } from '@/actions/roadmap/update-roadmap-details';
import { deleteRoadmap } from '@/actions/roadmap/delete-roadmap';
import { useRouter } from 'next/navigation';
import { UserRoadmaps } from '@/types/Roadmap';

export default function RoadmapDropdown(opts: { roadmap: UserRoadmaps }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const handleEditRoadmap = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveRoadmap = async (data: {
    title: string;
    description: string;
  }) => {
    await updateRoadmapDetails(opts.roadmap.uid, {
      title: data.title,
      description: data.description,
    });
  };

  const handleRoadmapDelete = async () => {
    await deleteRoadmap(opts.roadmap.uid);
    // redirect to the roadmaps page
    router.push('/roadmaps');
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 bg-black-100 hover:text-white border border-black-50 rounded-md relative group duration-200"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-black-75 text-white border border-black-50 w-40 p-1"
          align="end"
        >
          <Button
            variant="ghost"
            className="w-full justify-start text-left font-normal px-2 hover:text-white"
            onClick={handleEditRoadmap}
          >
            Edit roadmap details
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left font-normal px-2 py-1.5 text-destructive hover:text-white"
            onClick={handleRoadmapDelete}
          >
            Delete roadmap
          </Button>
        </PopoverContent>
      </Popover>

      <EditRoadmapModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => {
          handleSaveRoadmap(data);
          setIsEditModalOpen(false);
        }}
        roadmap={opts.roadmap}
      />
    </>
  );
}
