import { ModalBase } from "../ModalBase"

export const ErrorModal = (message: string) => {
	return (
		<ModalBase>
			<div class="modal-header">
				<h1>Aua!</h1>
			</div>
			<div class="modal-content">
				<p>{message}</p>
			</div>
			<div class="modal-footer">
				<button onclick="handleCloseModal(event)">Close</button>
			</div>
		</ModalBase>
	);
}