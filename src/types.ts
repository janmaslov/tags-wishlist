import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely"

export enum WishlistItemType{
	Movie,
	Series,
	MovieAnime,
	SeriesAnime,
	MovieInternational,
	SeriesInternational,
	MusicVideo,
	Documentary
}
export enum WishlistItemStatus{
	Pending,
	Added,
	WillNotAdd
}

export interface WishlistItemTable{
	id: Generated<number>,
	status: ColumnType<WishlistItemStatus, number | undefined, never>,
	type: ColumnType<WishlistItemType, number, never>,
	name: string,
	poster: string,
	createdAt: ColumnType<Date, string | undefined, never>,
	createdBy: string,

	// metadata
	year: number,
	imdbId?: string,
	tmdbId?: string,
	tvdbId?: string
}
export type WishlistItem = Selectable<WishlistItemTable>;
export type NewWishlistItem = Insertable<WishlistItemTable>;
export type WishlistItemUpdate = Updateable<WishlistItemTable>;

export interface UserTable{
	id: Generated<number>,
	jellyfinId: string,
	name: string
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;