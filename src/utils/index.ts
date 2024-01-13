import { WishlistItemStatus, WishlistItemType } from "../types";

export function parseItemStatus(status?: WishlistItemStatus){
	switch(status ?? null){
		case WishlistItemStatus.Pending:
			return {
				label: 'Ausstehend',
				class: 'item-status-pending'
			};
		case WishlistItemStatus.Added:
			return {
				label: 'Hinzugefügt',
				class: 'item-status-added'
			};
		case WishlistItemStatus.WillNotAdd:
			return {
				label: 'Wird nicht hinzugefügt',
				class: 'item-status-wontadd'
			};
		default:
			return {
				label: 'Unbekannt'
			}
	}
}

export function itemTypeToString(type?: WishlistItemType){
	switch(type ?? null){
		case WishlistItemType.Movie: return 'Film';
		case WishlistItemType.Series: return 'Serie';
		case WishlistItemType.MovieAnime: return 'Film (Anime)';
		case WishlistItemType.SeriesAnime: return 'Serie (Anime)';
		// case WishlistItemType.MovieInternational: return 'Film (International)';
		// case WishlistItemType.SeriesInternational: return 'Serie (International)';
		case WishlistItemType.MusicVideo: return 'Musikvideo';
		case WishlistItemType.Documentary: return 'Dokumentation';
		default: return 'Unbekannt';
	}
}

export function getPropertyDifferences<T extends Record<string, any>>(obj1: T, obj2: T){
	return Object.entries(obj1).reduce((diff, [key, value]) => {
		if(key in obj2){
			const val = obj2[key];

			// Check if obj1's property's value is different from obj2's.
			if(val != value){
				return {
					...diff,
					[key]: val,
				};
			}
		}

		return diff;
	}, {} as Partial<T>);
}