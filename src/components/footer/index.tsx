import { Layout } from "antd";
import { GitlabOutlined, GithubFilled} from '@ant-design/icons'
import { BsTelegram } from "react-icons/bs";


const Footers = () => {
    const Footer = Layout
    return (
        <Footer style={{ textAlign: 'center', bottom: 0 }}>
        gwask ©{new Date().getFullYear()} 
        <h5>соц-сети владельца:</h5>
        <hr />
        <ul className="socials">
  <li><a href="https://github.com/gwizxs"> <GithubFilled  /></a></li>
  <li><a href="https://gitlab.com/gwizxs"> <GitlabOutlined /> </a></li>
  <li><a style={{marginTop: '4px'}} href="https://t.me/gwizxs"> <BsTelegram /> </a></li>
       </ul>
      </Footer>
    )
}

export default Footers;