export interface SidebarItem {
  title: string | React.ReactNode;
  url: string;
  icon?: React.ComponentType;
  subItems?: SidebarItem[];
  chip?: React.ComponentType;
  groupLabel?: string;
  disabled?: boolean;
}

export interface SidebarGroupItem {
  groupLabel: string;
}

export type SidebarItemType = SidebarItem | SidebarGroupItem;
