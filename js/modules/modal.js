function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	const scroll = calcScroll();

	modal.classList.remove('hide');
	modal.classList.add('show');
	document.body.style.overflow = 'hidden';

	document.body.style.marginRight = `${scroll}px`;

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	
	modal.classList.remove('show');
	modal.classList.add('hide');
	document.body.style.overflow = 'visible';

	document.body.style.marginRight = `0px`;
}

function calcScroll() {
	let div = document.createElement('div');

	div.style.width = '50px';
	div.style.height = '50px';
	div.style.overflowY = 'scroll';
	div.style.visibility = 'hidden';

	document.body.appendChild(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;
	div.remove();

	return scrollWidth;
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	
	const modalTrigger = document.querySelectorAll(triggerSelector),
		  modal = document.querySelector(modalSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= 
			document.documentElement.scrollHeight - 1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll)
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal, closeModal};