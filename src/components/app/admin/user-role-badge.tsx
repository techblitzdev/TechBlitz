'use client';

interface UserRoleBadgeProps {
  role: string;
}

export default function UserRoleBadge({ role }: UserRoleBadgeProps) {
  let badgeClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ';

  switch (role) {
    case 'ADMIN':
      badgeClasses += 'bg-blue-900 text-blue-300';
      break;
    case 'PREMIUM':
      badgeClasses += 'bg-purple-900 text-purple-300';
      break;
    case 'LIFETIME':
      badgeClasses += 'bg-amber-900 text-amber-300';
      break;
    case 'TRIAL':
      badgeClasses += 'bg-teal-900 text-teal-300';
      break;
    case 'FREE':
      badgeClasses += 'bg-gray-700 text-gray-300';
      break;
    default:
      badgeClasses += 'bg-gray-700 text-gray-300';
  }

  return <span className={badgeClasses}>{role}</span>;
}
