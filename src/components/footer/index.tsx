import { Layout } from "antd";
import { GitlabOutlined, GithubFilled} from '@ant-design/icons'
import { BsTelegram } from "react-icons/bs";
import { useColor } from "../../_providers/color-Context";



const Footers = () => {
    const Footer = Layout
    const { color } = useColor();
    return (
        <Footer style={{ textAlign: 'center', bottom: 0, backgroundColor: color }}>
            <div style={{backgroundColor: '#f0f0f0', textAlign: 'center', width: '20%', margin: 'auto', borderRadius: '10px'}}>
        Blockify ©{new Date().getFullYear()} 
        <ul className="socials">
  <li><a  href="https://github.com/gwizxs"> <GithubFilled  /></a></li>
  <li><a href="https://gitlab.com/gwizxs"> <GitlabOutlined /> </a></li>
  <li><a style={{marginTop: '4px'}} href="https://t.me/gwizxs"> <BsTelegram /> </a></li>
       </ul>
       </div>
      </Footer>
    )
}

export default Footers;