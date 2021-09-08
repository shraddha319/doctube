import './Playlists.scss';
import { useData, useAuth } from '../../context';
import { VideoList, Loader } from '../../components';
import { lowerCaseHyphenate } from '../../utility/utils';
import { LIKED_PL, WATCH_LATER_PL } from '../../utility/constants';
import { useEffect, useState } from 'react';
import { getPlaylists } from '../../api';

export default function Playlists() {
  const {
    data: { playlists },
    dispatchData,
  } = useData();
  const {
    auth: { user },
  } = useAuth();
  const [loading, setLoading] = useState(false);

  function removePlaylistHandler(playlistId) {
    dispatchData({
      type: 'REMOVE_PLAYLIST',
      payload: { playlistId },
    });
  }

  useEffect(() => {
    (async () => {
      if (playlists.length > 0) return;
      setLoading(true);
      try {
        const {
          data: {
            success,
            data: { playlists },
          },
        } = await getPlaylists(user._id);

        if (success)
          dispatchData({ type: 'FETCH_PLAYLISTS', payload: { playlists } });
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="Playlists layout--default">
      {loading ? (
        <Loader />
      ) : (
        playlists.map((pl) => (
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
        ))
      )}
    </div>
  );
}
