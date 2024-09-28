"use client"

import { useSpotify, SpotifyTrack } from "@/hooks/use-spotify"
import React, { useState } from "react"

export const Example = () => {
    // const user_id = process.env.NEXT_PUBLIC_USER_ID as string
    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string
    const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string
    const refresh_token = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string
    // const playlist_id = "6LXr2sAxWew8aRSLOcsLfK"
    const { getCurrentlyPlayingSong } = useSpotify({client_id, client_secret, refresh_token});
    const [currentSong, setCurrentSong] = useState<SpotifyTrack | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchSong = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedSong = await getCurrentlyPlayingSong();
            setCurrentSong(fetchedSong)
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
      <button onClick={handleFetchSong} disabled={loading}>
        {loading ? 'Looking...' : 'See for currently playing'}
      </button>
      {error && <div>Error: {error}</div>}
      <div>
        {currentSong === null ? <>No song playing</> : <>{currentSong!.name}</>}
      </div>
    </div>
  )
}
