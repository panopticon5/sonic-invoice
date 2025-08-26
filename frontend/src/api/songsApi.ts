import { Song } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const songsApi = {
  async getSongs(): Promise<Song[]> {
    console.log(
      'gettings songs from api'
    )
    try {
      const response = await fetch(`${API_BASE_URL}/songs`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
    }
  },
};