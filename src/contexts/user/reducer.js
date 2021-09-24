export const userReducer = (state, action) => {
  let updatedPlaylists;

  switch (action.type) {
    case 'SET_USER':
      return { ...state, profile: action.payload.user };

    case 'FETCH_PLAYLISTS_REQUEST':
      return {
        ...state,
        playlists: {
          ...state.playlists,
          status: 'loading',
        },
      };

    case 'FETCH_PLAYLISTS_SUCCESS':
      /**
       * payload: {playlists: [{_id, name, videos: []}]}
       */
      console.log(action.payload);
      return {
        ...state,
        playlists: {
          status: 'success',
          lists: action.payload.playlists || [],
        },
      };

    case 'FETCH_PLAYLISTS_FAILED':
      return {
        ...state,
        playlists: { status: 'failed', error: action.payload.error },
      };

    case 'CREATE_PLAYLIST':
      // payload: {playlist: {_id, name, videos: []}}
      console.log({
        new: {
          ...state,
          playlists: {
            ...state.playlists,
            lists: state.playlists.lists.concat([action.payload.playlist]),
          },
        },
      });
      return {
        ...state,
        playlists: {
          ...state.playlists,
          lists: state.playlists.lists.concat([action.payload.playlist]),
        },
      };

    case 'REMOVE_PLAYLIST':
      // payload: {playlistId}
      updatedPlaylists = state.playlists.lists.filter(
        (pl) => pl._id !== action.payload.playlistId
      );

      return {
        ...state,
        playlists: {
          ...state.playlists,
          lists: updatedPlaylists,
        },
      };

    case 'ADD_TO_PLAYLIST':
      // payload: {playlistId, video}
      updatedPlaylists = state.playlists.lists.map((pl) =>
        pl._id === action.payload.playlistId
          ? { ...pl, videos: pl.videos.concat([action.payload.video]) }
          : pl
      );

      return {
        ...state,
        playlists: {
          ...state.playlists,
          lists: updatedPlaylists,
        },
      };

    case 'REMOVE_FROM_PLAYLIST':
      // payload: {playlistId, videoId}
      updatedPlaylists = state.playlists.lists.map((pl) =>
        pl._id === action.payload.playlistId
          ? {
              ...pl,
              videos: pl.videos.filter(
                (vid) => vid._id !== action.payload.videoId
              ),
            }
          : pl
      );

      return {
        ...state,
        playlists: {
          ...state.playlists,
          lists: updatedPlaylists,
        },
      };

    case 'LOGOUT_USER':
      return {
        profile: null,
        playlists: {
          status: 'idle',
          lists: [],
          error: null,
        },
      };

    default:
      return state;
  }
};
