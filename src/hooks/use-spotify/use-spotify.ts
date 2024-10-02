import { useCallback, useRef, useMemo } from "react"
import {
    UseSpotifyHookProps,
    SpotifyPlaylistsResponse,
    SpotifyPlaylist,
    SpotifyPlaylistSongsResponse,
    SpotifyPlaylistSong,
    SpotifyCurrentlyPlayingResponse,
    SpotifyTokenResponse,
    SpotifyTrack,
    SpotifySearchTrack,
    SpotifySearchSongsResponse,
    SpotifyUserProfile,
    SpotifyTopArtist,
    SpotifyTopTrack,
    SpotifyTopArtistsResponse,
    SpotifyTopTracksResponse
} from "./types"

const SPOTIFY_REST_URL: string = "https://api.spotify.com" as const
const DEFAULT_DEBOUNCE_TIMER: number = 600 as const

export const useSpotify = ({
    client_id,
    client_secret,
    refresh_token
}: UseSpotifyHookProps) => {
    const authorization = useMemo(() => {
        return Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    }, [client_id, client_secret])

    const accessTokenRef = useRef<string | null>(null)
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    type TopItemType = "artists" | "tracks"

    type PaginationParams = {
        limit?: number
        offset?: number
    }

    const getAccessToken = useCallback(async (): Promise<string> => {
        if (accessTokenRef.current) {
            return accessTokenRef.current
        }

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

            accessTokenRef.current = data.access_token
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
    }, [refresh_token, authorization])

    const getUserInfo = useCallback(async (): Promise<SpotifyUserProfile> => {
        try {
            const access_token = await getAccessToken()

            if (!access_token) {
                throw new Error("Access token is missing or invalid")
            }
            
            const response = await fetch(`${SPOTIFY_REST_URL}/v1/me`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`)
            }
    
            const data: SpotifyUserProfile = await response.json()
            return data
        } catch (error) {
            let errorMessage = "Failed to retrieve user info"

            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }

            console.error("Error fetching user info:", error)
            throw new Error(errorMessage)
        }
    }, [getAccessToken])

    const getPlaylists = useCallback(async (user_id: string, paginationParams?: PaginationParams): Promise<SpotifyPlaylist[]> => {
        try {
            const access_token = await getAccessToken()

            if (!access_token) {
                throw new Error("Access token is missing or invalid")
            }

            if (!user_id || user_id.trim() === "") {
                throw new Error(`Invalid user ID: Expected a non-empty string, but received ${JSON.stringify(user_id)}`)
            }

            const { limit, offset } = paginationParams || {}

            if (limit && ((limit < 0 || limit > 50))) {
                throw new Error(`Invalid limit value: Expected to be between 0 and 50, but recieved ${limit}`)
            }

            if (offset && ((offset < 0 || offset > 100))) {
                throw new Error(`Invalid offset value: Expected to be between 0 and 100, but recieved ${offset}`)
            }
    
            const response = await fetch(`
                ${SPOTIFY_REST_URL}/v1/users/${user_id}/playlists?limit=${limit ? limit : 20}&offset=${offset ? offset : 5}
            `, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed to fetch playlists: ${response.status} ${response.statusText}`)
            }
    
            const data: SpotifyPlaylistsResponse = await response.json()
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
        
            const data: SpotifyPlaylistSongsResponse = await response.json()
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
        
            const data: SpotifyCurrentlyPlayingResponse = await response.json()
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

    const getUserTopItems = useCallback(async <T extends TopItemType>(type: T, paginationParams?: PaginationParams): Promise<T extends "artists" ? SpotifyTopArtist[] : SpotifyTopTrack[]> => {
        try {
            const access_token = await getAccessToken()
            if (!access_token) {
                throw new Error("Access token is missing or invalid")
            }

            if (type !== "artists" && type !== "tracks") {
                throw new Error(`Invalid type parameter: ${type}. Must be 'artists' or 'tracks'`)
            }

            const { limit, offset } = paginationParams || {}

            if (limit && ((limit < 0 || limit > 50))) {
                throw new Error(`Invalid limit value: Expected to be between 0 and 50, but recieved ${limit}`)
            }

            if (offset && (offset < 0)) {
                throw new Error(`Invalid offset value: Expected to be greater than 0, but recieved ${offset}`)
            }
           
            const response = await fetch(`
                ${SPOTIFY_REST_URL}/v1/me/top/${type}?limit=${limit ? limit : 20}&offset=${offset ? offset : 0}
            `, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed to fetch top items: ${response.status} ${response.statusText}`)
            }
    
            const data: T extends "artists" ? SpotifyTopArtistsResponse : SpotifyTopTracksResponse = await response.json()
            return data.items as T extends "artists" ? SpotifyTopArtist[] : SpotifyTopTrack[]
        } catch (error) {
            let errorMessage = "Failed to retrieve top items"

            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            } else if (typeof error === "string") {
                errorMessage += `: ${error}`
            } else {
                errorMessage += ": An unknown error occurred"
            }
            
            console.error("Error fetching top items:", error)
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
           
                    const data: SpotifySearchSongsResponse = await response.json()
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
        getUserInfo,
        getPlaylists,
        getPlaylistSongs,
        getCurrentlyPlayingSong,
        getUserTopItems,
        searchSongs
    }
}