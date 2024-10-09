import { ILink } from './sidebar.model';

export const links: ILink[] = [
  {
    path: '/dashboard',
    iconName: 'pie-chart',
    title: 'Dashboard',
  },
  {
    path: '/inventory',
    iconName: 'home',
    title: 'Inventory',
  },
  {
    path: '/products',
    iconName: 'box',
    title: 'products',
  },
  {
    path: '/categories',
    iconName: 'bookmark',
    title: 'Categories',
  },
  {
    path: '/',
    iconName: 'truck',
    title: 'Orders',
  },
  {
    path: '/suppliers',
    iconName: 'share-2',
    title: 'suppliers',
  },
  {
    path: '/purchases',
    iconName: 'dollar-sign',
    title: 'Purchases',
  },
  {
    path: '/sales',
    iconName: 'crosshair',
    title: 'sales',
  },

  {
    path: '/users',
    iconName: 'users',
    title: 'Users',
  },
];
export const quickLinks: ILink[] = [
  {
    path: '/profile',
    iconName: 'user',
    title: 'profile',
  },
  {
    path: '/settings',
    iconName: 'settings',
    title: 'Settings',
  },
  {
    path: '/help',
    iconName: 'help-circle',
    title: 'Help',
  },
];
