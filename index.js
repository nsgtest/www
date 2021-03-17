page = 0;

theme = '#e7f6eb';
antitheme = '#001e28';

const time = 30;
const slide = getComputedStyle(document.documentElement).getPropertyValue('--slide').replace(/\D/g,'');

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

window.onload = function() {
	if (window.localStorage.getItem('theme') == null || window.localStorage.getItem('theme') == theme) {
		light();
	} else {
		dark();
	}

	if (window.localStorage.getItem('grade') != null) {
		setgrade(window.localStorage.getItem('grade'));
	}

	if (window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
		login(localStorage.getItem('username'), localStorage.getItem('password'));
	}
};

function sleep(ms) {
	return new Promise(resolve => window.setTimeout(resolve, ms));
}

async function togglemenu() {
	menu = document.querySelector('.menu');
	menudiv = document.querySelectorAll('.menu div');
	pagevisible = document.querySelector('.page.visible');

	if (menudiv[0].classList.contains('invisible') && menudiv[menudiv.length - 1].classList.contains('invisible')) {
		menu.classList.remove('invisible');
		pagevisible.classList.add('blur');
	}
	if (!menudiv[0].classList.contains('invisible') && !menudiv[menudiv.length - 1].classList.contains('invisible')){
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

	await sleep(slide - time);
	if (menudiv[0].classList.contains('invisible') && menudiv[menudiv.length - 1].classList.contains('invisible')) {
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

function warning() {
	document.querySelector('.loading').classList.add('invisible');
	document.querySelector('.warning').classList.remove('invisible');

	window.setTimeout(function() {
		document.querySelector('.warning').classList.add('invisible');
		document.querySelector('.login').classList.remove('invisible');
	}, 3000);
}

function done() {
	document.querySelector('.loading').classList.add('invisible');
	document.querySelector('.done').classList.remove('invisible');

	window.setTimeout(function() {
		document.querySelector('.done').classList.add('invisible');
		document.querySelector('.remove').classList.remove('invisible');
	}, 3000);
}

async function login(username, password) {
	document.querySelector('.login').classList.add('invisible');
	document.querySelector('.loading').classList.remove('invisible');

	if (username == 'schueler') {
		url = 'https://vertretung.nellysachs.de/pausenhalle/'
	} else if (username == 'lehrer') {
		url = 'https://vertretung.nellysachs.de/lehrerzimmer/'
	} else {
		warning();
		return
	}

	xmlhttprequest = new XMLHttpRequest();
	xmlhttprequest.onload = function() {
		window.localStorage.setItem('username', username);
		window.localStorage.setItem('password', password);

		done();

		table = xmlhttprequest.responseXML.querySelector('.mon_list');

		array = new Array();
		for (i = 1; i < table.rows.length; i++) {
			object = new Object();
			for (j = 0; j < table.rows[j].cells.length; j++) {
				object[table.rows[0].cells[j].innerHTML] = table.rows[i].cells[j].innerHTML;
			}
			array.push(object);
		}
	};
	xmlhttprequest.onerror = function() {
		window.localStorage.removeItem('username');
		window.localStorage.removeItem('password');

		warning();
		return
	};
	xmlhttprequest.open('GET', new URL('heute/subst_001.htm', url).toString(), true);
	xmlhttprequest.setRequestHeader('Authorization', 'Basic ' + window.btoa(username + ':' + password));
	xmlhttprequest.withCredentials = true;
	xmlhttprequest.responseType = 'document';
	xmlhttprequest.send();
}
