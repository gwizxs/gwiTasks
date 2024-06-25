
import { Breadcrumb, Layout, Menu,  theme } from "antd";
import { observer } from "mobx-react-lite";
import Header from "../../components/header";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Footers from "../../components/footer";
import {  useState } from "react";
import items from "../MenuItem";
import { TimeBlList } from "./Form/Timelist";
import { FormProvider, useForm } from "react-hook-form";
import type { TypeTimeBlockFormState } from "../../types/time-block.types";
import TimeBlForm from "./Form/TimeForm";
import styles from './TimeBlocking.module.scss'



const TimeBlocking = observer(() => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const methods = useForm<TypeTimeBlockFormState>()
  



      return (
            <FormProvider {...methods}>
              <Header />
              <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                  <div className="demo-logo-vertical" />
                  <Menu theme="dark" defaultSelectedKeys={['sub3']} mode="inline" items={items} />
                </Sider>
                <Layout>
                  <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0', backgroundColor: "#f0f0f0" }}>
                      <Breadcrumb.Item>Time block</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                      style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                      }}
                    >
                     <FormProvider {...methods}>
                     <div className={styles.DivBlock}>
                         <TimeBlList/>
                         <TimeBlForm/>
                     </div>
                     </FormProvider>
                    </div>
                  </Content>
                  <Footers/>
                </Layout>
              </Layout>
        </FormProvider>
      );
    })
      
export default TimeBlocking;