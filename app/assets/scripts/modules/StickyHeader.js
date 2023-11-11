import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {
	constructor() {
		this.siteHeader = document.querySelector('.site-header');
		this.pageSections = document.querySelectorAll('.page-section');
		this.browserHeight = window.innerHeight;
		this.previousScrollY = window.scrollY;
		this.events();
	}

	events() {
		window.addEventListener(
			'scroll',
			throttle(() => this.runOnScroll(), 200)
		);
		window.addEventListener(
			'resize',
			debounce(() => {
				this.browserHeight = window.innerHeight;
			}, 333)
		);
	}

	runOnScroll() {
		this.determineScrollDirection();

		// If below 60px from top
		if (window.scrollY > 60) {
			this.siteHeader.classList.add('site-header--dark');
		} else {
			this.siteHeader.classList.remove('site-header--dark');
		}
		// check which section is in view
		this.pageSections.forEach((el) => this.calcSection(el));
	}

	determineScrollDirection() {
		if (window.scrollY > this.previousScrollY) {
			this.scrollDirection = 'down';
		} else {
			this.scrollDirection = 'up';
		}
		this.previousScrollY = window.scrollY;
	}

	calcSection(el) {
		// If distance from top + innerheight of window
		//    is > top position of el-section AND
		//    is < bottom position of el-section
		if (
			window.scrollY + this.browserHeight > el.offsetTop &&
			window.scrollY < el.offsetTop + el.offsetHeight
		) {
			let scrollPercent =
				(el.getBoundingClientRect().top / this.browserHeight) * 100;
            // If scroll percent is within 18% from top and scroll direction => down
            // or scroll percent within 33% and direction => up
			if (
				(scrollPercent < 18 &&
					scrollPercent > -0.1 &&
					this.scrollDirection == 'down') ||
				(scrollPercent < 33 && this.scrollDirection == 'up')
			) {
				let matchingLink = el.getAttribute('data-matching-link');
                // Remove color from other page section links
				document
					.querySelectorAll(`.primary-nav a:not(${matchingLink})`)
					.forEach((el) => el.classList.remove('is-current-link'));
                // Add color to section link
				document
					.querySelector(matchingLink)
					.classList.add('is-current-link');
			}
		}
	}
}

export default StickyHeader;
