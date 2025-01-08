'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { fetchRoadmap } from '@/utils/data/roadmap/fetch-single-roadmap';
import { Loader2 } from 'lucide-react';

interface EditRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => void;
  roadmapUid: string;
}

export function EditRoadmapModal({
  isOpen,
  onClose,
  onSave,
  roadmapUid,
}: EditRoadmapModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['roadmap-fetch', roadmapUid],
    queryFn: async () => {
      return await fetchRoadmap({
        roadmapUid,
      });
    },
    enabled: isOpen, // Only fetch when the modal is open
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDescription(data.description || '');
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black-75 text-white border border-black-50 max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Roadmap Details</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center">
            Error loading roadmap data:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-black-100 border-black-50 text-white"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                  className="bg-black-100 border-black-50 text-white"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
