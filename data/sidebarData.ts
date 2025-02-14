import { IconType } from 'react-icons';
import { Vector1 } from '@/components/icons/Vector1';
import { Vector2 } from '@/components/icons/Vector2';
import { Vector3 } from '@/components/icons/Vector3';
import { Vector4 } from '@/components/icons/Vector4';
import { Vector5 } from '@/components/icons/Vector5';
import { Vector6 } from '@/components/icons/Vector6';
import { Vector7 } from '@/components/icons/Vector7';
import { Vector8 } from '@/components/icons/Vector8';
import { Vector10 } from '@/components/icons/Vector10';
import { Vector11 } from '@/components/icons/Vector11';
import { Friends } from '@/components/icons/Friends';

export interface SidebarItem {
  name: string;
  icon: IconType;
  path: string;
}

export const sidebarData: SidebarItem[] = [
  {
    name: 'Dashboard',
    icon: Vector8,
    path: '/'
  },
  {
    name: 'Cluster',
    icon: Vector1,
    path: '/cluster'
  },
  // {
  //   name: 'Jobs',
  //   icon: Vector2,
  //   path: '/jobs'
  // },
  // {
  //   name: 'Serve',
  //   icon: Vector3,
  //   path: '/serve'
  // },
  // {
  //   name: 'Actors',
  //   icon: Vector10,
  //   path: '/actors'
  // },
  // {
  //   name: 'Matrics',
  //   icon: Vector4,
  //   path: '/matrics'
  // },
  // {
  //   name: 'Logs',
  //   icon: Vector5,
  //   path: '/logs'
  // },
  // {
  //   name: 'Playground',
  //   icon: Vector11,
  //   path: '/playground'
  // },
  // {
  //   name: 'Model AI',
  //   icon: Vector6,
  //   path: '/modelai'
  // },
  // {
  //   name: 'Settings',
  //   icon: Vector7,
  //   path: '/settings'
  // },
  {
    name: 'Profile',
    icon: Friends,
    path: '/profile'
  }
];