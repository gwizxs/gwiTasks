import { Breadcrumb, Layout, Menu,  theme } from "antd";
import { observer } from "mobx-react-lite";
import Header from "../../header/components/Nav/Navbar";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Footers from "../../footer/ui/Footer";
import {  useState } from "react";
import items from "../../../pages/MenuItem";
import 'app/App.css'
import { useColor } from "app/_providers/color-Context";
import cl from './Bode.module.scss'


interface BodyIn {
  children: React.ReactNode,
  selectedKey: string,
  BreadName: string,
}


const Body = observer(({children, selectedKey, BreadName, }: BodyIn) => {
  const { color } = useColor();

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  
      return (
            <>
              <Header />
              <Layout style={{ minHeight: '100vh'  }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                  <div className="demo-logo-vertical" style={{backgroundColor: color   }}/>
                  <Menu theme="dark" defaultSelectedKeys={[selectedKey]} mode="inline" items={items}  />
                </Sider>
                <Layout style={{backgroundColor: color}}>
                  <Content style={{ margin: '16px 16px'}}>
                    <Breadcrumb style={{ margin: '16px 0px', backgroundColor: "#f0f0f0", width: '10%', borderRadius: '5px'  }}>
                      <Breadcrumb.Item className={cl.breadCrStyle}>{BreadName}</Breadcrumb.Item>
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
          
                  <Footers />
                </Layout>
              </Layout>
        </>
      );
    })
      

export default Body; 