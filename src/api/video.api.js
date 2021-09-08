import API from './config.api';

export function getVideos() {
  return API.get('/videos');
}
