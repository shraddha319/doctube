import API from './config.api';

export function getVideos() {
  return API.get('/videos');
}

export function getVideo(videoId) {
  return API.get(`/videos/${videoId}`);
}
