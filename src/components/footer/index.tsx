import { Layout } from "antd";
import {LinkOutlined, GitlabOutlined, GithubFilled} from '@ant-design/icons'


const Footers = () => {
    const Footer = Layout
    return (
        <Footer style={{ textAlign: 'center', bottom: 0 }}>
        gwask ©{new Date().getFullYear()} Created by Ant UED
        <h5>соц-сети владельца:</h5>
        <hr />
        <ul className="socials">
  <li><a href="https://github.com/gwizxs"> <GithubFilled  /></a></li>
  <li><a href="https://gitlab.com/gwizxs"> <GitlabOutlined /> </a></li>
  <li><a href="https://t.me/gwizxs"> <LinkOutlined /> </a></li>
       </ul>
      </Footer>
    )
}

export default Footers;