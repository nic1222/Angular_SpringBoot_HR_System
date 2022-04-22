import { NbMenuItem } from '@nebular/theme';

export const HR_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'QR Generator',
    icon: 'grid-outline',
    link: '/qrgenr',
  },
  {
    title: 'User Management',
    icon: 'people-outline',
    link: '/user-mgmt',
  },
  {
    title: 'Attendance',
    icon: 'calendar-outline',
    link: '/attendance',
  },
  {
    title: 'Leave Management',
    icon: 'layout-outline',
    link: '/leave',
  },
  {
    title: 'Event',
    icon: 'briefcase-outline',
    link: '/event',
  }

];

export const EMP_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'QR Scan',
    icon: 'camera-outline',
    children: [
      {
        title: 'Clock In',
        link: '/qrscan',
      },
      {
        title: 'Clock Out',
        link: '/qrscan-out',
      },
    ],
  },
  {
    title: 'Attendance',
    icon: 'calendar-outline',
    link: '/attendance',
  },
  {
    title: 'E-Leave',
    icon: 'layout-outline',
    link: '/leave',
  }
];