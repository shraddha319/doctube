import API from './config.api';

export async function getVideos() {
  return API.get('/videos');
}
