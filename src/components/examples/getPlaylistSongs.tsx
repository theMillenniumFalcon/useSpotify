"use client"

import React from "react"

export const GetPlaylistSongs = () => {

  return (
    <div className="bg-white/[.1] px-1 rounded mt-1 mb-6">
      <code className="block whitespace-pre-wrap break-all px-3 rounded text-xs md:text-sm relative h-auto items-center text-white">
            <div className="py-2">
{`import React, { useState } from "react";
import { useSpotify, SpotifyPlaylistSong } from "usespotify-react";

export const GetPlaylistSongs = () => {
    const client_id = process.env.CLIENT_ID as string;
    const client_secret = process.env.CLIENT_SECRET as string;
    const refresh_token = process.env.REFRESH_TOKEN as string;
    const playlist_id = process.env.PLAYLIST_ID as string;

    const { getPlaylistSongs } = useSpotify({ client_id, client_secret, refresh_token });
    const [songs, setSongs] = useState<SpotifyPlaylistSong[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchSongs = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedSongs = await getPlaylistSongs(playlist_id);
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
        <button className="text-zinc-100 font-bold py-2 px-4 rounded border border-zinc-500" onClick={handleFetchSongs} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Songs'}
        </button>
        
        <ul className="mt-4">
          {error && <div>Error: {error}</div>}
          {songs.map((song) => (
            <li className="text-sm font-normal text-zinc-300" key={song.track.id}>{song.track.name}</li>
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
