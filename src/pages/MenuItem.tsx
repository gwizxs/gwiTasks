import { Link } from 'react-router-dom';
import {
  UserOutlined,
  HomeOutlined,
  BuildOutlined,
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
  getItem(<Link to="/Home">Home</Link>, 'sub0', <HomeOutlined />),
  getItem(<Link to="/Me">Me</Link>, 'sub1', <UserOutlined />),
  getItem(<Link to="/time-blocking">Time-block</Link>, 'sub3', <BuildOutlined />),
  getItem(<Link to="/customize">customize</Link>, 'sub4', <SettingOutlined spin />),
];

export default items;