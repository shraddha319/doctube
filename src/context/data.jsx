import { createContext, useContext, useReducer, useEffect } from 'react';
import dataReducer from './reducer/data';
import { getVideos, getPlaylists } from '../api';
import { useAuth } from './auth';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, dispatchData] = useReducer(dataReducer, {
    videos: null,
    playlists: null,
  });
  const {
    auth: { authToken, user },
  } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            data: { videos },
          },
          status: videoStatus,
        } = await getVideos();

        if (videoStatus === 200)
          dispatchData({ type: 'FETCH_VIDEOS', payload: { videos } });
        if (authToken) {
          const {
            data: {
              data: { playlists },
            },
            status: playlistStatus,
          } = await getPlaylists(user._id);

          if (playlistStatus === 200)
            dispatchData({ type: 'FETCH_PLAYLISTS', payload: { playlists } });
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
        console.log(error);
      }
    })();
  }, []);

  return (
    <DataContext.Provider value={{ data, dispatchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
