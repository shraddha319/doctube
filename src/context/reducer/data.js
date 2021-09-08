export default function dataReducer(state, { type, payload }) {
  switch (type) {
    case 'FETCH_VIDEOS':
      return { ...state, videos: payload.videos };

    case 'FETCH_PLAYLISTS':
      return { ...state, playlists: payload.playlists };

    case 'ADD_TO_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map((pl) =>
          pl._id === payload.playlistId
            ? { ...pl, videos: pl.videos.concat([payload.video]) }
            : pl
        ),
      };

    case 'REMOVE_FROM_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map((pl) =>
          pl._id === payload.playlistId
            ? {
                ...pl,
                videos: pl.videos.filter((vid) => vid._id !== payload.videoId),
              }
            : pl
        ),
      };

    case 'CREATE_PLAYLIST':
      return {
        ...state,
        playlists: [...state.playlists, payload.playlist],
      };

    case 'REMOVE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.filter(
          (pl) => pl._id !== payload.playlistId
        ),
      };

    default:
      return state;
  }
}
