"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const codeString = `import React, { useState, useEffect } from "react";
import { useSpotify, SpotifySearchTrack } from "usespotify-react";
import { BiSearch } from "react-icons/bi";

export const SearchSongs = () => {
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
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
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
}`

export const SearchSongs = () => {
  return (
    <div className="bg-white/[.1] px-1 rounded mt-1">
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
