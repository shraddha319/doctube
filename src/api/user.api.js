import API from './config.api';

/**
 *
 * @param {MongooseObjectId} userId
 * @param {Object: {
 * email: string
 * firstName: string
 * lastName: string
 * }} update
 */
export function updateUser(userId, update) {
  return API.post(`/users/${userId}`, update);
}
