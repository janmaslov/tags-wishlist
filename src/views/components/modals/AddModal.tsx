import { ModalBase } from "../ModalBase"
import { Image } from "../icons/Image";
import { Loader } from "../icons/Loader";

export const AddModal = (props?: {posterUrl?: string}) => {
	return (
		<ModalBase id="modal-add">
			<div class="modal-header">
				<h1 class="h3">Neuen Eintrag erstellen</h1>
			</div>
			<form hx-post="/wishlist/add">
				<div class="modal-content">
					<div class="row">
						<div class="col-12 col-md-2">
							<div id="container-poster">
								{
									props?.posterUrl ?
									<img src={props?.posterUrl} /> :
									<Image />
								}
							</div>
						</div>
						<div class="col-12 col-md-10">
							<div
								class="row"
								hx-trigger="change from:(#modal-add #name, #modal-add #year) throttle:500ms"
								hx-get="/wishlist/add/queryposter"
								hx-include="this"
								hx-indicator="#modal-add .loading-spinner-overlay"
								hx-select="#modal-add #container-poster"
								hx-target="#modal-add #container-poster"
								hx-swap="innerHTML"
							>
								<div class="col-12">
									<div class="form-group">
										<label for="type">Medientyp</label>
										<select id="type" name="type" autofocus required>
											<option value="0">Filme</option>
											<option value="1">Serien</option>
											<option value="2">Filme (Anime)</option>
											<option value="3">Serien (Anime)</option>
											<option value="4">Filme (International)</option>
											<option value="5">Serien (International)</option>
											<option value="6">Musikvideos</option>
											<option value="7">Dokumentationen</option>
										</select>
									</div>
								</div>
								<div class="col-12 col-md-8">
									<div class="form-group">
										<label for="name">Name</label>
										<input type="text" id="name" name="name" placeholder="z.B. Finding Nemo" required />
									</div>
								</div>
								<div class="col-12 col-md-4">
									<div class="form-group">
										<label for="year">Jahr</label>
										<input type="number" id="year" name="year" value={new Date().getUTCFullYear().toString()} min="1900" max="2100" required />
									</div>
								</div>
							</div>
						</div>
					</div>
					<input type="hidden" name="poster" />
					<input type="hidden" name="createdBy" />
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn-primary" onclick="handleCloseModal(event)">Speichern</button>
					<button type="button" class="btn-secondary" onclick="handleCloseModal(event)">Schließen</button>
				</div>
			</form>
			<div class="loading-spinner-overlay">
				<Loader class="load-spin" />
				Suche bei Open Movie Database...
			</div>
		</ModalBase>
	);
}