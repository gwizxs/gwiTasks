import { Layout } from "antd";
import { useColor } from "app/_providers/color-Context";
import cl from './Footer.module.scss'
import { Link } from "react-router-dom";
import { menu } from 'shared/constants/footerMenu'



const Footers = () => {
    const Footer = Layout
    const { color } = useColor();
    return (
        <Footer className={cl.Footer} style={{ backgroundColor: color }}>
            <div className={cl.footerDetails}>
                Blockify ©{new Date().getFullYear()}
                <ul className="socials">
                    {menu.map((item, index) => (
                        <li key={index}>
                            <Link to={item.url}>
                                <span>{item.icon}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Footer>
    )
}

export default Footers;