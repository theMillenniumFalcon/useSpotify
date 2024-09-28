"use client"

import React, { useState } from "react"
import { useSpotify, SpotifyTrack } from "@/hooks/use-spotify"

export const Example = () => {
  // const user_id = process.env.NEXT_PUBLIC_USER_ID as string
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string
  const refresh_token = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string
  // const playlist_id = "6LXr2sAxWew8aRSLOcsLfK"
  const { getCurrentlyPlayingSong } = useSpotify({ client_id, client_secret, refresh_token });
  const [currentSong, setCurrentSong] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchCurrentSong = async () => {
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
      <button className="text-white font-bold py-2 px-4 rounded border border-white/[.1]" onClick={handleFetchCurrentSong} disabled={loading}>
        {loading ? 'Fetching...' : 'See currently playing song'}
      </button>
      {error && <div>Error: {error}</div>}
      <div>
        {currentSong === null ? <>No song is playing</> : <>{currentSong!.name}</>}
      </div>
    </div>
  )
}
