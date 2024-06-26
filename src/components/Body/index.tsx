import { Breadcrumb, Layout, Menu,  theme } from "antd";
import { observer } from "mobx-react-lite";
import Header from "../header";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Footers from "../footer";
import {  useState } from "react";
import items from "../../pages/MenuItem";
import '../../App.css'

interface BodyIn {
  children: React.ReactNode,
  selectedKey: string,
  BreadName: string
}


const Body = observer(({children, selectedKey, BreadName}: BodyIn) => {
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
                  <Menu theme="dark" defaultSelectedKeys={[selectedKey]} mode="inline" items={items} />
                </Sider>
                <Layout>
                  <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0', backgroundColor: "#f0f0f0" }}>
                      <Breadcrumb.Item>{BreadName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                      style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                      }}
                    >
                      {children}
                    </div>
                  </Content>
                  <Footers/>
                </Layout>
              </Layout>
        </>
      );
    })
      

export default Body; 