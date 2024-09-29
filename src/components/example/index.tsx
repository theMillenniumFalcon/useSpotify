"use client"

import React, { useState } from "react"
import { useSpotify, SpotifyPlaylist } from "@/hooks/use-spotify"

export const Example = () => {
  const user_id = process.env.NEXT_PUBLIC_USER_ID as string
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string
  const refresh_token = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string
  // const playlist_id = "6LXr2sAxWew8aRSLOcsLfK"
  
  const { getAllPlaylists } = useSpotify({ client_id, client_secret, refresh_token });
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPlaylists = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPlaylists = await getAllPlaylists(user_id);
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
      <button className="text-zinc-100 font-bold py-2 px-4 rounded border border-zinc-500" onClick={handleFetchPlaylists} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Playlists'}
      </button>
      <ul className="mt-4">
        {error && <div>Error: {error}</div>}
        {playlists.map((playlist) => (
          <li className="text-sm font-normal text-zinc-300" key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  )
}
