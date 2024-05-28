import { FaGamepad, FaRobot, FaCog, FaUserCircle, FaServer, FaBriefcase, FaLayerGroup, FaUserFriends, FaThLarge, FaClipboardList } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IconType } from 'react-icons';

export interface SidebarItem {
  name: string;
  icon: IconType;
}

export const sidebarData: SidebarItem[] = [
  {
    name: 'Dashboard',
    icon: GoHomeFill
  },
  {
    name: 'Cluster',
    icon: FaServer
  },
  {
    name: 'Jobs',
    icon: FaBriefcase
  },
  {
    name: 'Serve',
    icon: FaLayerGroup
  },
  {
    name: 'Actors',
    icon: FaUserFriends
  },
  {
    name: 'Matrics',
    icon: FaThLarge
  },
  {
    name: 'Logs',
    icon: FaClipboardList
  },
  {
    name: 'Playground',
    icon: FaGamepad
  },
  {
    name: 'Model AI',
    icon: FaRobot
  },
  {
    name: 'Settings',
    icon: FaCog
  },
  {
    name: 'Profile',
    icon: FaUserCircle
  }
];