import './App.css';
import { Nav, AddToPlaylist, PrivateRoute, ScrollToTop } from './components';
import {
  Home,
  Watch,
  WatchVideo,
  Playlists,
  NotFound,
  Login,
  Signup,
  Playlist,
} from './pages';
import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const query = new URLSearchParams(useLocation().search);

  return (
    <div className="App">
      <Nav pathname={location.pathname} />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/watch/:videoId" element={<WatchVideo />} />
          <PrivateRoute path="/playlists" element={<Playlists />} />
          <PrivateRoute
            path="/playlists/:playlistName"
            element={<Playlist />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
      {query.get('action') === 'update_playlist' && (
        <PrivateRoute path="/watch/:videoId/" element={<AddToPlaylist />} />
      )}
    </div>
  );
}
