import { basePath } from "../../..";
import { WishlistItem as ItemData, WishlistItemStatus, WishlistItemType } from "../../../types";
import { itemTypeToString } from "../../../utils";
import { ModalBase } from "../ModalBase"
import { Image } from "../icons/Image";
import { Loader } from "../icons/Loader";
import { Save } from "../icons/Save";

export const AddEditModal = ({item, admin}: { item?: ItemData, admin: boolean }) => {
	return (
		<ModalBase id={`modal-addedit`}>
			<div class="modal-header">
				<h1 class="h3">Neuen Eintrag erstellen</h1>
			</div>
			<form hx-post={`${basePath}/wishlist/${!!item ? 'edit' : 'add'}`}>
				<div class="modal-content">
					<div class="row">
						<div class="col-12 col-md-2">
							<div id="container-poster">
								<Image />
							</div>
						</div>
						<div class="col-12 col-md-10">
							<div class="row">
								{ !!item && admin &&
									<div class="col-12">
										<div class="form-group">
											<label for="status">Status</label>
											<select id="status" name="status" autofocus required>
												{
													(Object.keys(WishlistItemStatus).filter((v) => isNaN(Number(v))) as (keyof typeof WishlistItemStatus)[]).map((status, index) =>
														<option value={index.toString()} selected={item?.status == index}>{status}</option>
													)
												}
											</select>
										</div>
									</div>
								}
								<div class="col-12">
									<div class="form-group">
										<label for="type">Medientyp</label>
										<select id="type" name="type" autofocus required>
											{
												(Object.keys(WishlistItemType).filter((v) => isNaN(Number(v))) as (keyof typeof WishlistItemType)[]).map((_, index) =>
													<option value={index.toString()} selected={item?.status == index}>{itemTypeToString(index)}</option>
												)
											}
										</select>
									</div>
								</div>
								<div class="col-12 col-md-8">
									<div class="form-group">
										<label for="name">Name</label>
										<input type="text" id="name" name="name" placeholder="z.B. Findet Dorie" value={item?.name} minlength="1" required />
									</div>
								</div>
								<div class="col-12 col-md-4">
									<div class="form-group">
										<label for="year">Jahr</label>
										<input type="number" id="year" name="year" placeholder="2003" value={item?.year?.toString() ?? new Date().getUTCFullYear().toString()} min="1900" max="2100" minlength="4" maxlength="4" required />
									</div>
								</div>
								<div class="col-12">
									<div class="form-group">
										<label for="poster">Poster/Bild (optional)</label>
										<input type="text" id="poster" name="poster" hx-on:change="changePoster(this.value)" value={item?.poster} />
									</div>
								</div>
							</div>
						</div>
					</div>
					{
						!!item && <input type="hidden" name="id" value={item?.id.toString()} />
					}
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn-success" onclick="handleCloseModal(event, 'save')"><Save /> Speichern</button>
					<button type="button" class="btn-secondary" onclick="handleCloseModal(event)">Schließen</button>
				</div>
			</form>
			<div class="loading-spinner-overlay">
				<Loader class="load-spin" />
				Suche bei Open Movie Database...
			</div>
			<script>
				{`
					var emptyPoster = '${<Image />}';
					function changePoster(url){
						document.querySelector('#modal-addedit #container-poster').innerHTML = (url?.length ?? 0) > 0 ? '<img src="'+ url +'" />' : emptyPoster;
					}
				`}
			</script>
		</ModalBase>
	);
}