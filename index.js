page = 0;

theme = '#e7f6eb';
antitheme = '#001e28';

const time = 30;
const slide = 300;

function settheme() {
	document.documentElement.style.setProperty('--theme', window.localStorage.getItem('theme'));
	document.documentElement.style.setProperty('--antitheme', window.localStorage.getItem('antitheme'));
}

function light() {
	window.localStorage.setItem('theme', theme);
	window.localStorage.setItem('antitheme', antitheme);

	document.querySelector('.off').classList.remove('invisible');
	document.querySelector('.on').classList.add('invisible');	

	settheme();
}

function dark() {
	window.localStorage.setItem('theme', antitheme);
	window.localStorage.setItem('antitheme', theme);

	document.querySelector('.on').classList.remove('invisible');
	document.querySelector('.off').classList.add('invisible');

	settheme();
}

function unsetgrade() {
	document.querySelectorAll('.set')[window.localStorage.getItem('grade')].classList.add('invisible');
	window.localStorage.removeItem('grade');

}

function setgrade(i) {
	if (window.localStorage.getItem('grade') != null) {
		unsetgrade();
	}
	window.localStorage.setItem('grade', i);
	document.querySelectorAll('.set')[window.localStorage.getItem('grade')].classList.remove('invisible');
}

window.addEventListener('load', function() {
	if (window.localStorage.getItem('theme') == null || window.localStorage.getItem('theme') == theme) {
		light();
	} else {
		dark();
	}

	if (window.localStorage.getItem('grade') != null) {
		setgrade(window.localStorage.getItem('grade'));
	}
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function togglemenu() {
	menu = document.querySelector('.menu');
	menudiv = document.querySelectorAll('.menu div');
	pagevisible = document.querySelector('.page.visible');

	if (menudiv[menudiv.length - 1].classList.contains('invisible')) {
		menu.classList.remove('invisible');
		pagevisible.classList.add('blur');
	} else {
		pagevisible.classList.remove('blur');
	}

	for (i = 0; i < menudiv.length; i++) {
		if (menudiv[menudiv.length - 1].classList.contains('invisible')) {
			menudiv[i].classList.remove('invisible');
		} else {
			menudiv[i].classList.add('invisible');
		}
		await sleep(time);
	}

	if (menudiv[menudiv.length - 1].classList.contains('invisible')) {
		await sleep(slide - time);
		menu.classList.add('invisible');
	}

}

function togglepage(i, title) {
	togglemenu();

	document.querySelector('.titlebar div').innerHTML = title;

	pages = document.querySelectorAll('.page');
	pages[page].classList.remove('visible');
	pages[i].classList.add('visible');

	page = i;
}

function login() {
	document.querySelector('.login').classList.add('invisible');
	document.querySelector('.loading').classList.remove('invisible');
}
