import { ModalBase } from "../ModalBase"
import { Image } from "../icons/Image";
import { Loader } from "../icons/Loader";

export const AddModal = () => {
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
								<Image />
							</div>
						</div>
						<div class="col-12 col-md-10">
							<div class="row">
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
										<input type="text" id="name" name="name" placeholder="z.B. Findet Nemo" required />
									</div>
								</div>
								<div class="col-12 col-md-4">
									<div class="form-group">
										<label for="year">Jahr</label>
										<input type="number" id="year" name="year" placeholder="2003" value={new Date().getUTCFullYear().toString()} min="1900" max="2100" required />
									</div>
								</div>
								<div class="col-12">
									<div class="form-group">
										<label for="poster">Poster/Bild (optional)</label>
										<input type="text" id="poster" name="poster" hx-on:change="changePoster(this.value)" />
									</div>
								</div>
							</div>
						</div>
					</div>
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
			<script>
				{`const emptyPoster = '${<Image />}';
				function changePoster(url){
					document.querySelector('#modal-add #container-poster').innerHTML = (url?.length ?? 0) > 0 ? '<img src="'+ url +'" />' : emptyPoster;
				}`}
			</script>
		</ModalBase>
	);
}