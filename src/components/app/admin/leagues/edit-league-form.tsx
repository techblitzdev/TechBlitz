'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateLeague } from '@/actions/leagues/update-league';
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

type LeagueFormValues = z.infer<typeof leagueSchema>;

export default function EditLeagueForm({ league }: { league: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', success: true });

  const form = useForm<LeagueFormValues>({
    resolver: zodResolver(leagueSchema),
    defaultValues: {
      name: league.name,
      color: league.color,
      description: league.description,
      xpRequirement: league.xpRequirement,
      resetDate: league.resetDate.toISOString().split('T')[0],
      canBeRelegated: league.canBeRelegated,
      maxPowerUpsPerWeek: league.maxPowerUpsPerWeek,
      xpMultiplier: league.xpMultiplier,
      maxUsers: league.maxUsers || 30,
      promotionCount: league.promotionCount || 3,
      relegationCount: league.relegationCount || 5,
      weeklyChallenge: league.weeklyChallenge || '',
      weeklyChallengeXP: league.weeklyChallengeXP || 0,
    },
  });

  async function onSubmit(data: LeagueFormValues) {
    try {
      setIsSubmitting(true);
      await updateLeague(league.uid, data);
      toast.success('League updated successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update league');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-black-75 rounded-lg p-6">
      {formStatus.message && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            formStatus.success
              ? 'bg-green-900/20 text-green-700 dark:text-green-300'
              : 'bg-red-900/20 text-red-700 dark:text-red-300'
          }`}
        >
          {formStatus.message}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border-b border-black-50 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-white">Edit League</h2>
            <p className="text-sm text-gray-400">Update the details for this league</p>
          </div>

          <Tabs defaultValue="basic" className="space-y-6 border-black-50">
            <TabsList className="bg-black-100 border-black-50">
              <TabsTrigger value="basic" className="text-white data-[state=active]:bg-black-50">
                Basic Information
              </TabsTrigger>
              <TabsTrigger
                value="requirements"
                className="text-white data-[state=active]:bg-black-50"
              >
                Requirements
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className="text-white data-[state=active]:bg-black-50"
              >
                Challenges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="bg-black-75 border-black-50">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">League Color *</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full rounded-md border border-black-50 bg-black-100 px-3 py-2 text-white"
                          >
                            <option value="CD7F32">Bronze</option>
                            <option value="C0C0C0">Silver</option>
                            <option value="FFD700">Gold</option>
                            <option value="E5E4E2">Platinum</option>
                            <option value="b9f2ff">Diamond</option>
                          </select>
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Choose the color for this league tier
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">League Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="w-full rounded-md border border-black-50 bg-black-100 px-3 py-2 text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Describe the league and its requirements
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <Card className="bg-black-75 border-black-50">
                <CardHeader>
                  <CardTitle className="text-white">League Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="xpRequirement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">XP Requirement *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="bg-black-100 border-black-50 text-white"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Minimum XP needed to join this league
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxUsers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Max Users *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="bg-black-100 border-black-50 text-white"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Maximum number of users allowed in the league
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="promotionCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Promotion Count *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="bg-black-100 border-black-50 text-white"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Number of users promoted each reset
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="relegationCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Relegation Count *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="bg-black-100 border-black-50 text-white"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Number of users relegated each reset
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="canBeRelegated"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border border-black-50 p-4 bg-black-100">
                        <div className="space-y-0.5">
                          <FormLabel className="text-white">Can Be Relegated</FormLabel>
                          <FormDescription className="text-gray-400">
                            Allow users to be relegated from this league
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges">
              <Card className="bg-black-75 border-black-50">
                <CardHeader>
                  <CardTitle className="text-white">Weekly Challenges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="weeklyChallenge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Weekly Challenge</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-black-100 border-black-50 text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Description of the current weekly challenge
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weeklyChallengeXP"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Challenge XP Reward</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="bg-black-100 border-black-50 text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          XP awarded for completing the weekly challenge
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="pt-6 border-t border-black-50 flex justify-between items-center">
            <div>
              {formStatus.message && (
                <p className={formStatus.success ? 'text-green-500' : 'text-red-500'}>
                  {formStatus.message}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/leagues/list')}
                className="border-black-50 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                    Processing...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
