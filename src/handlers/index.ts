import db from '../db';
import { JellyfinAuthResponse, NewUser, NewWishlistItem, User, WishlistItemUpdate, WishlistItemWithUser } from '../types';
import { getPropertyDifferences } from '../utils';
import { Wishlist } from '../views/components/Wishlist';
import { Index } from '../views/pages/Index';
import { SignIn } from '../views/pages/SignIn';

export const authenticateWithJellyfin = async (username: string, password: string) => {
	const res = await fetch('https://xen.maslov.io/Users/AuthenticateByName', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Emby-Authorization': 'MediaBrowser Client="Xen Wishlist", Device="script", DeviceId="script", Version="0.0.0"'
		},
		body: JSON.stringify({
			Username: username,
			Pw: password
		})
	});

	if(res.status === 200){
		const jellyfinAuth: JellyfinAuthResponse = await res.json();

		return jellyfinAuth;
	}
	return null;
}

export const isAdmin = (jellyfinId?: string) => {
	return (jellyfinId ?? '') === '357eeed6fedf4c1cb6852b1831d08d26';
}

export const renderSignInPage = async () => {
	return SignIn();
}

export const renderIndexPage = async (user?: User) => {
	const items = await getWishlist();

	return Index({items, user});
};

export const renderWishlist = async (user: User) => {
	const items = await getWishlist();

	return Wishlist({items, user});
}

export const getWishlist = async () => {
	const items = await db.selectFrom('items').selectAll().execute();
	const users = await db.selectFrom('users').selectAll().execute();

	const itemsWithUsers = items.map<WishlistItemWithUser>(item => {
		return {...item, ...{createdBy: users.find(user => user.jellyfinId === item.createdBy)}} as WishlistItemWithUser;
	});

	return itemsWithUsers;
}

export const getWishlistItem = async (id: number) => {
	const item = await db.selectFrom('items').selectAll().where('id', '=', id).executeTakeFirstOrThrow();

	return item;
}

export const addWishlistItem = async (item: NewWishlistItem) => {
	item.createdAt = Date.now();
	item.lastStatusChange = item.createdAt;

	return await db.insertInto('items').values(item).returningAll().execute();
}

export const editWishlistItem = async (item: WishlistItemUpdate) => {
	const itemBeforeUpdate = await getWishlistItem(item.id!);

	const diff = getPropertyDifferences(itemBeforeUpdate, item);

	if('status' in diff){
		diff.lastStatusChange = Date.now();
	}

	delete diff.id;

	return await db.updateTable('items').set(item).where('id', '=', itemBeforeUpdate.id).executeTakeFirst();
}

export const deleteWishlistItem = async (id: number, jellyfinId: string) => {
	return await db.deleteFrom('items').where('id', '=', id).where('createdBy', '=', jellyfinId).executeTakeFirst();
}

export const getOrCreateUser = async (jellyfinId: string, name: string) => {
	try{
		const user = await getUser(jellyfinId);

		if(!user) throw null;

		return user;
	}catch(_){
		return await createUser({
			jellyfinId,
			name
		});
	}
}

export const getUser = async (jellyfinId: string) => {
	return await db.selectFrom('users').selectAll().where('jellyfinId', '=', jellyfinId).executeTakeFirst();
}

export const createUser = async (user: NewUser) => {
	return await db.insertInto('users').values(user).returningAll().executeTakeFirstOrThrow();
}