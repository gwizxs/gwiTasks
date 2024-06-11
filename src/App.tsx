import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Spin } from 'antd';
import Dashboard from './components/dashboard';
import Header from './components/header'
import {  observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';




const { Content, Footer, Sider } = Layout;

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
  getItem(<Link to="/vite-project/">Home</Link>, 'sub0', <HomeOutlined />),
  getItem(<Link to="/vite-project/Me">Me</Link>, 'sub1', <UserOutlined />),
  
getItem
('Team', 'sub2', <TeamOutlined />, [
  getItem(<Link to="/vite-project/Team/1">Team 1</Link>, '6'),
  getItem(<Link to="/vite-project/Team/2">Team 2</Link>, '8'),
]),
getItem(<Link to="/vite-project/About">About</Link>, '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false)
      }, 50);
    };

    fetchData();
  }, []);
  

  return (
    <>
      {isLoading ? (
        <Spin tip="Loading" size="large" className='load'>
          .
        </Spin>
      ) : (
        <>
          <Header />
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div className="demo-logo-vertical" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <main>
                    <Dashboard />
                  </main>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                gwask ©{new Date().getFullYear()} Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);