import * as api from '../../api/playlist.api';

export const getPlaylists = async (dispatchUser, userId) => {
  try {
    dispatchUser({ type: 'FETCH_PLAYLISTS_REQUEST' });
    const {
      data: {
        data: { playlists },
      },
      status,
    } = await api.getPlaylists(userId);
    // playlists: [{name, _id, videos, user}]

    if (status === 200) {
      dispatchUser({
        type: 'FETCH_PLAYLISTS_SUCCESS',
        payload: {
          playlists: playlists.map(({ name, _id, videos }) => ({
            name,
            _id,
            videos,
          })),
        },
      });
    }
  } catch (error) {
    if (error?.response) {
      dispatchUser({
        type: 'FETCH_PLAYLISTS_FAILED',
        payload: { error: error.response.data.error },
      });
    } else console.log(error);
  }
};

export const createPlaylist = async (dispatchUser, userId, playlistName) => {
  try {
    const {
      data: {
        data: { playlist },
      },
      status,
    } = await api.createPlaylist(userId, {
      name: playlistName,
      videos: [],
    });

    if (status === 201) {
      console.log({ playlist });

      dispatchUser({
        type: 'CREATE_PLAYLIST',
        payload: {
          playlist: (({ _id, name, videos }) => ({ _id, name, videos }))(
            playlist
          ),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToPlaylist = async (
  dispatchUser,
  userId,
  playlistId,
  video
) => {
  try {
    const { status } = await api.updatePlaylist(userId, playlistId, {
      type: 'add',
      videos: [video._id],
    });
    if (status === 204) {
      dispatchUser({ type: 'ADD_TO_PLAYLIST', payload: { playlistId, video } });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromPlaylist = async (
  dispatchUser,
  userId,
  playlistId,
  videoId
) => {
  try {
    const { status } = await api.updatePlaylist(userId, playlistId, {
      type: 'remove',
      videos: [videoId],
    });
    if (status === 204) {
      dispatchUser({
        type: 'REMOVE_FROM_PLAYLIST',
        payload: { playlistId, videoId },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removePlaylist = async (dispatchUser, userId, playlistId) => {
  try {
    const { status } = await api.deletePlaylist(userId, playlistId);
    if (status === 204) {
      dispatchUser({
        type: 'REMOVE_PLAYLIST',
        payload: { playlistId },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
