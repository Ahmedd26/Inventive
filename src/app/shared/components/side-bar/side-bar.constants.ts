import { ILink } from './sidebar.model';

export const links: ILink[] = [
  {
    path: '/',
    iconName: 'pie-chart',
    title: 'Dashboard',
  },
  {
    path: '/profile',
    iconName: 'user',
    title: 'Profile',
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
