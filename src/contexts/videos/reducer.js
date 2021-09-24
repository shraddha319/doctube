export const videosReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS_REQUEST':
      return { ...state, status: 'loading' };

    case 'FETCH_VIDEOS_SUCCESS':
      return { ...state, status: 'success', videos: action.payload.videos };

    case 'FETCH_VIDEOS_FAILED':
      return { ...state, status: 'failed', error: action.payload.error };

    default:
      return state;
  }
};
