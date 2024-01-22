import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely"

export enum WishlistItemType{
	Movie,
	Series,
	MovieAnime,
	SeriesAnime,
	// MovieInternational,
	// SeriesInternational,
	MusicVideo,
	Documentary
}
export enum WishlistItemStatus{
	Pending,
	Added,
	WillNotAdd,
	Archived
}

export interface WishlistItemTable{
	id: Generated<number>,
	status: ColumnType<WishlistItemStatus, number | undefined, WishlistItemStatus | undefined>,
	lastStatusChange: ColumnType<number, number | undefined, number | undefined>,
	type: ColumnType<WishlistItemType, number, WishlistItemType | undefined>,
	name: string,
	poster: string,
	createdAt: ColumnType<number, number | undefined, number | undefined>,
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
export type WishlistItemWithUser = Exclude<WishlistItem, 'createdBy'> & {createdBy: User};

export interface UserTable{
	id: Generated<number>,
	jellyfinId: string,
	name: string
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

interface JellyfinAuthSuccessResponse{
	User: {
		Name: string, //"admin",
		ServerId: string, //"b1acbb137e6b412a9b39bc51b428130e",
		Id: string, //"357eeed6fedf4c1cb6852b1831d08d26",
		HasPassword: boolean,
		HasConfiguredPassword: boolean,
		HasConfiguredEasyPassword: boolean,
		EnableAutoLogin: boolean,
		LastLoginDate: string, //"2024-01-12T20:19:07.6302393Z",
		LastActivityDate: string, //"2024-01-12T20:19:07.6302393Z",
		Configuration: {
			AudioLanguagePreference: string,
			PlayDefaultAudioTrack: boolean,
			SubtitleLanguagePreference: string,
			DisplayMissingEpisodes: boolean,
			GroupedFolders: string[],
			SubtitleMode: string,
			DisplayCollectionsView: boolean,
			EnableLocalPassword: boolean,
			OrderedViews: string[],
			LatestItemsExcludes: string[],
			MyMediaExcludes: string[],
			HidePlayedInLatest: boolean,
			RememberAudioSelections: boolean,
			RememberSubtitleSelections: boolean,
			EnableNextEpisodeAutoPlay: boolean
		},
		Policy: {
			IsAdministrator: boolean,
			IsHidden: boolean,
			IsDisabled: boolean,
			BlockedTags: string[],
			EnableUserPreferenceAccess: boolean,
			AccessSchedules: string[],
			BlockUnratedItems: string[],
			EnableRemoteControlOfOtherUsers: boolean,
			EnableSharedDeviceControl: boolean,
			EnableRemoteAccess: boolean,
			EnableLiveTvManagement: boolean,
			EnableLiveTvAccess: boolean,
			EnableMediaPlayback: boolean,
			EnableAudioPlaybackTranscoding: boolean,
			EnableVideoPlaybackTranscoding: boolean,
			EnablePlaybackRemuxing: boolean,
			ForceRemoteSourceTranscoding: boolean,
			EnableContentDeletion: boolean,
			EnableContentDeletionFromFolders: unknown[],
			EnableContentDownloading: boolean,
			EnableSyncTranscoding: boolean,
			EnableMediaConversion: boolean,
			EnabledDevices: string[],
			EnableAllDevices: boolean,
			EnabledChannels: string[],
			EnableAllChannels: boolean,
			EnabledFolders: string[],
			EnableAllFolders: boolean,
			InvalidLoginAttemptCount: number,
			LoginAttemptsBeforeLockout: number,
			MaxActiveSessions: number,
			EnablePublicSharing: boolean,
			BlockedMediaFolders: string[],
			BlockedChannels: string[],
			RemoteClientBitrateLimit: number,
			AuthenticationProviderId: string,
			PasswordResetProviderId: string,
			SyncPlayAccess: string
		}
	},
	SessionInfo: {
		PlayState: {
			CanSeek: boolean,
			IsPaused: boolean,
			IsMuted: boolean,
			RepeatMode: string
		},
		AdditionalUsers: [],
		Capabilities: {
			PlayableMediaTypes: string[],
			SupportedCommands: string[],
			SupportsMediaControl: boolean,
			SupportsContentUploading: boolean,
			SupportsPersistentIdentifier: boolean,
			SupportsSync: boolean
		},
		RemoteEndPoint: string,
		PlayableMediaTypes: string[],
		Id: string,
		UserId: string,
		UserName: string,
		Client: string,
		LastActivityDate: string, //"2024-01-12T20:19:07.6370194Z",
		LastPlaybackCheckIn: string, //"0001-01-01T00:00:00.0000000Z",
		DeviceName: string,
		DeviceId: string,
		ApplicationVersion: string,
		IsActive: boolean,
		SupportsMediaControl: boolean,
		SupportsRemoteControl: boolean,
		NowPlayingQueue: unknown[],
		NowPlayingQueueFullItems: unknown[],
		HasCustomDeviceName: boolean,
		ServerId: string,
		SupportedCommands: string[]
	},
	AccessToken: string,
	ServerId: string
}
export type JellyfinAuthResponse = JellyfinAuthSuccessResponse | string;