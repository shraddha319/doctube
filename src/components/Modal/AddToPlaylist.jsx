import Modal from '.';
import './Modal.scss';
import { useData } from '../../context';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isVideoInPlaylist } from '../../utility/utils';

export default function AddToPlaylist() {
  const {
    data: { playlists, videos },
    dispatchData,
  } = useData();
  const { state } = useLocation();

  function CreatePlaylist() {
    const [newPlaylist, setNewPlaylist] = useState('');

    function createPlaylistHandler() {
      const payload = {
        playlist: {
          _id: 'pl' + newPlaylist,
          name: newPlaylist,
          videos: [],
        },
      };

      // API request: post /playlists
      // payload -> new playlist from api

      dispatchData({ type: 'CREATE_PLAYLIST', payload });
    }

    return (
      <div className="playlists--new">
        <input
          type="text"
          name="new-playlist"
          id="new-playlist"
          placeholder="New Playlist"
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
        />
        <button
          className="btn btn--icon btn--action"
          onClick={createPlaylistHandler}
        >
          <span className="btn__icon fa--sm">
            <i class="fas fa-plus"></i>
          </span>
        </button>
      </div>
    );
  }

  function addToPlaylistHandler(e) {
    const video = videos.find((vid) => vid._id === state.videoId);
    const playlistName = e.target.name;

    e.target.checked
      ? dispatchData({
          type: 'ADD_TO_PLAYLIST',
          payload: { video, playlistName },
        })
      : dispatchData({
          type: 'REMOVE_FROM_PLAYLIST',
          payload: { videoId: video._id, playlistName },
        });
  }

  return (
    <Modal title="Add to...">
      <div className="playlists--add">
        <div className="playlists--current">
          {playlists.map((pl) => (
            <div className="input--checkbox">
              <input
                type="checkbox"
                id={pl._id}
                name={pl.name}
                onChange={addToPlaylistHandler}
                checked={isVideoInPlaylist(state.videoId, pl)}
              />
              <label htmlFor={pl._id} name={pl.name}>
                {pl.name}
              </label>
            </div>
          ))}
        </div>
        <CreatePlaylist />
      </div>
    </Modal>
  );
}
