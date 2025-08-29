import { Song } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const songsApi = {
  async getSongs(): Promise<Song[]> {
    const response = await fetch(`${API_BASE_URL}/songs`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: errorData.status,
        statusCode: errorData.statusCode || response.status,
        message: errorData.message
      };
    }

    return response.json();
  }
};