export interface UseSpotifyHookProps {
    client_id: string;
    client_secret: string;
    refresh_token: string;
}

export interface SpotifyUserProfile {
  display_name: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  type: 'user';
  uri: string;
  followers: SpotifyFollowers;
}

interface SpotifyFollowers {
  href: string | null;
  total: number;
}

export interface SpotifyPlaylistsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SpotifyPlaylist[];
}

export interface SpotifyPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: SpotifyExternalUrls;
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
        external_urls: SpotifyExternalUrls;
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

export interface SpotifyPlaylistSongsResponse {
    href: string;
    items: SpotifyPlaylistSong[];
}

export interface SpotifyPlaylistSong {
    added_at: string;
    added_by: {
      external_urls: SpotifyExternalUrls;
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
          external_urls: SpotifyExternalUrls;
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }>;
        external_urls: SpotifyExternalUrls;
        total_tracks: number;
      };
      artists: Array<{
        external_urls: SpotifyExternalUrls;
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      disc_number: number;
      track_number: number;
      duration_ms: number;
      external_ids: SpotifyExternalIds;
      external_urls: SpotifyExternalUrls;
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

export interface SpotifyCurrentlyPlayingResponse {
    device: SpotifyDevice;
    repeat_state: string;
    shuffle_state: boolean;
    context: SpotifyContext;
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: SpotifyTrack;
    currently_playing_type: string;
    actions: SpotifyTrackActions;
}

export interface SpotifyDevice {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
    supports_volume: boolean;
}

interface SpotifyContext {
    type: string;
    href: string;
    external_urls: SpotifyExternalUrls;
    uri: string;
}

export interface SpotifyExternalUrls {
    spotify: string;
}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
      ean: string;
      upc: string;
    };
    external_urls: SpotifyExternalUrls;
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

export interface SpotifyAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: {
      reason: string;
    };
    type: string;
    uri: string;
    artists: SpotifyArtist[];
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
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

export interface SpotifyTokenResponse {
	access_token: string
}

export interface SpotifyExternalIds {
  isrc: string;
}

export interface SpotifySearchTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}

export interface SpotifySearchSongsResponse {
  tracks: {
    href: string;
    items: SpotifySearchTrack[]
  }
}

export interface SpotifyTopArtistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyTopArtist[];
}

export interface SpotifyTopArtist {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface SpotifyTopTracksResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyTopTrack[];
}

export interface SpotifyTopTrack {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: SpotifyArtist[];
  },
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: string;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}