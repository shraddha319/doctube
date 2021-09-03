import './Playlist.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context';
import { lowerCaseHyphenate } from '../../utility/utils';
import { LIKED_PL, WATCH_LATER_PL } from '../../utility/constants';
import { DisplayCard, EmptyList } from '../../components';

export default function Playlist() {
  const { playlistName } = useParams();
  const { data, dispatchData } = useData();
  const playlist = data.playlists.find(
    (pl) => lowerCaseHyphenate(pl.name) === playlistName
  );
  const navigate = useNavigate();

  function removeFromPlaylistHandler(videoId) {
    dispatchData({
      type: 'REMOVE_FROM_PLAYLIST',
      payload: { playlistName: playlist.name, videoId },
    });
  }

  function removePlaylistHandler() {
    dispatchData({
      type: 'REMOVE_PLAYLIST',
      payload: { playlistId: playlist._id },
    });
    navigate('/my-list');
  }

  return (
    <div className="layout--default playlist">
      <header className="flex--row">
        <h1 className="title title--h5">{playlist.name}</h1>
        {![LIKED_PL, WATCH_LATER_PL].includes(playlist.name) && (
          <button
            className="btn btn--icon btn--action"
            onClick={removePlaylistHandler}
          >
            <span className="btn__icon fa--sm">
              <i class="far fa-trash-alt"></i>
            </span>
          </button>
        )}
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
    </div>
  );
}
