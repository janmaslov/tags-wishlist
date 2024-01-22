import { isAdmin } from "../../handlers";
import { WishlistItemWithUser as ItemData, User } from "../../types";
import { WishlistItem } from "./WishlistItem";

export const Wishlist = ({ id, items, user }: Html.PropsWithChildren & { id: string, items?: ItemData[], user?: User }) => {
	return (
		<ul id={id} class="wishlist-container" hx-swap-oob="innerHTML">
			{(items?.length ?? 0) > 0 ? items?.map(item => (<WishlistItem item={item} showActions={(user?.jellyfinId ?? '') == item.createdBy.jellyfinId || isAdmin(user?.jellyfinId)} />)) : <li>Keine Einträge in der Wunschliste</li>}
		</ul>
	);
}