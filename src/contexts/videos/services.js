import { getVideos } from '../../api';

export const fetchVideos = async (dispatchVideos) => {
  dispatchVideos({ type: 'FETCH_VIDEOS_REQUEST' });
  try {
    const {
      data: {
        data: { videos },
      },
      status,
    } = await getVideos();
    if (status === 200)
      dispatchVideos({
        type: 'FETCH_VIDEOS_SUCCESS',
        payload: { videos },
      });
  } catch (error) {
    if (error?.response) {
      dispatchVideos({
        type: 'FETCH_VIDEOS_FAILED',
        payload: { error: error.response.data },
      });
    } else console.log(error);
  }
};
