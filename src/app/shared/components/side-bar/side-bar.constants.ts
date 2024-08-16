import { ILink } from './sidebar.model';

export const links: ILink[] = [
  {
    path: '/',
    iconName: 'pie-chart',
    title: 'Dashboard',
  },
  {
    path: '/e-commerce',
    iconName: 'shopping-cart',
    title: 'E-commerce',
  },
  {
    path: '/users',
    iconName: 'users',
    title: 'Users',
  },
];
export const quickLinks: ILink[] = [
  {
    path: '/',
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
