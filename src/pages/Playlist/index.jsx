import './Playlist.scss';
import { useParams } from 'react-router-dom';
import { useData, useAuth } from '../../context';
import { DisplayCard, EmptyList, Loader } from '../../components';
import { useState, useEffect } from 'react';
import { updatePlaylist, getPlaylists } from '../../api';

export default function Playlist() {
  const { playlistId } = useParams();
  const {
    data: { playlists },
    dispatchData,
  } = useData();
  const {
    auth: { user },
  } = useAuth();
  const [loading, setLoading] = useState({
    fetch: false,
    remove: false,
  });
  const playlist = playlists?.find((pl) => pl._id === playlistId);

  async function removeFromPlaylistHandler(videoId) {
    try {
      setLoading({ ...loading, remove: true });
      const { status } = await updatePlaylist(user._id, playlistId, {
        videos: [videoId],
        type: 'remove',
      });

      if (status === 204)
        dispatchData({
          type: 'REMOVE_FROM_PLAYLIST',
          payload: { playlistId, videoId },
        });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
      console.log(err);
    } finally {
      setLoading({ ...loading, remove: false });
    }
  }

  useEffect(() => {
    (async () => {
      if (playlists) return;
      setLoading({ ...loading, fetch: true });
      try {
        const {
          data: {
            success,
            data: { playlists },
          },
        } = await getPlaylists(user._id);

        if (success)
          dispatchData({
            type: 'FETCH_PLAYLISTS',
            payload: {
              playlists: playlists.map((pl) =>
                (({ name, videos }) => ({ name, videos }))(pl)
              ),
            },
          });
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
        console.log(error);
      }
      setLoading({ ...loading, fetch: false });
    })();
  }, []);

  return (
    <div className="layout--default playlist">
      {loading.fetch || !playlist ? (
        <Loader />
      ) : (
        <>
          <header className="flex--row">
            <h1 className="title title--h5">{playlist.name}</h1>
          </header>
          <section className="playlist__videos">
            {playlist.videos.map((video) => (
              <div className="playlist__video">
                <DisplayCard video={video} />
                <button
                  className="btn btn--icon btn--action"
                  onClick={() => removeFromPlaylistHandler(video._id)}
                >
                  <span className="btn__icon fa--sm">
                    <i class="far fa-trash-alt"></i>
                  </span>
                </button>
              </div>
            ))}
            {playlist.videos.length === 0 && <EmptyList />}
          </section>
        </>
      )}
    </div>
  );
}
