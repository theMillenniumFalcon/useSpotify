"use client"

import React from "react"

export const GetUserInfo = () => {

  return (
    <div className="bg-white/[.1] px-1 rounded mt-1 mb-6">
      <code className="block whitespace-pre-wrap break-all px-3 rounded text-xs md:text-sm relative h-auto items-center text-white">
            <div className="py-2">
{`import React, { useState } from "react";
import { useSpotify, SpotifyUserProfile } from "@/hooks/use-spotify";

export const GetUserInfo = () => {
  const { getUserInfo } = useSpotify({ client_id, client_secret, refresh_token });
  const [user, setUser] = useState<SpotifyUserProfile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedInfo = await getUserInfo();
      setUser(fetchedInfo);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
        setLoading(false);
    };
  };

  return (
    <div>
      <button className="text-zinc-100 font-bold py-2 px-4 rounded border border-zinc-500" onClick={handleFetchInfo} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Info'}
      </button>
      <ul className="mt-4 text-sm font-normal text-zinc-300">
        {error && <div >Error: {error}</div>}
        user ID is: {user?.id}
      </ul>
    </div>
  )
}`}
            </div>
      </code>
    </div>
  )
}
