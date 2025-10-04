// Navigation types for the B2E platform

export type NavigationItem = {
  id: string;
  label: string;
  labelAr?: string;
  icon: string;
  path: string;
  badge?: number;
  children?: NavigationItem[];
  roles?: string[]; // Role-based access
  feature?: string; // Feature flag
}

export type NavigationGroup = {
  id: string;
  label: string;
  labelAr?: string;
  items: NavigationItem[];
}

export type Breadcrumb = {
  label: string;
  path?: string;
}
