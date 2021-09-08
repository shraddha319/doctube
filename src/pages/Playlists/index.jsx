import './Playlists.scss';
import { useData, useAuth } from '../../context';
import { VideoList, Loader } from '../../components';
import { LIKED_PL, WATCH_LATER_PL } from '../../utility/constants';
import { useEffect, useState } from 'react';
import { getPlaylists, deletePlaylist } from '../../api';

export default function Playlists() {
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
    removeId: null,
  });

  async function removePlaylistHandler(playlistId) {
    try {
      setLoading({ ...loading, remove: true, removeId: playlistId });
      const { status } = await deletePlaylist(user._id, playlistId);
      if (status === 204)
        dispatchData({
          type: 'REMOVE_PLAYLIST',
          payload: { playlistId },
        });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
      console.log(err);
    } finally {
      setLoading({ ...loading, remove: false, removeId: null });
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
    <div className="Playlists layout--default">
      {loading.fetch || !playlists ? (
        <Loader />
      ) : (
        playlists.map((pl) => (
          <section className="playlist">
            {![LIKED_PL, WATCH_LATER_PL].includes(pl.name) &&
              (loading.remove && loading.removeId === pl._id ? (
                <Loader />
              ) : (
                <button
                  className="btn btn--icon btn--action"
                  onClick={() => removePlaylistHandler(pl._id)}
                >
                  <span className="btn__icon fa--sm">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              ))}
            <VideoList
              limit={5}
              videos={pl.videos}
              title={pl.name}
              showAllLink={`${pl._id}`}
            />
          </section>
        ))
      )}
    </div>
  );
}
