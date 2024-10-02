"use client"

import React from "react"

export const Response = () => {

  return (
    <div className="border border-white/[.1] px-1 rounded mt-1">
      <code className="block whitespace-pre-wrap break-all px-3 rounded text-xs md:text-sm relative h-auto items-center text-white">
            <div className="my-2">
{`{
    "access_token": "BQD...woC",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "AQD...w-e4",
    "scope": "<your_desired_scope>"
}`}
            </div>
      </code>
    </div>
  )
}
