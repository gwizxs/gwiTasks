import { Link } from 'react-router-dom';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
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
getItem(<Link to="/vite-project/Team">Team</Link>, 'sub2', <TeamOutlined />),
getItem(<Link to="/vite-project/About">About</Link>, 'sub3', <FileOutlined />),
getItem(<Link to="/vite-project/Settings">Setting</Link>, 'sub4', <SettingOutlined />),
];

export default items;