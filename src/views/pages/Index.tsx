import { basePath } from "../..";
import { WishlistItemWithUser as ItemData, User } from "../../types";
import { Base } from "../Base";
import { Nav } from "../components/Nav";
import { Wishlist } from "../components/Wishlist";

export const Index = ({ items, archivedItems, user }: Html.PropsWithChildren & { items?: ItemData[], archivedItems?: ItemData[], user?: User }) => {
	return (
		<Base>
			<div class="container">
				<div class="container-title">
					<img src={`${basePath}/public/gonarch.png`} class="logo" />
					<h1>Xen Wunschliste</h1>
				</div>
				<Nav />
				<div hx-ext="ws" ws-connect={`${basePath}/refreshlist`}>
					<Wishlist id="wishlist" items={items} user={user} />
				</div>

				<details>
					<summary><span>Archiv</span></summary>
					<div hx-ext="ws" ws-connect={`${basePath}/refresharchived`}>
						<Wishlist id="wishlist-archive" items={archivedItems} user={user} />
					</div>
				</details>
			</div>
		</Base>
	);
}