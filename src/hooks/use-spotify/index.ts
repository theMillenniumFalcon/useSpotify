import { useCallback } from 'react'

export const useSpotify = (userId: string, accessToken: string) => {
    const getAllPlaylists = useCallback(async () => {
        try {
          const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch playlists');
          }
    
          const data = await response.json();
          return data.items;
        } catch (error) {
          console.error('Error fetching playlists:', error);
          throw error;
        }
      }, [userId, accessToken]);
    
      return { getAllPlaylists };
};