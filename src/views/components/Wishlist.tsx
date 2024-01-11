import { WishlistItem as ItemData } from "../../types";
import { WishlistItem } from "./WishlistItem";

export const Wishlist = ({ items }: Html.PropsWithChildren & { items?: ItemData[] }) => {
	return (
		<ul id="wishlist" class="wishlist-container" hx-swap-oob="innerHTML">
			{(items?.length ?? 0) > 0 ? items?.map(item => (<WishlistItem item={item} />)) : <li>Keine Einträge in der Wunschliste</li>}
		</ul>
	);
}