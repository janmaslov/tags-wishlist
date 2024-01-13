import { basePath } from "../..";
import { WishlistItemWithUser as ItemData, User } from "../../types";
import { Base } from "../Base";
import { Nav } from "../components/Nav";
import { Wishlist } from "../components/Wishlist";

export const Index = ({ items, user }: Html.PropsWithChildren & { items?: ItemData[], user?: User }) => {
	return (
		<Base>
			<div class="container">
				<div class="container-title">
					<img src={`${basePath}/public/gonarch.png`} class="logo" />
					<h1>Xen Wunschliste</h1>
				</div>
				<Nav />
				<div hx-ext="ws" ws-connect={`${basePath}/refreshlist`}>
					<Wishlist items={items} user={user} />
				</div>
			</div>
		</Base>
	);
}