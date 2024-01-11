import db from '../db';
import { NewWishlistItem } from '../types';
import { Wishlist } from '../views/components/Wishlist';
import { Index } from '../views/pages/Index';

export const renderIndexPage = async () => {
	const items = (await db.selectFrom('items').selectAll().execute());

	return Index({items});
};

export const renderWishlist = async () => {
	const items = (await db.selectFrom('items').selectAll().execute());

	return Wishlist({items});
}

export const addWishlistItem = async (item: NewWishlistItem) => {
	return (await db.insertInto('items').values(item).returningAll().execute());
}