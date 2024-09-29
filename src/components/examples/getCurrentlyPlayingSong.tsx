"use client"

import React from "react"

export const GetCurrentlyPlayingSong = () => {

  return (
    <div className="bg-white/[.1] px-1 rounded mt-1 mb-6">
      <code className="block whitespace-pre-wrap break-all px-3 rounded text-xs md:text-sm relative h-auto items-center text-white">
            <div className="py-2">
{`import React, { useState } from "react"
import { useSpotify, SpotifyTrack } from "usespotify-react"

export const GetCurrentlyPlayingSong = () => {
  const client_id = process.env.CLIENT_ID as string;
  const client_secret = process.env.CLIENT_SECRET as string;
  const refresh_token = process.env.REFRESH_TOKEN as string;

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
        {currentSong === null ? <>No song playing</> : <>{currentSong!.name}</>}
      </div>
    </div>
  )
}`}
            </div>
      </code>
    </div>
  )
}
