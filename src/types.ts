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

export interface WishlistItemTable{
	id: Generated<number>,
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

export type OmdbResponse = OmdbSuccessResponse | OmdbErrorResponse;
interface OmdbSuccessResponse{
	Title: string, // "Guardians of the Galaxy Vol. 2",
	Year: string, // "2017",
	Rated: string, // "PG-13",
	Released: string, // "05 May 2017",
	Runtime: string, // "136 min",
	Genre: string, // "Action, Adventure, Comedy",
	Director: string, // "James Gunn",
	Writer: string, // "James Gunn, Dan Abnett, Andy Lanning",
	Actors: string, // "Chris Pratt, Zoe Saldana, Dave Bautista",
	Plot: string, // "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
	Language: string, // "English",
	Country: string, // "United States",
	Awards: string, // "Nominated for 1 Oscar. 15 wins & 60 nominations total",
	Poster: string, // "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
	Ratings: OmdbRating[],
	Metascore: string, // "67",
	imdbRating: string, // "7.6",
	imdbVotes: string, // "745,617",
	imdbID: string, // "tt3896198",
	Type: string, // "movie",
	DVD: string, // "10 Jul 2017",
	BoxOffice: string, // "$389,813,101",
	Production: string, // "N/A",
	Website: string, // "N/A",
	Response: string, // "True"
}
interface OmdbRating{
	Source: string, // "Internet Movie Database", "Rotten Tomatoes", "Metacritic"
	Value: string // "7.6/10", "85%", "67/100"
}
interface OmdbErrorResponse{
	Response: string, // "False",
	Error: string, // "Incorrect IMDb ID."
}