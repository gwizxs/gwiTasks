import { Layout } from "antd";
import { GitlabOutlined, GithubFilled } from '@ant-design/icons'
import { BsTelegram } from "react-icons/bs";
import { useColor } from "../../_providers/color-Context";
import cl from './Footer.module.scss'



const Footers = () => {
    const Footer = Layout
    const { color } = useColor();
    return (
        <Footer className={cl.Footer} style={{ backgroundColor: color }}>
            <div className={cl.footerDetails}>
                Blockify ©{new Date().getFullYear()}
                <ul className="socials">
                    <li><a href="https://github.com/gwizxs"> <GithubFilled /></a></li>
                    <li><a href="https://gitlab.com/gwizxs"> <GitlabOutlined /> </a></li>
                    <li><a href="https://t.me/gwizxs"> <BsTelegram /> </a></li>
                </ul>
            </div>
        </Footer>
    )
}

export default Footers;