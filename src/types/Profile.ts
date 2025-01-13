export type Profile = {
  uid: string;
  userUid: string;

  // Social links
  instagram?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  twitch?: string;
  website?: string;

  // Profile URL
  handle: string;

  // Bio and location
  bio?: string;
  location?: string;
  country?: string;
  timezone?: string;

  // Professional info
  company?: string;
  jobTitle?: string;
  yearsOfExperience?: number;

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
  accentColor?: string;
  bannerImage?: string;

  // Stats
  viewCount: number;
  lastViewed?: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
};
