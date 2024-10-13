
import Navbar from '../components/Nav/Navbar';
import cl from './header.module.scss';

export const Header = () => {
	return (
		<header className={cl.container}>
			<div className={cl.menu}>
				<Navbar />
			</div>
		</header>
	);
}
