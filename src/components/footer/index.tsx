"use client"

import React from "react"
import { RiArrowRightUpLine } from "react-icons/ri"

const Footer = () => {
    return (
        <footer className="pt-8">
            <hr className="h-px border-0 bg-neutral-300" />
            <div className="mx-1 flex justify-end pt-4">
                <span className="text-xs text-body flex flex-row">
                    <span>Made with ❤️ by</span>
                    <a
                        href="https://nishank.vercel.app"
                        rel="noopenner noreferrer"
                        target="_blank"
                        className="group flex items-center underline-offset-4 transition duration-150 ease-in-out underline ml-1">
                        Nishank Priydarshi
                        <RiArrowRightUpLine
                            className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                        />
                    </a>
                </span>
            </div>
        </footer>
    )
}

export default Footer