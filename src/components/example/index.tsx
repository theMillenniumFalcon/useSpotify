"use client"

import { useSpotify, PlaylistSong } from "@/hooks/use-spotify"
import React, { useState } from "react"

export const Example = () => {
    const userId = process.env.NEXT_PUBLIC_USER_ID as string
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string
    const id = ""
    const { getPlaylistSongs } = useSpotify({userId, accessToken, id});
    const [songs, setSongs] = useState<PlaylistSong[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchPlaylists = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedSongs = await getPlaylistSongs();
            setSongs(fetchedSongs);
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
        {loading ? 'Fetching...' : 'Fetch Songs'}
      </button>
      {error && <div>Error: {error}</div>}
      <ul>
        {songs.map((song) => (
          <li key={song.track.id}>{song.track.name}</li>
        ))}
      </ul>
    </div>
  )
}
