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
import { Vector11} from '@/components/icons/Vector11';
import { Friends } from '@/components/icons/Friends';

export interface SidebarItem {
  name: string;
  icon: IconType;
}

export const sidebarData: SidebarItem[] = [
  {
    name: 'Dashboard',
    icon: Vector8
  },
  {
    name: 'Cluster',
    icon: Vector1
  },
  {
    name: 'Jobs',
    icon: Vector2
  },
  {
    name: 'Serve',
    icon: Vector3
  },
  {
    name: 'Actors',
    icon: Vector10
  },
  {
    name: 'Matrics',
    icon: Vector4
  },
  {
    name: 'Logs',
    icon: Vector5
  },
  {
    name: 'Playground',
    icon: Vector11
  },
  {
    name: 'Model AI',
    icon: Vector6
  },
  {
    name: 'Settings',
    icon: Vector7
  },
  {
    name: 'Profile',
    icon: Friends
  }
];