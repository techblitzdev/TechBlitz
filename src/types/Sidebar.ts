export interface SidebarItem {
  title: string;
  url: string;
  icon?: React.ComponentType;
  subItems?: SidebarItem[];
  chip?: React.ComponentType;
}