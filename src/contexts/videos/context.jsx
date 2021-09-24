import { createContext, useContext, useReducer, useEffect } from 'react';
import { videosReducer } from './reducer';
import { fetchVideos } from './services';

const VideosContext = createContext();

export function VideosProvider({ children }) {
  const initialState = {
    videos: [],
    status: 'idle',
    error: null,
  };

  const [videos, dispatchVideos] = useReducer(videosReducer, initialState);

  useEffect(() => {
    fetchVideos(dispatchVideos);
  }, []);

  return (
    <VideosContext.Provider value={{ videos, dispatchVideos, fetchVideos }}>
      {children}
    </VideosContext.Provider>
  );
}

export function useVideos() {
  return useContext(VideosContext);
}
