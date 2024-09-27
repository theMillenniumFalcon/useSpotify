import { UseSpotifyHookProps } from '@/interfaces/global'
import { PlaylistsResponse, Playlist } from '@/interfaces/playlist'
import { useCallback } from 'react'

const SPOTIFY_REST_URL: string = 'https://api.spotify.com' as const

export const useSpotify = ({
    userId,
    accessToken,
    id
}: UseSpotifyHookProps) => {
    const getAllPlaylists: () => Promise<Playlist[]> = useCallback(async () => {
        try {
            const response = await fetch(`${SPOTIFY_REST_URL}/v1/users/${userId}/playlists`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
    
            if (!response.ok) {
                throw new Error('Failed to fetch playlists')
            }
        
            const data: PlaylistsResponse = await response.json()
            return data.items
        } catch (error) {
            console.error('Error fetching playlists:', error)
            throw error
        }
    }, [userId, accessToken])

    const getPlaylistSongs = useCallback(async () => {
        try {
            const response = await fetch(`${SPOTIFY_REST_URL}/v1/playlists/${id}/tracks`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
    
            if (!response.ok) {
                throw new Error('Failed to fetch playlists')
            }
        
            const data = await response.json()
            return data.items
        } catch (error) {
            console.error('Error fetching playlist songs:', error)
            throw error
        }
    }, [accessToken])
    
    return { getAllPlaylists, getPlaylistSongs }
}