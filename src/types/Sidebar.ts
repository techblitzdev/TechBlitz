export interface SidebarItem {
  title: string;
  url: string;
  icon?: React.ComponentType;
  subItems?: SidebarItem[];
  chip?: React.ComponentType;
  groupLabel?: string
}

export interface SidebarGroupItem {
  groupLabel: string;
}

export type SidebarItemType = SidebarItem | SidebarGroupItem;