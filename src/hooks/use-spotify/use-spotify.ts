import { useCallback, useRef } from "react"
import {
    UseSpotifyHookProps,
    PlaylistsResponse,
    SpotifyPlaylist,
    PlaylistSongsResponse,
    SpotifyPlaylistSong,
    CurrentlyPlayingResponse,
    SpotifyTokenResponse,
    SpotifyTrack,
    SpotifySearchTrack,
    SearchSongsResponse
} from "./types"

const SPOTIFY_REST_URL: string = "https://api.spotify.com" as const
const DEFAULT_DEBOUNCE_TIMER: number = 600 as const

export const useSpotify = ({
    client_id,
    client_secret,
    refresh_token
}: UseSpotifyHookProps) => {
    const authorization = Buffer.from(`${client_id ?? ''}:${client_secret ?? ''}`).toString('base64')
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    const getAccessToken = async (): Promise<string> => {
        if (!refresh_token || refresh_token.trim() === "") {
          throw new Error(`Invalid refresh_token: Expected a non-empty string, but received ${JSON.stringify(refresh_token)}`)
        }
      
        const params = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token
        })
      
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${authorization}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: params,
            })
        
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch access token: ${response.status} ${response.statusText}. ${errorText}`)
            }
            
            const data: SpotifyTokenResponse = await response.json()
            
            if (!data.access_token) {
                throw new Error("Access token not found in the response")
            }
        
            return data.access_token
        } catch (error) {
            let errorMessage = "Failed to fetch access token"
            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }
            console.error(errorMessage, error)
            throw new Error(errorMessage)
        }
    }

    const getAllPlaylists: (user_id: string) => Promise<SpotifyPlaylist[]> = useCallback(async (user_id) => {
        try {
            const access_token = await getAccessToken()

            if (!access_token) {
                throw new Error("Access token is missing or invalid")
            }

            if (!user_id || user_id.trim() === "") {
                throw new Error(`Invalid user ID: Expected a non-empty string, but received ${JSON.stringify(user_id)}`)
            }
    
            const response = await fetch(`${SPOTIFY_REST_URL}/v1/users/${user_id}/playlists`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed to fetch playlists: ${response.status} ${response.statusText}`)
            }
    
            const data: PlaylistsResponse = await response.json()
            return data.items
        } catch (error) {
            let errorMessage = `Failed to retrieve playlists for user ${user_id || "${userId}"}`
            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }
            console.error(`Error fetching playlists for user ${user_id}:`, error)
            throw new Error(errorMessage)
        }
    }, [getAccessToken])

    const getPlaylistSongs = useCallback(async (playlist_id: string): Promise<SpotifyPlaylistSong[]> => {
        try {
            const access_token = await getAccessToken()

            if (!access_token) {
                throw new Error("Access token is missing or invalid")
            }

            if (!playlist_id || playlist_id === "") {
                throw new Error(`Invalid playlist ID: Expected a non-empty string, but received ${JSON.stringify(playlist_id)}`)
            }

            const response = await fetch(`${SPOTIFY_REST_URL}/v1/playlists/${playlist_id}/tracks`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed to fetch playlist tracks: ${response.status} ${response.statusText}`)
            }
        
            const data: PlaylistSongsResponse = await response.json()
            return data.items
        } catch (error) {
            let errorMessage = `Failed to retrieve tracks for playlist ${playlist_id || "${id}"}`

            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }

            console.error(`Error fetching tracks for playlist ${playlist_id}:`, error)
            throw new Error(errorMessage)
        }
    }, [getAccessToken])

    const getCurrentlyPlayingSong = useCallback(async (): Promise<SpotifyTrack | null> => {
        try {
            const access_token = await getAccessToken()

            if (!access_token) {
                throw new Error("Access token is missing or invalid")
            }
        
            const response = await fetch(`${SPOTIFY_REST_URL}/v1/me/player/currently-playing`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
        
            if (response.status === 204) return null
        
            if (!response.ok) {
                throw new Error(`Failed to fetch currently playing song: ${response.status} ${response.statusText}`)
            }
        
            const data: CurrentlyPlayingResponse = await response.json()
            return data.item
        } catch (error) {
            let errorMessage = "Failed to retrieve currently playing song"

            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }
            
            console.error("Error fetching currently playing song:", error)
            throw new Error(errorMessage)
        }
    }, [getAccessToken])

    const searchSongs = useCallback(async (search_query: string, debounce_timer?: number): Promise<SpotifySearchTrack[]> => {
        const access_token = await getAccessToken()

        if (!access_token) {
            throw new Error("Access token is missing or invalid")
        }
       
        if (!search_query) {
            throw new Error(`Invalid query string: Expected a non-empty string, but received ${JSON.stringify(search_query)}`)
        }

        return new Promise((resolve, reject) => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }

            debounceTimerRef.current = setTimeout(async () => {
                try {
                    const response = await fetch(`${SPOTIFY_REST_URL}/v1/search?q=${encodeURIComponent(search_query)}&type=track&limit=10`, {
                        headers: {
                            "Authorization": `Bearer ${access_token}`,
                        },
                    })
           
                    if (!response.ok) {
                        throw new Error(`Failed to search songs: ${response.status} ${response.statusText}`)
                    }
           
                    const data: SearchSongsResponse = await response.json()
                    resolve(data.tracks.items)
                } catch (error) {
                    let errorMessage = "Failed to search songs"

                    if (error instanceof Error) {
                        errorMessage += `: ${error.message}`
                    } else if (typeof error === "string") {
                        errorMessage += `: ${error}`
                    } else {
                        errorMessage += ": An unknown error occurred"
                    }
                   
                    console.error("Error searching songs:", error)
                    reject(new Error(errorMessage))
                }
            }, debounce_timer ? debounce_timer : DEFAULT_DEBOUNCE_TIMER)
        })
    }, [getAccessToken])
    
    return {
        getAllPlaylists,
        getPlaylistSongs,
        getCurrentlyPlayingSong,
        searchSongs
    }
}