"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Home,
  Settings,
  LockIcon,
  User,
  CreditCard,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { ListBulletIcon } from "@radix-ui/react-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AppSidebarSubMenuItem from "@/components/app/navigation/sidebar-submenu-item";
import SidebarFooterComponent from "@/components/app/navigation/sidebar-footer";
import Logo from "@/components/ui/logo";
import LogoSmall from "@/components/ui/LogoSmall";

import type { SidebarItemType } from "@/types/Sidebar";

import { useEffect, useMemo } from "react";
import { UserRecord } from "@/types/User";
import { Question } from "@/types/Questions";
import { Profile } from "@/types/Profile";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomeIcon from "@/components/ui/icons/home";
import ChallengeIcon from "@/components/ui/icons/challenge";
import RoadmapIcon from "@/components/ui/icons/roadmap";
import StatsIcon from "@/components/ui/icons/stats";
import Award from "@/components/ui/icons/award";

const LeaderboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M2 21V9h5.5v12zm7.25 0V3h5.5v18zm7.25 0V11H22v10z"
    />
  </svg>
);

const statsIcon = () => (
  <StatsIcon fill="white" strokewidth={2} secondaryfill="white" />
);

const roadmapIcon = () => (
  <RoadmapIcon fill="white" strokewidth={2} secondaryfill="white" />
);

const challengeIcon = () => (
  <ChallengeIcon fill="white" strokewidth={2} secondaryfill="white" />
);

