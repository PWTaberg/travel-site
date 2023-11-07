import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';

let mobileMenu = new MobileMenu();

if (module.hot) {
	// accept hot updates - webpack devServer
	module.hot.accept();
}
