light = '#e7f6eb';
dark = '#001e28';

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

localstorage = window.localStorage;
window.addEventListener('load', function() {
	if (localstorage.getItem('theme') == null) {
		localstorage.setItem('theme', light);
		localstorage.setItem('antitheme', dark);
	}
	document.documentElement.style.setProperty('--theme', localstorage.getItem('theme'));
	document.documentElement.style.setProperty('--antitheme', localstorage.getItem('antitheme'));

	toggleswitch();
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
const animation = 300;
async function togglemenu() {
	menu = document.querySelector('.menu');
	if (menu.classList.contains('invisible')) {
		menu.classList.remove('invisible')
		menu.classList.add('visible');
	} else {
		menu.classList.remove('visible');
	}

	icons = document.querySelectorAll('.menu div');
	for (i = 0; i < icons.length; i++) {
		if (icons[icons.length - 1].classList.contains('visible')) {
			icons[i].classList.remove('visible');
			icons[i].classList.add('invisible');
		} else {
			icons[i].classList.remove('invisible');
			icons[i].classList.add('visible');
		}
		await sleep(time);
	}

	if (!menu.classList.contains('visible')) {
		await sleep(animation - time);
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
