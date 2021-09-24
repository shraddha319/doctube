import './Playlist.scss';
import { useParams } from 'react-router-dom';
import { DisplayCard, EmptyList, Loader, ButtonLoader } from '../../components';
import { useState, useEffect } from 'react';
import { useUser, useToast } from '../../contexts';
import { getPlaylist } from '../../api';
import { removeFromPlaylist } from '../../contexts/user/services';
import { TrashBinIcon } from '../../assets/icons';

export default function Playlist(props) {
  const params = useParams();
  const playlistId = params?.playlistId || props?.playlistId;

  const {
    user: {
      profile: { _id: userId },
      playlists: { lists: playlists },
    },
  } = useUser();
  const [loading, setLoading] = useState(false);
  let playlist = playlists?.find((pl) => pl._id === playlistId);

  function PlaylistVideo({ video, playlistId }) {
    const [loading, setLoading] = useState(false);
    const {
      user: {
        profile: { _id: userId },
      },
      dispatchUser,
    } = useUser();
    const { dispatchToast } = useToast();

    async function removeFromPlaylistHandler(videoId, videoName) {
      setLoading(true);
      await removeFromPlaylist(dispatchUser, userId, playlistId, videoId);
      setLoading(false);
      dispatchToast({
        type: 'TRIGGER_TOAST',
        payload: {
          type: 'success',
          body: `${videoName} has been removed from ${playlist.name} list`,
        },
      });
    }

    return (
      <div className="playlist__video">
        <DisplayCard video={video} />
        {loading ? (
          <ButtonLoader />
        ) : (
          <button
            className="btn btn--icon btn--action"
            onClick={() => removeFromPlaylistHandler(video._id, video.title)}
          >
            <span className="fa--sm fa--hover">
              <TrashBinIcon />
            </span>
          </button>
        )}
      </div>
    );
  }

  useEffect(() => {
    (async () => {
      if (playlist) return;
      try {
        setLoading(true);
        const {
          data: {
            data: { playlist: fetchedList },
          },
          status,
        } = await getPlaylist(userId, playlistId);
        if (status === 200) playlist = fetchedList;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading || !playlist ? (
    <Loader />
  ) : (
    <div className="layout--default playlist">
      <header className="flex--row">
        <h1 className="title title--h5">{playlist.name}</h1>
      </header>
      <section className="playlist__videos">
        {playlist.videos.map((video) => (
          <PlaylistVideo playlistId={playlistId} video={video} />
        ))}
        {playlist.videos.length === 0 && <EmptyList />}
      </section>
    </div>
  );
}
