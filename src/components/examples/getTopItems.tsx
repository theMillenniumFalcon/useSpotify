"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const codeString = `import React, { useState } from "react";
import { useSpotify, SpotifyTopTrack, SpotifyTopArtist } from "usespotify-react";

export const GetAllItems = () => {
    const client_id = process.env.CLIENT_ID as string;
    const client_secret = process.env.CLIENT_SECRET as string;
    const refresh_token = process.env.REFRESH_TOKEN as string;
    
    const { getUserTopItems } = useSpotify({ client_id, client_secret, refresh_token });
    const [items, setItem] = useState<SpotifyTopArtist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedItems = await getUserTopItems("artists", { limit: 30, offset: 5 });
          setItem(fetchedItems);
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
            onClick={handleFetchItems}
            disabled={loading}
        >
            {loading ? 'Fetching...' : 'Fetch Items'}
        </button>
        <ul className="mt-4 text-sm font-normal text-zinc-300">
            {error && <div>Error: {error}</div>}
            {items.map((item) => (
            <li key={item.id}>{item.name}</li>
            ))}
        </ul>
        </div>
    )
}`

export const GetTopItems = () => {
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
