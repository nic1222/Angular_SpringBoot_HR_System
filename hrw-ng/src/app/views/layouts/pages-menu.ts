import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'QR Attendance',
    group: true,
  },
  {
    title: 'QR Scan',
    icon: 'camera-outline',
    link: '/qrscan',
    home: true,
  },
  {
    title: 'QR Generator',
    icon: 'grid-outline',
    link: '/qrgenr',
  },
  {
    title: 'User Management',
    icon: 'keypad-outline',
    link: '/user-mgmt',
  },
  {
    title: 'Attendance',
    icon: 'calendar-outline',
    link: '/attendance',
  },
  {
    title: 'Attendance',
    group: true,
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
];
