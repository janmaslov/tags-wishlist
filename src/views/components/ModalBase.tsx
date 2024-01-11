export const ModalBase = (props: Html.PropsWithChildren & {id: string}) => {
	return (
		<div class="modal-container">
			<div class="modal-overlay" onclick="handleCloseModal(event)">
				<dialog id={props.id} class="modal" aria-modal="true">
					{props.children && props.children}
				</dialog>
			</div>
		</div>
	);
}