'use client';
import { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EditRoadmapModal } from './edit-roadmap-modal';
import { updateRoadmapDetails } from '@/actions/roadmap/update-roadmap-details';
import { useUser } from '@/hooks/useUser';
import { deleteRoadmap } from '@/actions/roadmap/delete-roadmap';
import { useRouter } from 'next/navigation';

export default function RoadmapDropdown(opts: { roadmapUid: string }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { user } = useUser();
  if (!user) return null;

  const router = useRouter();

  const handleEditRoadmap = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveRoadmap = async (data: {
    title: string;
    description: string;
  }) => {
    // Here you would typically save the data to your backend
    await updateRoadmapDetails(opts.roadmapUid, user?.uid, {
      title: data.title,
      description: data.description
    });
  };

  const handleRoadmapDelete = async () => {
    await deleteRoadmap(opts.roadmapUid, user.uid);
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
            className="size-8 hover:bg-black-100 hover:text-white border border-black-50 rounded-md relative group duration-200"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-black-75 text-white border border-black-50 w-56 p-2"
          align="end"
        >
          <Button
            variant="ghost"
            className="w-full justify-start text-left font-normal py-1.5 px-4 hover:text-white"
            onClick={handleEditRoadmap}
          >
            Edit roadmap details
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left font-normal py-1.5 text-destructive px-4 hover:text-white"
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
        roadmapUid={opts.roadmapUid}
        userUid={user.uid}
      />
    </>
  );
}
