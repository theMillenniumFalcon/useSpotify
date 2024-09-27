import { useCallback } from "react"
import { UseSpotifyHookProps, PlaylistsResponse, Playlist, PlaylistSongsResponse, PlaylistSong } from "./types"

const SPOTIFY_REST_URL: string = "https://api.spotify.com" as const

export const useSpotify = ({
    userId,
    accessToken,
    id
}: UseSpotifyHookProps) => {
    const getAllPlaylists: () => Promise<Playlist[]> = useCallback(async () => {
        try {
            if (!userId || userId === "") {
                throw new Error(`Invalid user ID: Expected a non-empty string, but received ${JSON.stringify(userId)}`)
            }
    
            const response = await fetch(`${SPOTIFY_REST_URL}/v1/users/${userId}/playlists`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed to fetch playlists: ${response.status} ${response.statusText}`)
            }
    
            const data: PlaylistsResponse = await response.json()
            return data.items
        } catch (error) {
            let errorMessage = `Failed to retrieve playlists for user ${userId || "${userId}"}`
            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }
            console.error(`Error fetching playlists for user ${userId}:`, error)
            throw new Error(errorMessage)
        }
    }, [userId, accessToken])

    const getPlaylistSongs: () => Promise<PlaylistSong[]> = useCallback(async () => {
        try {
            if (!id || id === "") {
                throw new Error(`Invalid playlist ID: Expected a non-empty string, but received ${JSON.stringify(id)}`)
            }

            const response = await fetch(`${SPOTIFY_REST_URL}/v1/playlists/${id}/tracks`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed to fetch playlist tracks: ${response.status} ${response.statusText}`)
            }
        
            const data: PlaylistSongsResponse = await response.json()
            return data.items
        } catch (error) {
            let errorMessage = `Failed to retrieve tracks for playlist ${id || "${id}"}`

            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }

            console.error(`Error fetching tracks for playlist ${id}:`, error)
            throw new Error(errorMessage)
        }
    }, [accessToken])
    
    return { getAllPlaylists, getPlaylistSongs }
}