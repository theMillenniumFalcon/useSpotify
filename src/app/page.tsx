"use client"

import { Example } from "@/components/example"
import { GenerateUserID } from "@/components/generateUserID"
import { Installation } from "@/components/installation"
import { Signature } from "@/components/signature"
import { FaSpotify } from "react-icons/fa6"
import { RiArrowRightUpLine } from "react-icons/ri"

export default function Home() {
  return (
      <main className="font-[family-name:var(--font-geist-mono)]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[2rem] font-bold">useSpotify()</h1>
          <a
            href="https://github.com/theMillenniumFalcon/useSpotify"
            rel="noopenner noreferrer"
            target="_blank"
            className="group flex items-center underline-offset-4 transition duration-150 ease-in-out underline">
            <span className="text-sm">See source</span>
            <RiArrowRightUpLine
              className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            />
          </a>
        </div>

        <FaSpotify className="text-2xl" />

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-sm">
            The <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">useSpotify</code> hook provides an easy way to interact with the Spotify API in your React applications. It allows you to search for tracks, manage playback, and access user&apos;s Spotify data.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <Installation />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Signature</h2>
          <Signature />
          <p className="text-sm mt-4 mb-2">
            To generate userId:
          </p>
          <GenerateUserID />
          <p className="text-sm mt-2">
            userId can be found as the value of the key "id"
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Example</h2>
          <Example />
        </section>

        {/* <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}
      </main>
  );
}
