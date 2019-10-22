localstorage = window.localStorage;

window.addEventListener('load', function() {
	if (localstorage.getItem('theme') == null) {
		localstorage.setItem('theme', '#ffffff');
	}
	document.body.style.setProperty('--theme', localstorage.getItem('theme'));
})

function theme() {
	if (localstorage.getItem('theme') == '#ffffff') {
		localstorage.setItem('theme', '#121212');
	} else {
		localstorage.setItem('theme', '#ffffff');
	}
	document.body.style.setProperty('--theme', localstorage.getItem('theme'));
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const time = 30;
async function menu() {
	icons = document.querySelectorAll('.menu div');
	for (i = 0; i < icons.length; i++) {
		if (icons[i].classList.contains('visible')) {
			icons[i].classList.remove('visible');
			icons[i].classList.add('invisible');
			await sleep(time);
		} else {
			icons[i].classList.remove('invisible');
			icons[i].classList.add('visible');
			await sleep(time);
		}
	}
}

current = 0;
function toggle(i, title) {
	menu();
	document.querySelector('.titlebar div').innerHTML = title;

	pages = document.querySelectorAll('.page');
	pages[current].classList.remove('visible');
	pages[i].classList.add('visible');
	current = i;
}
