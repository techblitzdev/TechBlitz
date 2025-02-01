"use client";

import { useState, type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export interface TabConfig {
  value: string;
  label: string;
  icon: ReactNode;
  activeIcon: ReactNode;
  content: ReactNode;
}

interface ReusableTabsProps {
  tabs: TabConfig[];
  defaultTab?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}

export default function QuestionTabs({
  tabs,
  defaultTab,
  headerContent,
  footerContent,
}: ReusableTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || tabs[0].value,
  );

  return (
    <Tabs
      defaultValue={defaultTab || tabs[0].value}
      className="h-full bg-black-75 border border-black-50 rounded-lg flex flex-col overflow-hidden"
    >
      <div className="p-4 lg:px-3 lg:py-2 w-full flex flex-col gap-3 md:flex-row justify-between bg-black-25 md:items-center">
        <div className="flex items-center gap-2 justify-between w-full">
          <TabsList className="hidden lg:grid h-auto w-fit grid-cols-3 gap-5 text-white rounded-lg bg-transparent p-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
              >
                <div className="mr-2">
                  {activeTab === tab.value ? tab.activeIcon : tab.icon}
                </div>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {headerContent}
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex-1 bg-black overflow-y-auto scrollable-element">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
      {footerContent && (
        <>
          <Separator className="bg-black-50" />
          <div className="w-full space-y-4 bg-black">{footerContent}</div>
        </>
      )}
    </Tabs>
  );
}
