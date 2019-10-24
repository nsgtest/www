light = '#e7f6eb';
dark = '#001e28';

localstorage = window.localStorage;
function toggleswitch() {
	off = document.querySelector('.off');
	on = document.querySelector('.on');
	if (localstorage.getItem('theme') == light) {
		on.classList.remove('invisible');
		off.classList.add('invisible');
	} else {
		off.classList.remove('invisible');
		on.classList.add('invisible');
	}
}

function setradio() {
	visible = document.querySelector('.set:not(.invisible)');
	if (visible != null) {
		visible.classList.add('invisible');
	}
	
	if (localstorage.getItem('grade') != null) {
		document.querySelectorAll('.set')[localstorage.getItem('grade')].classList.remove('invisible');
	}
}

window.addEventListener('load', function() {
	if (localstorage.getItem('theme') == null) {
		localstorage.setItem('theme', light);
		localstorage.setItem('antitheme', dark);
	}
	document.documentElement.style.setProperty('--theme', localstorage.getItem('theme'));
	document.documentElement.style.setProperty('--antitheme', localstorage.getItem('antitheme'));

	toggleswitch();
	setradio();
});

function toggletheme() {
	if (localstorage.getItem('theme') == light) {
		localstorage.setItem('theme', dark);
		localstorage.setItem('antitheme', light);
	} else {
		localstorage.setItem('theme', light);
		localstorage.setItem('antitheme', dark);
	}
	document.documentElement.style.setProperty('--theme', localstorage.getItem('theme'));
	document.documentElement.style.setProperty('--antitheme', localstorage.getItem('antitheme'));

	toggleswitch();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const time = 30;
const slide = 300;
async function togglemenu() {
	menu = document.querySelector('.menu');
	icons = document.querySelectorAll('.menu div');
	page = document.querySelector('.page.visible');

	if (icons[icons.length - 1].classList.contains('invisible')) {
		menu.classList.remove('invisible')
		page.classList.add('blur');
	} else {
		page.classList.remove('blur');
	}

	for (i = 0; i < icons.length; i++) {
		if (icons[icons.length - 1].classList.contains('invisible')) {
			icons[i].classList.remove('invisible');
		} else {
			icons[i].classList.add('invisible');
		}
		await sleep(time);
	}

	if (icons[icons.length - 1].classList.contains('invisible')) {
		await sleep(slide - time);
		menu.classList.add('invisible');
	}

}

current = 0;
function togglepage(i, title) {
	togglemenu();
	document.querySelector('.titlebar div').innerHTML = title;

	pages = document.querySelectorAll('.page');
	pages[current].classList.remove('visible');
	pages[i].classList.add('visible');
	current = i;
}

function setgrade(i) {
	if (localstorage.getItem('grade') == i) {
		localstorage.removeItem('grade');
		setradio();
	} else {
		localstorage.setItem('grade', i);
		setradio();
	}
}
