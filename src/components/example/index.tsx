"use client"

import React, { useState, useEffect } from "react"
import { useSpotify, SpotifySearchTrack } from "@/hooks/use-spotify"
import { BiSearch } from "react-icons/bi" 

export const Example = () => {
  // const user_id = process.env.NEXT_PUBLIC_USER_ID as string
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string
  const refresh_token = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string
  // const playlist_id = "6LXr2sAxWew8aRSLOcsLfK"
  
  const { searchSongs } = useSpotify({ client_id, client_secret, refresh_token });
  const [songResults, setSongResults] = useState<SpotifySearchTrack[]>([]);
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setQuery(search);
      if (search) {
        try {
          const fetchedSongs = await searchSongs(search);
          setSongResults(fetchedSongs);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          };
        };
      };
    };
  
    fetchSongs();
  }, [search, searchSongs]);

  return (
    <div>
      <div className="flex items-center border-b border-b-zinc-100 px-4">
        <BiSearch className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search songs..."
        />
      </div>
      <div className="text-sm mt-4 text-muted-foreground">
        {query ? (
          <div className="w-80 overflow-hidden text-ellipsis whitespace-nowrap px-4 text-sm font-normal text-zinc-400">
            Searching for:{" "}
            <span className="font-bold underline underline-offset-2">
              {query}
            </span>
          </div>
        ) : null}
      </div>

      {error && <div>Error: {error}</div>}

      <div className="w-full">
        {query ? (
          <div className="p-4 space-y-2">
            {songResults && songResults.map((song) => (
              <div key={song.id}>
                <div className="-mb-0.5 w-72 overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm">
                  {song?.name ?? "No Song Name"}
                </div>
                <div className="flex w-72 items-center space-x-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-zinc-500">
                  {song?.artists?.map((artist, i: number) => (
                    <div key={artist.name + song?.name}>
                      {artist.name + (i < song?.artists?.length - 1 ? "," : "")}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
