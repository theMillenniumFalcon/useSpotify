"use client"

import React, { useState } from "react"
import { useSpotify, SpotifyTopTrack, SpotifyTopArtist } from "@/hooks/use-spotify"

export const Example = () => {
  // const user_id = process.env.NEXT_PUBLIC_USER_ID as string
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string
  const refresh_token = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string
  // const playlist_id = "6LXr2sAxWew8aRSLOcsLfK"
  
  const { getUserTopItems } = useSpotify({ client_id, client_secret, refresh_token });
  const [items, setItem] = useState<SpotifyTopArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const handleFetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedItems = await getUserTopItems("artists", { limit: 20, offset: 0 });
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
}
