export interface UseSpotifyHookProps {
    userId: string;
    accessToken: string;
    id?: string;
}

export interface PlaylistsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Playlist[];
}

export interface Playlist {
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

export interface PlaylistSongsResponse {
    href: string;
    items: PlaylistSong[];
}

export interface PlaylistSong {
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