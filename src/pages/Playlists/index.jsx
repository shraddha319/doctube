import './Playlists.scss';
import { VideoList, Loader, ButtonLoader } from '../../components';
import { LIKED_PL, WATCH_LATER_PL } from '../../constants';
import { useEffect, useState } from 'react';
import { useUser, useToast } from '../../contexts';
import { getPlaylists, removePlaylist } from '../../contexts/user/services';
import { RemovePlaylistIcon } from '../../assets/icons';

export default function Playlists() {
  const {
    user: {
      playlists: { status, lists: playlists, error },
      profile: { _id: userId },
    },
    dispatchUser,
  } = useUser();

  function Playlist({ playlist }) {
    const [loading, setLoading] = useState(false);
    const { dispatchToast } = useToast();
    const {
      user: {
        profile: { _id: userId },
      },
      dispatchUser,
    } = useUser();

    const deletePlaylistHandler = async (playlistId, playlistName) => {
      setLoading(true);
      await removePlaylist(dispatchUser, userId, playlistId);
      setLoading(false);
      dispatchToast({
        type: 'TRIGGER_TOAST',
        payload: {
          type: 'success',
          body: `Playlist '${playlistName}' has been deleted`,
        },
      });
    };

    return (
      <section className="playlist">
        {![LIKED_PL, WATCH_LATER_PL].includes(playlist.name) &&
          (loading ? (
            <ButtonLoader />
          ) : (
            <button
              className="btn btn--icon"
              onClick={() => deletePlaylistHandler(playlist._id, playlist.name)}
            >
              <span className="fa--sm fa--hover">
                <RemovePlaylistIcon />
              </span>
            </button>
          ))}
        <VideoList
          limit={5}
          videos={playlist.videos}
          title={playlist.name}
          showAllLink={`${playlist._id}`}
        />
      </section>
    );
  }

  useEffect(() => {
    if (status === 'idle') {
      getPlaylists(dispatchUser, userId);
    }

    if (status === 'failed') {
      console.log(error);
    }
  }, []);

  return status === 'loading' ? (
    <Loader />
  ) : (
    <div className="Playlists layout--default">
      {playlists.map((pl) => (
        <Playlist playlist={pl} />
      ))}
    </div>
  );
}
