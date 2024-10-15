import { Typography, Row, Col, Space, Card } from "antd";
import './header.module.scss';
import LogoutBtn from "features/Logout/ui/LogoutBtn";
import Statistics from "features/Statistic/ui/Statistic";
import { observer } from "mobx-react-lite";
import User from "entities/common/ui/User";
import logo from 'shared/assets/icon/Avatar.webp'
import { useColor } from "app/_providers/color-Context";
import cl from './header.module.scss'

const { Title } = Typography;

const Navbar = observer(() => {
  const {headerColor} = useColor()
  return (
    <nav style={{ borderStyle: "double", backgroundColor: headerColor }}>
      <Row justify="space-between" align="middle" style={{ padding: '10px' }}>
        <Col>
          <Space align="center" >
            <img src={logo} className={cl.logo}/>
            <Title level={3}>Blockify</Title>
            <LogoutBtn />
          </Space>
        </Col>
        <Col>
          <Statistics />
        </Col>
        <Col>
          <Card>
            <Space direction="vertical" size="small" align="center">
              <User />
            </Space>
          </Card>
        </Col>
      </Row>
    </nav>
  );
});

export default Navbar;
