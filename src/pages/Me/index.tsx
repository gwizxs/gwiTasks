import { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme} from 'antd';
import Header from '../../components/header';
import { observer } from 'mobx-react-lite';
import Footers from '../../components/footer';
import CardMe from './CardMe';
import CardDetails from './CardDetails';
import items from '../MenuItem';

const { Content, Sider } = Layout;

const Me = observer(() => {
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
          <Menu theme="dark" defaultSelectedKeys={['sub1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0', backgroundColor: '#f0f0f0' }}>
              <Breadcrumb.Item>Me</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                display: 'flex',
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div style={{ display: 'flex' }}>
                <CardMe />
                <CardDetails />
              </div>
            </div>
          </Content>
          <Footers />
        </Layout>
      </Layout>
    </>
  );
})

export default Me;
