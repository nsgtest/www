const time = 30;

current = 0;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

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

function toggle(i, title) {
	menu();
	document.querySelector('.titlebar div').innerHTML = title;

	pages = document.querySelectorAll('.page');
	pages[current].classList.remove('visible');
	pages[i].classList.add('visible');
	current = i;
}
