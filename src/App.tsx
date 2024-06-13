/* eslint-disable no-unexpected-multiline */
import React, { useState } from 'react';
import './App.css';
import './style/reset.css'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Dashboard from './components/dashboard';
import Header from './components/header'
import {  observer } from 'mobx-react-lite';
import Footers from './components/footer';
import items from './pages/MenuItem';




const { Content, Sider } = Layout;



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  

  return (
        <>
          <Header />
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div className="demo-logo-vertical" />
              <Menu theme="dark" defaultSelectedKeys={['sub0']} mode="inline" items={items} />
            </Sider>
            <Layout>
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0', backgroundColor: "#f0f0f0" }}>
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
              <Footers/>
            </Layout>
          </Layout>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);