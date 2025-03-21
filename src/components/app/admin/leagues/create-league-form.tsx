'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createLeague } from '@/actions/leagues/create-league';
import { toast } from 'sonner';

const leagueSchema = z.object({
  name: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']),
  color: z.enum(['CD7F32', 'C0C0C0', 'FFD700', 'E5E4E2', 'b9f2ff']),
  description: z.string().min(10).max(500),
  xpRequirement: z.number().min(0),
  resetDate: z.string(),
  canBeRelegated: z.boolean(),
  maxPowerUpsPerWeek: z.number().min(1).max(10),
  xpMultiplier: z.number().min(1).max(5),
  maxUsers: z.number().min(10).max(100),
  promotionCount: z.number().min(1),
  relegationCount: z.number().min(1),
  weeklyChallenge: z.string().optional(),
  weeklyChallengeXP: z.number().optional(),
});

type LeagueFormData = z.infer<typeof leagueSchema>;

export default function CreateLeagueForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeagueFormData>({
    resolver: zodResolver(leagueSchema),
    defaultValues: {
      canBeRelegated: true,
      maxPowerUpsPerWeek: 3,
      xpMultiplier: 1,
      maxUsers: 30,
      promotionCount: 3,
      relegationCount: 5,
    },
  });

  const onSubmit = async (data: LeagueFormData) => {
    try {
      setIsSubmitting(true);
      await createLeague(data);
      toast.success('League created successfully');
      router.push('/admin/leagues/list');
    } catch (error) {
      toast.error('Failed to create league');
      console.error('Failed to create league:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-white">
            League Name
          </Label>
          <select
            id="name"
            {...register('name')}
            className="w-full bg-black-50 text-white border border-black-25 rounded-md p-2"
          >
            <option value="BRONZE">Bronze League</option>
            <option value="SILVER">Silver League</option>
            <option value="GOLD">Gold League</option>
            <option value="PLATINUM">Platinum League</option>
            <option value="DIAMOND">Diamond League</option>
          </select>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="color" className="text-white">
            League Color
          </Label>
          <select
            id="color"
            {...register('color')}
            className="w-full bg-black-50 text-white border border-black-25 rounded-md p-2"
          >
            <option value="CD7F32">Bronze</option>
            <option value="C0C0C0">Silver</option>
            <option value="FFD700">Gold</option>
            <option value="E5E4E2">Platinum</option>
            <option value="b9f2ff">Diamond</option>
          </select>
          {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-white">
          Description
        </Label>
        <Textarea
          id="description"
          {...register('description')}
          className="bg-black-50 text-white border border-black-25"
          placeholder="Enter league description..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="xpRequirement" className="text-white">
            XP Requirement
          </Label>
          <Input
            id="xpRequirement"
            type="number"
            {...register('xpRequirement', { valueAsNumber: true })}
            className="bg-black-50 text-white border border-black-25"
          />
          {errors.xpRequirement && (
            <p className="text-red-500 text-sm mt-1">{errors.xpRequirement.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="resetDate" className="text-white">
            Reset Date
          </Label>
          <Input
            id="resetDate"
            type="datetime-local"
            {...register('resetDate')}
            className="bg-black-50 text-white border border-black-25"
          />
          {errors.resetDate && (
            <p className="text-red-500 text-sm mt-1">{errors.resetDate.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="maxPowerUpsPerWeek" className="text-white">
            Max Power-ups Per Week
          </Label>
          <Input
            id="maxPowerUpsPerWeek"
            type="number"
            {...register('maxPowerUpsPerWeek', { valueAsNumber: true })}
            className="bg-black-50 text-white border border-black-25"
          />
          {errors.maxPowerUpsPerWeek && (
            <p className="text-red-500 text-sm mt-1">{errors.maxPowerUpsPerWeek.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="xpMultiplier" className="text-white">
            XP Multiplier
          </Label>
          <Input
            id="xpMultiplier"
            type="number"
            step="0.1"
            {...register('xpMultiplier', { valueAsNumber: true })}
            className="bg-black-50 text-white border border-black-25"
          />
          {errors.xpMultiplier && (
            <p className="text-red-500 text-sm mt-1">{errors.xpMultiplier.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="maxUsers" className="text-white">
            Max Users
          </Label>
          <Input
            id="maxUsers"
            type="number"
            {...register('maxUsers', { valueAsNumber: true })}
            className="bg-black-50 text-white border border-black-25"
          />
          {errors.maxUsers && (
            <p className="text-red-500 text-sm mt-1">{errors.maxUsers.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="promotionCount" className="text-white">
            Promotion Count
          </Label>
          <Input
            id="promotionCount"
            type="number"
            {...register('promotionCount', { valueAsNumber: true })}
            className="bg-black-50 text-white border border-black-25"
          />
          {errors.promotionCount && (
            <p className="text-red-500 text-sm mt-1">{errors.promotionCount.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="relegationCount" className="text-white">
            Relegation Count
          </Label>
          <Input
            id="relegationCount"
            type="number"
            {...register('relegationCount', { valueAsNumber: true })}
            className="bg-black-50 text-white border border-black-25"
          />
          {errors.relegationCount && (
            <p className="text-red-500 text-sm mt-1">{errors.relegationCount.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="canBeRelegated"
            {...register('canBeRelegated')}
            className="bg-black-50 border border-black-25"
          />
          <Label htmlFor="canBeRelegated" className="text-white">
            Can be relegated
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="weeklyChallenge" className="text-white">
            Weekly Challenge
          </Label>
          <Input
            id="weeklyChallenge"
            {...register('weeklyChallenge')}
            className="bg-black-50 text-white border border-black-25"
            placeholder="Optional weekly challenge"
          />
          {errors.weeklyChallenge && (
            <p className="text-red-500 text-sm mt-1">{errors.weeklyChallenge.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="weeklyChallengeXP" className="text-white">
            Weekly Challenge XP
          </Label>
          <Input
            id="weeklyChallengeXP"
            type="number"
            {...register('weeklyChallengeXP', { valueAsNumber: true })}
            className="bg-black-50 text-white border border-black-25"
            placeholder="Optional XP reward"
          />
          {errors.weeklyChallengeXP && (
            <p className="text-red-500 text-sm mt-1">{errors.weeklyChallengeXP.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent hover:bg-accent/80 text-white"
        >
          {isSubmitting ? 'Creating...' : 'Create League'}
        </Button>
      </div>
    </form>
  );
}
