import { Typography, Row, Col, Space,  Card } from "antd"
import './header.module.scss';
import LogoutBtn from "../Logout/LogoutBtn";
import Statistic from "../Statistic";
import { observer } from "mobx-react-lite";
import User from "../common/User";
import logo from './assets/Avatar.jpg';

const { Title } = Typography;

const Header = observer(() => {
    return (
        <nav style={{ borderStyle: "double" }}>
            <Row justify="space-between" align="middle" style={{ padding: '10px' }}>
                <Col>
                    <Space align="center">
                    <img src={logo} style={{ width: 60, height: 60 }} />
                        <Title  level={3}>Blockify <LogoutBtn/></Title>
                    </Space>
                </Col>
                <Col>
                    <Statistic />
                </Col>
                <Col>
                    <Card>
                        <Space direction="vertical" size="small" align="center">
                            <User/>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </nav>
    );
});

export default Header;
