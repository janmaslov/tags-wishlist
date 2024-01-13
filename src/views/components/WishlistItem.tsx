import { formatRelative } from "date-fns";
import { WishlistItemWithUser as ItemData } from "../../types";
import { Delete } from "./icons/Delete";
import { Edit } from "./icons/Edit";
import { Image } from "./icons/Image";
import { de } from "date-fns/locale";
import { parseItemStatus, itemTypeToString } from "../../utils";
import { basePath } from "../..";

export const WishlistItem = ({item, showActions}: JSX.IntrinsicAttributes & {item?: ItemData, showActions: boolean}) => {
	const status = parseItemStatus(item?.status);

	return (
		<li class="wishlist-item">
			<div class="row">
				<div class="col-12 col-lg-1">
					<div class="item-image-container">
						{item?.poster ? <img src={item?.poster} /> : <Image />}
					</div>
				</div>
				<div class="col-12 col-lg">
					<p class={`item-status${status.class ? ` ${status.class}` : ''}`}>{`${status.label} - ${formatRelative(item?.lastStatusChange ?? 0, new Date(), {locale: de})}`}</p>
					<p class="item-subtitle">{`${itemTypeToString(item?.type)}${item?.year ? ` - ${item?.year}` : ''}`}</p>
					<p class="h3">{item?.name}</p>
					<p class="item-subtitle">{`Hinzugefügt von ${item?.createdBy.name} ${formatRelative(item?.createdAt ?? 0, new Date(), {locale: de})}`}</p>
				</div>
				{
					showActions &&
					<div class="col-12 col-lg-auto">
						<div class="item-actions-container">
							<button type="button" hx-get={`${basePath}/wishlist/edit/${item?.id}`} hx-target="body" hx-swap="beforeend" class="btn-secondary btn-icon" title="Bearbeiten"><Edit /></button>
							<button type="button" hx-post={`${basePath}/wishlist/delete/${item?.id}`} hx-confirm={`${`${item?.name} (${item?.year})` ?? 'Diesen Eintrag'} wirklich löschen?`} class="btn-danger btn-icon" title="Löschen"><Delete /></button>
						</div>
					</div>
				}
			</div>
		</li>
	);
}