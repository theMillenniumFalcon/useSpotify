"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const codeString = `import React, { useState } from "react";
import { useSpotify, SpotifyPlaylist } from "usespotify-react";

export const GetPlaylists = () => {
    const { getPlaylists } = useSpotify({ client_id, client_secret, refresh_token });
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchPlaylists = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedPlaylists = await getPlaylists(user_id);
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
      <button
        className="text-zinc-100 font-bold py-2 px-4 rounded border border-zinc-500"
        onClick={handleFetchPlaylists}
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch Playlists'}
      </button>
      <ul className="mt-4 text-sm font-normal text-zinc-300">
        {error && <div>Error: {error}</div>}
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  )
}`

export const GetPlaylists = () => {
  return (
    <div className="bg-white/[.1] px-1 rounded mt-1 mb-6">
      <SyntaxHighlighter
        language="typescript"
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: '8px 12px',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          backgroundColor: 'transparent',
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}
