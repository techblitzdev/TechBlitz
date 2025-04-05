export interface SidebarItem {
  title: string | React.ReactNode;
  url: string;
  icon?: React.ComponentType;
  subItems?: SidebarItem[];
  chip?: React.ComponentType;
  groupLabel?: string;
  disabled?: boolean;
  badge?: string | React.ReactNode;
  dropdownMenu?: React.ReactNode;
  tooltip?: string;
  defaultOpen?: boolean;
  animatable?: boolean;
}

interface SidebarGroupItem {
  groupLabel: string;
}

export type SidebarItemType = SidebarItem | SidebarGroupItem;
