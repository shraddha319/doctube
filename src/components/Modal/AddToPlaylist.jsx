import Modal from '.';
import './Modal.scss';
import { useUser, useVideos, useToast } from '../../contexts';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getPlaylists,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
} from '../../contexts/user/services';
import Loader from '../Loader';
import ButtonLoader from '../Loader/ButtonLoader';

export default function AddToPlaylist() {
  const {
    user: {
      playlists: { lists: playlists, status },
      profile,
    },
    dispatchUser,
  } = useUser();
  const {
    videos: { videos },
  } = useVideos();
  const { state } = useLocation();
  const { dispatchToast } = useToast();

  const isVideoInPlaylist = (videoId, playlist) => {
    return playlist.videos.findIndex(({ _id }) => _id === videoId) === -1
      ? false
      : true;
  };

  function CreatePlaylist() {
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [loading, setLoading] = useState(false);
    const {
      dispatchUser,
      user: { profile },
    } = useUser();

    async function createPlaylistHandler() {
      setLoading(true);
      await createPlaylist(dispatchUser, profile?._id, newPlaylistName);
      setLoading(false);
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
          <ButtonLoader />
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

  useEffect(() => {
    if (status === 'idle') getPlaylists(dispatchUser, profile?._id);
  }, []);

  function PlaylistCheckbox({ playlist }) {
    const [loading, setLoading] = useState(false);

    async function updatePlaylistHandler(e, playlist) {
      const video = videos.find((vid) => vid._id === state.videoId);
      const playlistId = e.target.id;
      const inPlaylist = isVideoInPlaylist(state.videoId, playlist);

      setLoading(true);
      !inPlaylist
        ? await addToPlaylist(dispatchUser, profile?._id, playlistId, video)
        : await removeFromPlaylist(
            dispatchUser,
            profile?._id,
            playlistId,
            video._id
          );
      setLoading(false);
      dispatchToast({
        type: 'TRIGGER_TOAST',
        payload: {
          type: 'success',
          body: `${video.title} has been ${
            inPlaylist ? 'removed from' : 'added to'
          } ${playlist.name} list`,
        },
      });
    }

    return (
      <div className="input--checkbox">
        {loading ? (
          <ButtonLoader />
        ) : (
          <>
            <input
              type="checkbox"
              id={playlist._id}
              name={playlist.name}
              value={isVideoInPlaylist(state.videoId, playlist)}
              onChange={(e) => updatePlaylistHandler(e, playlist)}
              checked={isVideoInPlaylist(state.videoId, playlist)}
            />
            <label htmlFor={playlist._id} name={playlist.name}>
              {playlist.name}
            </label>
          </>
        )}
      </div>
    );
  }

  return !profile && status === 'loading' ? (
    <Loader />
  ) : (
    <Modal title="Add to...">
      <div className="playlists--add">
        <div className="playlists--current">
          {playlists.map((pl) => (
            <PlaylistCheckbox playlist={pl} />
          ))}
        </div>
        <CreatePlaylist />
      </div>
    </Modal>
  );
}
