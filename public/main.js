function handleCloseModal(e){
	e.stopImmediatePropagation();
	if (e.currentTarget !== e.target) return;

	closeModal(e.target.closest('.modal-container'));
}
function closeModal(el){
	el.classList.add('modal-container-closing');

	el.addEventListener('animationend', function(e){
		e.stopImmediatePropagation();
		if (el !== e.target) return;

		el.remove();
	}, {once: true});
}