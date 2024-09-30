"use client"

import React from "react"

export const GetAllPlaylists = () => {

  return (
    <div className="bg-white/[.1] px-1 rounded mt-1 mb-6">
      <code className="block whitespace-pre-wrap break-all px-3 rounded text-xs md:text-sm relative h-auto items-center text-white">
            <div className="py-2">
{`import React, { useState } from "react";
import { useSpotify, SpotifyPlaylist } from "usespotify-react";

export const GetAllPlaylists = () => {
    const { getAllPlaylists } = useSpotify({ client_id, client_secret, refresh_token });
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [loading, setLoading] = useState(false);
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
      <ul className="mt-4 text-sm font-normal text-zinc-300">
        {error && <div >Error: {error}</div>}
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
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
