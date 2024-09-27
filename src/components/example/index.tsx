"use client"

import { useSpotify } from "@/hooks/use-spotify"
import React, { useState } from "react"

export const Example = () => {
    const userId = process.env.NEXT_PUBLIC_USER_ID as string
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string
    const { getAllPlaylists } = useSpotify(userId, accessToken);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchPlaylists = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedPlaylists = await getAllPlaylists();
            setPlaylists(fetchedPlaylists);
        } catch (err: any) {
            setError(err.message);
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
        {playlists.map((playlist: any) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  )
}
