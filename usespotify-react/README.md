# useSpotify-react

The `useSpotify` hook provides an easy way to interact with the Spotify API in your React applications. It allows you to search for tracks, manage playback, and access user's Spotify data.

## Installation

```bash
npm install usespotify-react
```

## Signature
```
const {
    getUserInfo,
    getPlaylists,
    getPlaylistSongs,
    getCurrentlyPlayingSong,
    searchSongs
} = useSpotify({
    client_id: 'your_spotify_client_id',
    client_secret: 'your_spotify_client_secret',
    refresh_token: 'your_spotify_refresh_token'
});
```

## API Methods
- `getUserInfo(): Promise<SpotifyUserProfile>`
    Fetch the Spotify profile information of the authenticated user.

- `getPlaylists(user_id: string, limit?: number, offset?: number): Promise<SpotifyPlaylist[]>`
    Fetch the playlists of a specified user, with optional limit and offset for pagination.
    - `user_id` (string, required): The Spotify user ID.
    - `limit` (number, optional): Number of playlists to retrieve (default is 20, max is 50).
    - `offset` (number, optional): The starting position for fetching playlists (default is 5, max is 100).

- `getPlaylistSongs(playlist_id: string): Promise<SpotifyPlaylistSong[]>`
    Fetch the songs from a specified playlist.
    - `playlist_id` (string, required): The ID of the Spotify playlist.

- `getCurrentlyPlayingSong(): Promise<SpotifyTrack | null>`
    Fetch the currently playing song for the authenticated user. Returns null if no song is playing.

- `searchSongs(search_query: string, debounce_timer?: number): Promise<SpotifySearchTrack[]>`
    Search for songs on Spotify based on the query string, with an optional debounce timer.
    - `search_query` (string, required): The search term to query tracks.
    - `debounce_timer` (number, optional): Delay in milliseconds before executing the search (default is 600ms).

## Error Handling
Each API method throws errors when something goes wrong. The errors are descriptive and provide details like invalid tokens, invalid playlist/user IDs, or network issues.