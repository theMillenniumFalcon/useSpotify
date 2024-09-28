"use client"

import React from "react"
import Link from "next/link"
import { RiArrowRightUpLine } from "react-icons/ri"

import { Example } from "@/components/example"
import { GetAllPlaylists } from "@/components/examples/getAllPlaylists"
import { GetCurrentlyPlayingSong } from "@/components/examples/getCurrentlyPlayingSong"
import { GetPlaylistSongs } from "@/components/examples/getPlaylistSongs"
import { GenerateUserID } from "@/components/generateUserID"
import { Installation } from "@/components/installation"
import { Signature } from "@/components/signature"

export default function Home() {
  return (
      <main className="font-[family-name:var(--font-geist-mono)]">
        <div className="flex items-center justify-between mb-14">
          <h1 className="text-[1.5rem] md:text-[2rem] font-bold">useSpotify</h1>
          <a
            href="https://github.com/theMillenniumFalcon/useSpotify"
            rel="noopenner noreferrer"
            target="_blank"
            className="group flex items-center underline-offset-4 transition duration-150 ease-in-out underline">
            <span className="text-xs md:text-sm">See source</span>
            <RiArrowRightUpLine
              className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            />
          </a>
        </div>

        {/* <FaSpotify className="text-2xl" /> */}

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-xs md:text-sm">
            The <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">useSpotify</code> hook provides an easy way to interact with the Spotify API in your React applications. It allows you to search for tracks, manage playback, and access user&apos;s Spotify data.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Installation</h2>
          <Installation />
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Signature</h2>
          <Signature />
          <p className="text-sm mt-4">
              To generate userId, run the following cURL command, userId can be found as the value of the key &quot;id&quot;:
            </p>
            <GenerateUserID />
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
          <h3 className="text-sm md:text-base">• To get all Playlists of a User:</h3>
          <GetAllPlaylists />
          <h3 className="text-sm md:text-base">• To get all Songs of a Playlist:</h3>
          <GetPlaylistSongs />
          <h3 className="text-sm md:text-base">• To get the Currently Playing Song:</h3>
          <GetCurrentlyPlayingSong />
        </section>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Example</h2>
          <Example />
        </section> */}
      </main>
  );
}