export function AppSidebar(opts: {
  user: UserRecord | null;
  profile: Profile | null;
  todaysQuestion: Question | null;
  hasAnsweredDailyQuestion: boolean;
}) {
  const { user, todaysQuestion, hasAnsweredDailyQuestion, profile } = opts;
  const pathname = usePathname();

  const { state, setOpenMobile } = useSidebar();

  // close the sidebar whenever the path changes
  // only on mobile
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname]);

  const nonAuthedUserItems: SidebarItemType[] = [
    {
      title: "Questions",
      url: "/questions",
      icon: ListBulletIcon,
      tooltip: "Questions",
      subItems: [
        {
          title: "All",
          url: "/questions",
        },
        {
          title: "Daily Question",
          url: `/question/${todaysQuestion?.slug}`,
        },
        {
          title: "Study Paths",
          url: "/study-paths",
        },
      ],
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: LeaderboardIcon,
      tooltip: "Leaderboard",
    },
  ];

  const standardItems: SidebarItemType[] = [
    {
      groupLabel: "Menu",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
      tooltip: "Dashboard",
    },
    {
      title: "Questions",
      url: "/questions",
      icon: challengeIcon,
      tooltip: "Questions",
      subItems: [
        {
          title: "All",
          url: "/questions",
        },
        {
          title: "Study Paths",
          url: "/study-paths",
        },
        {
          title: "Daily Question",
          url: `/question/${todaysQuestion?.slug}`,
          badge: (
            <>
              {!hasAnsweredDailyQuestion && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="size-2 rounded-full bg-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Answer today's question!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          ),
        },
      ],
    },
    {
      title: "Roadmaps",
      tooltip: "Roadmaps",
      url: "/roadmaps",
      icon: roadmapIcon,
    },
    {
      title: "Stats",
      url: "/statistics",
      icon: statsIcon,
      tooltip: "Statistics",
      subItems: [
        {
          title: "Overview",
          url: "/statistics",
        },
        {
          title: "Reports",
          tooltip: "Reports",
          url: "/statistics/reports",
        },
      ],
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: Award,
      tooltip: "Leaderboard",
    },
    {
      groupLabel: "Support",
    },
    {
      title: "Help",
      url: "mailto:team@techblitz.dev",
      icon: HelpCircle,
      tooltip: "Help",
    },
    {
      title: "Settings",
      url: "/settings/profile",
      icon: Settings,
      tooltip: "Settings",
    },
  ];

  const settingsItems: SidebarItemType[] = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      groupLabel: "Settings",
    },
    {
      title: "Profile",
      url: "/settings/profile",
      icon: User,
    },
    {
      title: "Account",
      url: "/settings/account",
      icon: Settings,
    },
    {
      title: "Billing",
      url: "/settings/billing",
      icon: CreditCard,
    },
  ];

  // if user is not authed, show nonAuthedUserItems
  const items = useMemo(() => {
    if (!user) return nonAuthedUserItems;

    let menuItems = pathname.startsWith("/settings")
      ? settingsItems
      : standardItems;

    // Add admin item only once for admin users
    if (user.userLevel === "ADMIN") {
      menuItems = [
        ...menuItems,
        {
          title: "Admin",
          url: "/dashboard/admin",
          icon: LockIcon,
        },
      ];
    }

    return menuItems;
  }, [user, pathname]);

  const renderSidebarItem = (item: SidebarItemType) => {
    if ("groupLabel" in item) {
      return (
        <SidebarGroup key={item.groupLabel} className="mt-2">
          <SidebarGroupLabel className="px-0 py-0 h-fit text-sm font-inter">
            {item.groupLabel}
          </SidebarGroupLabel>
        </SidebarGroup>
      );
    }

    return (
      <SidebarMenuItem key={item.url}>
        {item.subItems ? (
          <Collapsible defaultOpen className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild tooltip={item.tooltip}>
                {state === "collapsed" ? (
                  <Link href={item.url} className="flex items-center w-full">
                    {item.icon && <item.icon />}
                    <span className="text-sm font-inter group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <div className="ms-auto group-data-[collapsible=icon]:hidden">
                      {item.chip && <item.chip />}
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center w-full">
                    {item.icon && <item.icon />}
                    <span className="text-sm font-inter group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <div className="ms-auto group-data-[collapsible=icon]:hidden">
                      {item.chip && <item.chip />}
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                      <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                  </div>
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AppSidebarSubMenuItem item={item} />
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <div className="flex items-center w-full">
            <SidebarMenuButton
              asChild
              className="flex-grow"
              tooltip={item.tooltip}
            >
              {item.disabled ? (
                <div className="flex items-center font-inter font-medium text-sm p-2 gap-x-2 opacity-50 hover:cursor-not-allowed h-8">
                  {item.icon && <item.icon />}
                  <span className="text-sm font-inter group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                  <div className="ms-auto group-data-[collapsible=icon]:hidden">
                    {item.chip && <item.chip />}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.url}
                  prefetch
                  className={`flex items-center font-inter font-medium text-sm py-2 ${
                    pathname === item.url
                      ? "bg-black-25 text-white border border-black-50"
                      : ""
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span className="text-sm group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                  {item.chip && (
                    <div className="ms-auto group-data-[collapsible=icon]:hidden">
                      {item.chip && <item.chip />}
                    </div>
                  )}
                  {item.badge && (
                    <SidebarMenuBadge className="!bg-transparent group-data-[collapsible=icon]:hidden">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </Link>
              )}
            </SidebarMenuButton>
            {item.dropdownMenu && (
              <div className="group-data-[collapsible=icon]:hidden">
                {item.dropdownMenu}
              </div>
            )}
          </div>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="z-50 group">
      <SidebarContent className="py-6 bg-[#000000]">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full flex items-center justify-between">
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm xl:text-2xl font-inter hover:text-white duration-300"
                prefetch
                aria-label="Go back to dashboard"
              >
                <Logo />
              </Link>
            ) : (
              <div className="text-sm xl:text-2xl font-inter hover:text-white duration-300">
                <Logo />
              </div>
            )}
            <SidebarTrigger className="size-5 h-7 opacity-0 group-hover:opacity-100 duration-300 -right-1 group-hover:right-0 transition-all" />
          </SidebarGroupLabel>
          {/* This div will show when the sidebar is collapsed */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center h-8 mb-5">
            <Link
              href="/dashboard"
              className="text-sm xl:text-2xl font-inter hover:text-white duration-300 size-10"
              prefetch
              aria-label="Go back to dashboard"
            >
              <LogoSmall />
            </Link>
          </div>
          <SidebarGroupContent className="mt-5 bg-[#000000]">
            <SidebarMenu>
              {items.map((item) => renderSidebarItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterComponent user={user} profile={profile} />
      <SidebarRail />
    </Sidebar>
  );
}
