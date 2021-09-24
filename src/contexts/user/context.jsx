import { createContext, useContext, useReducer, useEffect } from 'react';
import { userReducer } from './reducer';
import { getPlaylists } from './services';
import { LIKED_PL, WATCH_LATER_PL } from '../../constants';

const UserContext = createContext();

export function UserProvider({ children }) {
  const initialState = {
    profile: null,
    playlists: {
      status: 'idle',
      lists: [], // [{_id, name, videos: [video]}]
      error: null,
    },
  };

  const [user, dispatchUser] = useReducer(userReducer, initialState);

  function isVideoLiked(videoId) {
    if (!user.playlists.lists?.length === 0) return false;

    console.log({ user });

    const likedList = user.playlists.lists.find((pl) => pl.name === LIKED_PL);

    return likedList.videos.findIndex(({ _id }) => _id === videoId) === -1
      ? false
      : true;
  }

  function isVideoSaved(videoId) {
    if (!user.playlists.lists?.length === 0) return false;
    const savedList = user.playlists.lists.find(
      (pl) => pl.name === WATCH_LATER_PL
    );
    return savedList.videos.findIndex(({ _id }) => _id === videoId) === -1
      ? false
      : true;
  }

  useEffect(() => {
    if (user.playlists.status === 'idle' && user.profile) {
      getPlaylists(dispatchUser, user.profile?._id);
    }
  }, [user.profile]);

  return (
    <UserContext.Provider
      value={{ user, dispatchUser, isVideoLiked, isVideoSaved }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
