import { AuthProvider, useAuth } from './auth/context';
import { UserProvider, useUser } from './user/context';
import { VideosProvider, useVideos } from './videos/context';
import { ToastProvider, useToast } from './toast';

import { fetchVideos } from './videos/services';
import { loginUser, signUpUser } from './auth/services';
import {
  getPlaylists,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  removePlaylist,
} from './user/services';

export {
  AuthProvider,
  useAuth,
  UserProvider,
  useUser,
  VideosProvider,
  useVideos,
  fetchVideos,
  loginUser,
  signUpUser,
  getPlaylists,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  removePlaylist,
  ToastProvider,
  useToast,
};
