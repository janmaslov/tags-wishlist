import { Add } from "./icons/Add";

export const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<button hx-get="/wishlist/add" hx-target="body" hx-swap="beforeend" class="btn-primary">
						<Add />
						Hinzufügen
					</button>
				</li>
			</ul>
		</nav>
	);
}