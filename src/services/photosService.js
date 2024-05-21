import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const PHOTOS_LIMIT = 10;

class PhotosService {
  static async fetchPhotos() {
    try {
      const response = await axios.get(`${BASE_URL}/photos`, {
        params: {
          _limit: PHOTOS_LIMIT
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  }

  static async fetchPhotoById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/photos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching photo with id ${id}:`, error);
      throw error;
    }
  }
}

export default PhotosService;