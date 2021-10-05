import API from './config.api';
import { getVideos, getVideo } from './video.api';
import { signUpUser, loginUser, getUser } from './auth.api';
import {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
} from './playlist.api';
import { updateUser } from './user.api';

export {
  API,
  getVideos,
  getVideo,
  signUpUser,
  loginUser,
  getUser,
  createPlaylist,
  getPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  updateUser,
};
