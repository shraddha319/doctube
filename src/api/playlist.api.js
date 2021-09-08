import API from './config.api';

export function getPlaylists(userId) {
  return API.get(`/users/${userId}/playlists`);
}

export function createPlaylist(userId, playlist) {
  return API.post(`/users/${userId}/playlists`, playlist);
}

export function getPlaylist(userId, playlistId) {
  return API.get(`/users/${userId}/playlists/${playlistId}`);
}

export function updatePlaylist(userId, playlistId, playlistUpdate) {
  return API.post(`/users/${userId}/playlists/${playlistId}`, playlistUpdate);
}

export function deletePlaylist(userId, playlistId) {
  return API.delete(`/users/${userId}/playlists/${playlistId}`);
}
