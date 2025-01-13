export type Profile = {
  uid: string;
  userUid: string;

  // Social links
  instagram?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  twitch?: string | null;
  website?: string | null;

  // Profile URL
  handle: string;

  // Bio and location
  bio?: string | null;
  location?: string | null;
  country?: string | null;
  timezone?: string | null;

  // Professional info
  company?: string | null;
  jobTitle?: string | null;
  yearsOfExperience?: number | null;

  // Skills and interests
  programmingLanguages: string[];
  frameworks: string[];
  interests: string[];

  // Projects
  projects: string[];

  // Visibility settings
  isPublic: boolean;
  showEmail: boolean;
  showLocation: boolean;

  // Customization
  accentColor?: string | null;
  bannerImage?: string | null;

  // Stats
  viewCount: number | null;
  lastViewed?: Date | null;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
};
