import './App.css';
import { Nav, AddToPlaylist, PrivateRoute } from './components';
import {
  Home,
  Watch,
  WatchVideo,
  MyList,
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/watch/:title" element={<WatchVideo />} />
        {/* should include movie id */}
        <PrivateRoute path="/my-list" element={<MyList />} />
        <PrivateRoute path="/my-list/:playlistName" element={<Playlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {query.get('action') === 'update_playlist' && (
        <PrivateRoute path="/watch/:title/" element={<AddToPlaylist />} />
      )}
    </div>
  );
}
