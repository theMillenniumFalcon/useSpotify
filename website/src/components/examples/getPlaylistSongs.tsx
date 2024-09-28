"use client"

import React from "react"

export const GetPlaylistSongs = () => {

  return (
    <div className="bg-white/[.1] px-1 rounded mt-1 mb-6">
      <code className="block whitespace-pre-wrap break-all px-3 rounded text-xs md:text-sm relative h-auto items-center text-white">
            <div className="py-2">
{`import React, { useState } from "react"
import { useSpotify, SpotifyPlaylistSong } from "@/hooks/use-spotify"

export const GetPlaylistSongs = () => {
    const client_id = process.env.CLIENT_ID as string;
    const client_secret = process.env.CLIENT_SECRET as string;
    const refresh_token = process.env.REFRESH_TOKEN as string;
    const playlist_id = process.env.PLAYLIST_ID as string;

    const { getPlaylistSongs } = useSpotify({ client_id, client_secret, refresh_token, playlist_id });
    const [songs, setSongs] = useState<SpotifyPlaylistSong[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchSongs = async () => {
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
          <button className="text-white font-bold py-2 px-4 rounded border border-white/[.1]" onClick={handleFetchSongs} disabled={loading}>
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
}`}
            </div>
      </code>
    </div>
  )
}
