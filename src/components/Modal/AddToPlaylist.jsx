import Modal from '.';
import './Modal.scss';
import { useData, useAuth } from '../../context';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isVideoInPlaylist } from '../../utility/utils';
import {
  createPlaylist,
  updatePlaylist,
  getVideos,
  getPlaylists,
} from '../../api';
import Loader from '../Loader';

export default function AddToPlaylist() {
  const {
    data: { playlists, videos },
    dispatchData,
  } = useData();
  const {
    auth: { user },
  } = useAuth();
  const { state } = useLocation();
  const [loading, setLoading] = useState({
    update: false,
    fetch: false,
  });

  function CreatePlaylist() {
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [loading, setLoading] = useState(false);

    async function createPlaylistHandler() {
      setLoading(true);
      try {
        const {
          data: {
            data: { playlist },
          },
          status,
        } = await createPlaylist(user._id, {
          name: newPlaylistName,
          videos: [],
        });

        if (status === 201) {
          dispatchData({ type: 'CREATE_PLAYLIST', payload: { playlist } });
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="playlists--new">
        <input
          type="text"
          name="new-playlist"
          id="new-playlist"
          placeholder="New Playlist"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        {loading ? (
          <Loader />
        ) : (
          <button
            className="btn btn--icon btn--action"
            onClick={createPlaylistHandler}
          >
            <span className="btn__icon fa--sm">
              <i class="fas fa-plus"></i>
            </span>
          </button>
        )}
      </div>
    );
  }

  async function updatePlaylistHandler(e) {
    const video = videos.find((vid) => vid._id === state.videoId);
    const playlistId = e.target.id;

    try {
      setLoading(true);
      const apiType = !e.target.checked ? 'add' : 'remove';
      const { status } = await updatePlaylist(user._id, playlistId, {
        videos: [video._id],
        type: apiType,
      });

      console.log(status);
      if (status === 204) {
        !e.target.checked
          ? dispatchData({
              type: 'ADD_TO_PLAYLIST',
              payload: { video, playlistId },
            })
          : dispatchData({
              type: 'REMOVE_FROM_PLAYLIST',
              payload: { videoId: video._id, playlistId },
            });
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      if (videos) return;
      setLoading({ ...loading, fetch: true });
      try {
        const {
          data: {
            data: { videos },
          },
          videoStatus,
        } = await getVideos();

        const {
          data: {
            data: { playlists },
            plStatus,
          },
        } = await getPlaylists(user._id);

        if (videoStatus === 200)
          dispatchData({ type: 'FETCH_VIDEOS', payload: { videos } });
        if (plStatus === 200)
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
    <Modal title="Add to...">
      {loading.fetch || !playlists ? (
        <Loader />
      ) : (
        <div className="playlists--add">
          <div className="playlists--current">
            {loading.update ? (
              <Loader />
            ) : (
              playlists.map((pl) => (
                <div className="input--checkbox">
                  <input
                    type="checkbox"
                    id={pl._id}
                    name={pl.name}
                    onChange={updatePlaylistHandler}
                    checked={isVideoInPlaylist(state.videoId, pl)}
                  />
                  <label htmlFor={pl._id} name={pl.name}>
                    {pl.name}
                  </label>
                </div>
              ))
            )}
          </div>
          <CreatePlaylist />
        </div>
      )}
    </Modal>
  );
}
