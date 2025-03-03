'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { userLevel, UserExperienceLevel, UserTimeSpendingPerDay } from '@prisma/client';

interface UserEditFormProps {
  user: any; // Type this fully with Prisma when we have the schema
}

export default function UserEditForm({ user }: UserEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic info
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    username: user.username || '',
    userLevel: user.userLevel,
    experienceLevel: user.experienceLevel,
    timeSpendingPerDay: user.timeSpendingPerDay || 'LESS_THAN_5_MINUTES',

    // Profile info
    bio: user.Profile?.bio || '',
    location: user.Profile?.location || '',
    company: user.Profile?.company || '',
    jobTitle: user.Profile?.jobTitle || '',
    yearsOfExperience: user.Profile?.yearsOfExperience || '',
    website: user.Profile?.website || '',
    github: user.Profile?.github || '',
    twitter: user.Profile?.twitter || '',
    linkedin: user.Profile?.linkedin || '',

    // Subscription
    subscriptionActive: user.subscription?.active || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/users/${user.uid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      toast.success('User updated successfully');
      router.refresh();
      router.push(`/admin/users/${user.uid}`);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="userLevel" className="block text-sm font-medium text-white mb-1">
              User Role
            </label>
            <select
              id="userLevel"
              name="userLevel"
              value={formData.userLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            >
              {Object.values(userLevel).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-white mb-1">
              Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            >
              {Object.values(UserExperienceLevel).map((level) => (
                <option key={level} value={level}>
                  {level.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="timeSpendingPerDay"
              className="block text-sm font-medium text-white mb-1"
            >
              Daily Time Commitment
            </label>
            <select
              id="timeSpendingPerDay"
              name="timeSpendingPerDay"
              value={formData.timeSpendingPerDay}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            >
              {Object.values(UserTimeSpendingPerDay).map((time) => (
                <option key={time} value={time}>
                  {time.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-white mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-white mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-white mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label
              htmlFor="yearsOfExperience"
              className="block text-sm font-medium text-white mb-1"
            >
              Years of Experience
            </label>
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Social Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-white mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="github" className="block text-sm font-medium text-white mb-1">
              GitHub
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-white mb-1">
              Twitter
            </label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-white mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black-100 border border-black-50 rounded-md text-white"
            />
          </div>
        </div>
      </div>

      {/* Subscription Information */}
      {user.subscription && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Subscription</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="subscriptionActive"
              name="subscriptionActive"
              checked={formData.subscriptionActive}
              onChange={handleChange}
              className="h-4 w-4 bg-black-100 border-black-50 rounded"
            />
            <label htmlFor="subscriptionActive" className="ml-2 block text-sm text-white">
              Active Subscription
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Plan: {user.subscription.planId} | Product: {user.subscription.productId}
          </p>
        </div>
      )}

      {/* Form Actions */}
      <div className="pt-5 border-t border-black-50">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push(`/admin/users/${user.uid}`)}
            className="px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}
