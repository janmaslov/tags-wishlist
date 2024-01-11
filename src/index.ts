import '@kitajs/html/register';
import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static'
import indexRoutes from './routes';
import wishlistRoutes from './routes/wishlist';
import { join, dirname } from 'path';

const staticFilesDir = Bun.env.NODE_ENV === 'production' ? join(dirname(Bun.main), 'public') : 'public';

export const app = new Elysia()
	.use(staticPlugin({assets: staticFilesDir, alwaysStatic: false, enableDecodeURI: true, indexHTML: false, prefix: '/public'}))
	.use(indexRoutes)
	.use(wishlistRoutes)
	.listen(3000);

console.log(`(${Bun.env.NODE_ENV}) 🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);