function handleCloseModal(e, action){
	e.stopImmediatePropagation();
	if (e.currentTarget !== e.target) return;

	if(!document.querySelector('#modal-addedit form').checkValidity() && action == 'save') return;

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