import API from './config.api';

export function getPlaylists(userId) {
  return API.get(`/users/${userId}/playlists`);
}

/**
 *
 * @param {ObjectId} userId
 * @param {Object: {
 * name: String,
 * videos: [ObjectId]
 * }} playlist
 */
export function createPlaylist(userId, playlist) {
  return API.post(`/users/${userId}/playlists`, playlist);
}

export function getPlaylist(userId, playlistId) {
  return API.get(`/users/${userId}/playlists/${playlistId}`);
}

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} playlistId
 * @param {Object: {
 * name: String,
 * videos: [ObjectId],
 * type: String; add/remove
 * }} update
 */
export function updatePlaylist(userId, playlistId, update) {
  return API.post(`/users/${userId}/playlists/${playlistId}`, update);
}

export function deletePlaylist(userId, playlistId) {
  return API.delete(`/users/${userId}/playlists/${playlistId}`);
}
