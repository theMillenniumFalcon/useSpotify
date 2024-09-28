interface UseSpotifyHookProps {
    client_id: string;
    client_secret: string;
    refresh_token: string;
    user_id?: string;
    playlist_id?: string;
}
interface PlaylistsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SpotifyPlaylist[];
}
interface SpotifyPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
        height: number | null;
        url: string;
        width: number | null;
    }>;
    name: string;
    owner: {
        display_name: string;
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
}
interface PlaylistSongsResponse {
    href: string;
    items: SpotifyPlaylistSong[];
}
interface SpotifyPlaylistSong {
    added_at: string;
    added_by: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    is_local: boolean;
    primary_color: string | null;
    track: {
        preview_url: string | null;
        available_markets: string[];
        explicit: boolean;
        type: string;
        episode: boolean;
        track: boolean;
        album: {
            available_markets: string[];
            type: string;
            album_type: string;
            href: string;
            id: string;
            images: Array<{
                height: number;
                url: string;
                width: number;
            }>;
            name: string;
            release_date: string;
            release_date_precision: string;
            uri: string;
            artists: Array<{
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }>;
            external_urls: {
                spotify: string;
            };
            total_tracks: number;
        };
        artists: Array<{
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
        }>;
        disc_number: number;
        track_number: number;
        duration_ms: number;
        external_ids: {
            isrc: string;
        };
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        name: string;
        popularity: number;
        uri: string;
        is_local: boolean;
    };
    video_thumbnail: {
        url: string | null;
    };
}
interface CurrentlyPlayingResponse {
    device: Device;
    repeat_state: string;
    shuffle_state: boolean;
    context: Context;
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: SpotifyTrack;
    currently_playing_type: string;
    actions: SpotifyTrackActions;
}
interface Device {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
    supports_volume: boolean;
}
interface Context {
    type: string;
    href: string;
    external_urls: ExternalUrls;
    uri: string;
}
interface ExternalUrls {
    spotify: string;
}
interface SpotifyTrack {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    };
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: Record<string, unknown>;
    restrictions?: {
        reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}
interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: {
        reason: string;
    };
    type: string;
    uri: string;
    artists: Artist[];
}
interface Image {
    url: string;
    height: number;
    width: number;
}
interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
interface SpotifyTrackActions {
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle: boolean;
    toggling_repeat_track: boolean;
    transferring_playback: boolean;
}
interface SpotifyTokenResponse {
    access_token: string;
}

declare const useSpotify: ({ client_id, client_secret, refresh_token, user_id, playlist_id, }: UseSpotifyHookProps) => {
    getAllPlaylists: () => Promise<SpotifyPlaylist[]>;
    getPlaylistSongs: () => Promise<SpotifyPlaylistSong[]>;
    getCurrentlyPlayingSong: () => Promise<SpotifyTrack | null>;
};

export { type Album, type CurrentlyPlayingResponse, type Device, type ExternalUrls, type Image, type PlaylistSongsResponse, type PlaylistsResponse, type SpotifyPlaylist, type SpotifyPlaylistSong, type SpotifyTokenResponse, type SpotifyTrack, type UseSpotifyHookProps, useSpotify };
