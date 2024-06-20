import { Link } from 'react-router-dom';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/vite-project/Home">Home</Link>, 'sub0', <HomeOutlined />),
  getItem(<Link to="/vite-project/Me">Me</Link>, 'sub1', <UserOutlined />),
getItem(<Link to="/vite-project/time-blocking">Time-block</Link>, 'sub3', <BuildOutlined />),
getItem(<Link to="/vite-project/Settings">Setting</Link>, 'sub4', <SettingOutlined />),
];

export default items;