import { WishlistItem as ItemData, WishlistItemType } from "../../types";
import { Delete } from "./icons/Delete";
import { Edit } from "./icons/Edit";

export const WishlistItem = ({item}: JSX.IntrinsicAttributes & {item?: ItemData}) => {
	return (
		<li class="wishlist-item row">
			{
				item?.poster &&
				<div class="col-auto">
					<div class="item-image-container">

					</div>
				</div>
			}
			<div class="col">
				<p class="item-subtitle">{`${itemTypeToString(item?.type)}${item?.year ? ` - ${item?.year}` : ''}`}</p>
				<p class="item-title">{item?.name}</p>
			</div>
			<div class="col-auto">
				<div class="item-actions-container">
					<button type="button" class="btn-secondary btn-icon" title="Bearbeiten"><Edit /></button>
					<button type="button" class="btn-danger btn-icon" title="Löschen"><Delete /></button>
				</div>
			</div>
		</li>
	);
}

export const WishlistItemCreateEdit = ({item}: JSX.IntrinsicAttributes & {item?: ItemData}) => {
	return (
		<li class="wishlist-item">
			<form>

			</form>
		</li>
	);
}

function itemTypeToString(type?: WishlistItemType){
	switch(type ?? null){
		case WishlistItemType.Movie: return 'Film';
		case WishlistItemType.Series: return 'Serie';
		case WishlistItemType.MovieAnime: return 'Film (Anime)';
		case WishlistItemType.SeriesAnime: return 'Serie (Anime)';
		case WishlistItemType.MovieInternational: return 'Film (International)';
		case WishlistItemType.SeriesInternational: return 'Serie (International)';
		case WishlistItemType.MusicVideo: return 'Musikvideo';
		case WishlistItemType.Documentary: return 'Dokumentation';
		default: return 'Unbekannt';
	}
}