import type { ErrorCodes } from "@/types/Constants";

export const ERROR_CODES: ErrorCodes = {
  "not-authenticated": {
    title: "You need to sign in to access this page.",
    description:
      "To access this page, you need to sign in. Please sign in to continue.",
  },
  unauthorized:
    "You are not authorized to access this. Please login to access this site.",
  "no-user": {
    title: "No user found.",
    description: "No user was found. Please sign in to continue.",
  },
  "subscription-cancelled": {
    title: "Subscription cancelled.",
    description: "Your subscription has been cancelled.",
  },
};
