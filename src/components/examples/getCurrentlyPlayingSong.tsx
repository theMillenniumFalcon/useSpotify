"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const codeString = `import React, { useState } from "react";
import { useSpotify, SpotifyTrack } from "usespotify-react";

export const GetCurrentlyPlayingSong = () => {
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
        <button
          className="text-zinc-100 font-bold py-2 px-4 rounded border border-zinc-500"
          onClick={handleFetchCurrentSong}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'See currently playing song'}
        </button>

        <div className="text-sm font-normal text-zinc-300">
          {error && <div>Error: {error}</div>}
          {currentSong === null ? "No song is playing" : <>{currentSong!.name}</>}
        </div>
      </div>
    )
}`

export const GetCurrentlyPlayingSong = () => {
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
