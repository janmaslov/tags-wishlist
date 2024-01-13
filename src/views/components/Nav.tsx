import { basePath } from "../..";
import { Add } from "./icons/Add";
import { SignOut } from "./icons/SignOut";

export const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<button hx-get={`${basePath}/wishlist/add`} hx-target="body" hx-swap="beforeend" class="btn-primary">
						<Add />
						Hinzufügen
					</button>
				</li>
				<li>
					<a href={`${basePath}/sign-out`} class="btn btn-danger">
						<SignOut />
						Ausloggen
					</a>
				</li>
			</ul>
		</nav>
	);
}