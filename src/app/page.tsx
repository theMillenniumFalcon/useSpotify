"use client"

import React from "react"
import Link from "next/link"
import { RiArrowRightUpLine } from "react-icons/ri"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

import { GetPlaylists } from "@/components/examples/getPlaylists"
import { GetCurrentlyPlayingSong } from "@/components/examples/getCurrentlyPlayingSong"
import { GetPlaylistSongs } from "@/components/examples/getPlaylistSongs"
import { SearchSongs } from "@/components/examples/searchSongs"
import { Installation } from "@/components/installation"
import { Signature } from "@/components/signature"
// import { Example } from "@/components/example"
import { GetUserInfo } from "@/components/examples/getUserInfo"
import { GetTopItems } from "@/components/examples/getTopItems"

export default function Home() {
  return (
      <main className="font-[family-name:var(--font-geist-mono)]">
        <div className="flex items-center justify-between mb-14">
          <h1 className="text-[1.5rem] md:text-[2rem] font-bold">useSpotify</h1>
          <a
            href="https://github.com/theMillenniumFalcon/useSpotify"
            rel="noopenner noreferrer"
            target="_blank"
            className="group flex items-center underline underline-offset-4 transition duration-150 ease-in-out">
            <span className="text-xs md:text-sm">See source</span>
            <RiArrowRightUpLine className="opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </a>
        </div>

        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-xs md:text-sm">
            The <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">useSpotify</code> hook provides an easy way to interact with the Spotify API in your React applications. It allows you to search for tracks, manage playback, and access user&apos;s Spotify data.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Contents</h2>
          <p className="text-xs md:text-sm mb-2">
            <Link href="#installation" className="underline underline-offset-4">
              Installation
            </Link>  
          </p>
          <p className="text-xs md:text-sm mb-2">
            <Link href="#signature" className="underline underline-offset-4">
              Signature
            </Link>  
          </p>
          <p className="text-xs md:text-sm mb-2">
            <Link href="#user-info" className="underline underline-offset-4">
              Get User Info
            </Link>
            {" "}
            <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">new</code>
          </p>
          <p className="text-xs md:text-sm mb-2">
            <Link href="#all-playlists" className="underline underline-offset-4">
              Get All Playlists of a User
            </Link>
          </p>
          <p className="text-xs md:text-sm mb-2">
            <Link href="#all-playlist-songs" className="underline underline-offset-4">
              Get All Songs of a Playlist
            </Link>
          </p>
          <p className="text-xs md:text-sm mb-2">
            <Link href="#currently-playing-song" className="underline underline-offset-4">
              Get the Currently Playing Song
            </Link>
          </p>
          <p className="text-xs md:text-sm mb-2">
            <Link href="#top-artists-and-tracks" className="underline underline-offset-4">
              Get Top Artists and Tracks of the User
            </Link>
            {" "}
            <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">new</code>
          </p>
          <p className="text-xs md:text-sm">
            <Link href="#search-songs" className="underline underline-offset-4">
              Search for Songs
            </Link>
            {" "}
            <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">new</code>
          </p>
        </section>

        <section id="installation" className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Installation</h2>
          <Installation />
        </section>

        <section id="signature" className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Signature</h2>
          <Signature />
          <h3 className="text-sm md:text-base">• Parameters:</h3>
          <ol className="list-inside list-decimal my-2 mx-3 text-xs md:text-sm text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-4">
              client_id (required) <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">string</code>:
              The client ID of the application created from the spotify dashboard.
            </li>
            <li className="mb-4">
              client_secret (required) <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">string</code>:
              The client secret of the application created from the spotify dashboard.
            </li>
            <li className="mb-4">
              refresh_token (required) <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">string</code>:
              The refresh token that is created manually using client_id and client_secret.
            </li>
          </ol>
          <h3 className="text-sm md:text-base">• Return Values:</h3>
          <div className="flex flex-col space-y-2 my-2">
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
                {`type TopItemType = "artists" | "tracks"`}
              </SyntaxHighlighter>
            </div>
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
                {`type PaginationParams = { 
  limit?: number;
  offset?: number;
}`}
              </SyntaxHighlighter>
            </div>
          </div>
          <ol className="list-inside list-decimal my-4 mx-3 text-xs md:text-sm text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-4">
              <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">{`getUserInfo(): Promise<SpotifyUserProfile>`}</code>:
              Returns the User Info.
            </li>
            <li className="mb-4">
              <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">{`getPlaylists(user_id: string, paginationParams?: PaginationParams): Promise<SpotifyPlaylist[]>`}</code>:
              Returns all playlists of a given user.
            </li>
            <li className="mb-4">
              <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">{`getPlaylistSongs(playlist_id: string): Promise<SpotifyPlaylistSong[]>`}</code>:
              Returns all songs of a given playlist.
            </li>
            <li className="mb-4">
              <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">{`getCurrentlyPlayingSong(): Promise<SpotifyTrack | null>`}</code>:
              Returns the song currently playing for the user.
            </li>
            <li className="mb-4">
              <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">{`getUserTopItems<T extends TopItemType>(type: T, paginationParams?: PaginationParams): Promise<T extends "artists" ? SpotifyTopArtist[] : SpotifyTopTrack[]>`}</code>:
              Returns the song currently playing for the user.
            </li>
            <li>
              <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">{`searchSongs(search_query: string, debounce_timer?: number): Promise<SpotifySearchTrack[]>`}</code>:
              Returns an array of songs as per user query.
            </li>
          </ol>
          
          <p className="text-sm mt-4">
            The refresh token needs to be generated manually using the client_id and client_secret,
            follow{" "}
            <Link
              href="/generate-refresh-token"
              className="underline underline-offset-4"
            >
              these steps
            </Link>
            {" "}to generate the token.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Examples to demonstrate useSpotify() hook</h2>
          <h3 id="user-info" className="text-sm md:text-base">• To get user info:</h3>
          <GetUserInfo />
          <h3 id="all-playlists" className="text-sm md:text-base">• To get all Playlists of a User:</h3>
          <GetPlaylists />
          <h3 id="all-playlist-songs" className="text-sm md:text-base mt-10">• To get all Songs of a Playlist:</h3>
          <GetPlaylistSongs />
          <h3 id="currently-playing-song" className="text-sm md:text-base mt-10">• To get the Currently Playing Song:</h3>
          <GetCurrentlyPlayingSong />
          <h3 id="top-artists-and-tracks" className="text-sm md:text-base mt-10">• To get Top Artists and Tracks of the User:</h3>
          <GetTopItems />
          <h3 id="search-songs" className="text-sm md:text-base mt-10">• Search for songs:</h3>
          <SearchSongs />
        </section>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Example</h2>
          <Example />
        </section> */}
      </main>
  );
}
