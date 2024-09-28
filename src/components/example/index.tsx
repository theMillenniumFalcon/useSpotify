"use client"

import { useSpotify, SpotifyPlaylistSong } from "@/hooks/use-spotify"
import React, { useState } from "react"

export const Example = () => {
    // const user_id = process.env.NEXT_PUBLIC_USER_ID as string
    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string
    const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string
    const refresh_token = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string
    const playlist_id = "6LXr2sAxWew8aRSLOcsLfK"
    const { getPlaylistSongs } = useSpotify({client_id, client_secret, playlist_id, refresh_token});
    const [playlists, setPlaylists] = useState<SpotifyPlaylistSong[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchPlaylists = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedPlaylists = await getPlaylistSongs();
          setPlaylists(fetchedPlaylists);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
              setError('An unknown error occurred');
          }
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>
      <button onClick={handleFetchPlaylists} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Playlists'}
      </button>
      {error && <div>Error: {error}</div>}
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.track.id}>{playlist.track.name}</li>
        ))}
      </ul>
    </div>
  )
}
