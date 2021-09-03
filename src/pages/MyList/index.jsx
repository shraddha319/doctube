import './MyList.scss';
import { useData } from '../../context';
import { VideoList } from '../../components';
import { lowerCaseHyphenate } from '../../utility/utils';
import { LIKED_PL, WATCH_LATER_PL } from '../../utility/constants';

export default function MyList() {
  const {
    data: { playlists },
    dispatchData,
  } = useData();

  function removePlaylistHandler(playlistId) {
    dispatchData({
      type: 'REMOVE_PLAYLIST',
      payload: { playlistId },
    });
  }

  return (
    <div className="My-List layout--default">
      {playlists.map((pl) => (
        <section className="playlist">
          {![LIKED_PL, WATCH_LATER_PL].includes(pl.name) && (
            <button
              className="btn btn--icon btn--action"
              onClick={() => removePlaylistHandler(pl._id)}
            >
              <span className="btn__icon fa--sm">
                <i class="fas fa-times"></i>
              </span>
            </button>
          )}
          <VideoList
            limit={5}
            videos={pl.videos}
            title={pl.name}
            showAllLink={`${lowerCaseHyphenate(pl.name)}`}
          />
        </section>
      ))}
    </div>
  );
}
