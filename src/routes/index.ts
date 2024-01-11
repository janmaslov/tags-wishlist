import Elysia from "elysia";
import { renderIndexPage } from "../handlers";
import { app } from "..";

const indexRoutes = (app: Elysia) => app
	.get('/', async ({ set }) => {
		set.headers['Content-Type'] = 'text/html; charset=utf8';
		return await renderIndexPage();
	})
	.ws('/refreshlist', {
		open: (ws) => {
			console.log('subscribe', ws.id);
			ws.subscribe('refreshList');
		},
		close: (ws) => {
			console.log('remove', ws.id);
			ws.unsubscribe('refreshList');
		},
		error: (e) => console.error(e.error),
		perMessageDeflate: true
	});

export const emitWishlistRefreshEvent = (wishlist: string) => {
	console.log('publish refreshList');
	app.server?.publish('refreshList', wishlist);
}

export default indexRoutes;