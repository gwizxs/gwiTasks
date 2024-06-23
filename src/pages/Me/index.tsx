/* eslint-disable no-unexpected-multiline */
import {  useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Card} from 'antd';
import Header from '../../components/header';
import { observer } from 'mobx-react-lite';
import { Input } from 'antd';
import Uploads from './Uploads';
import Footers from '../../components/footer';
import CardMe from './CardMe';
import Btn from '../../components/UI/Btn';
import items from '../MenuItem';


const { Content, Sider } = Layout;
const { TextArea } = Input;

  const Me = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  

  return  (
        <>
        <Header />
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div className="demo-logo-vertical" />
              <Menu theme= "dark" defaultSelectedKeys={['sub1']} mode="inline" items={items} />
            </Sider>
            <Layout>
              <Content style={{ margin: '0 16px'}}>
                <Breadcrumb style={{ margin: '16px 0', backgroundColor: "#f0f0f0"  }}>
                  <Breadcrumb.Item>Me</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ 
                 display: 'flex', 
                 padding: 24,
                 minHeight: 360,
                 background: colorBgContainer,
                 borderRadius: borderRadiusLG,
               }}
          >

<div style={{ display: 'flex' }}>
  <CardMe />
  <div style={{ flex: 2 }}>
    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Uploads />
        <div style={{ marginLeft: 20 }}>
          <Input showCount maxLength={20} placeholder="введите новое имя" />
        </div>
      </div>
      <TextArea showCount maxLength={100} placeholder="введите новое описание" style={{ resize: 'none', width: '100%' }} />
      <div>
      <div style={{   marginTop: 40, float: 'right' }}> 
        <Btn onClick={() => onclick} />
      </div>
      </div>
    </Card>
  </div>
</div>


              </div>
              </Content>
              <Footers/>
            </Layout>
          </Layout>
      </>
    );
  };
      
// eslint-disable-next-line react-refresh/only-export-components
export default observer(Me)