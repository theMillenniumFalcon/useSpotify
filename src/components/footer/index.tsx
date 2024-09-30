"use client"

import React from "react"

const Footer = () => {
    return (
        <footer className="pt-8">
            <hr className="h-px border-0 bg-neutral-300" />
            <div className="mx-1 flex justify-end pt-4">
                <p className="text-xs md:text-sm">
                    Built with ❤️ by{" "}
                    <a
                        href="https://nishank.vercel.app"
                        rel="noopenner noreferrer"
                        target="_blank"
                        className="underline underline-offset-4"
                    >
                        Nishank Priydarshi
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer