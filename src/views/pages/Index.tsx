import { WishlistItem as ItemData } from "../../types";
import { Base } from "../Base";
import { Nav } from "../components/Nav";
import { Wishlist } from "../components/Wishlist";

export const Index = ({ items }: Html.PropsWithChildren & { items?: ItemData[] }) => {
	return (
		<Base>
			<div class="container">
				<div class="container-title">
					<img src="/public/gonarch.png" class="logo" />
					<h1>Xen Wunschliste</h1>
				</div>
				<Nav />
				<div hx-ext="ws" ws-connect="/refreshlist">
					<Wishlist items={items} />
				</div>
			</div>
		</Base>
	);
}