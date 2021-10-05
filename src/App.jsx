import './App.css';
import {
  Nav,
  Loader,
  Toast,
  AddToPlaylist,
  PrivateRoute,
  ScrollToTop,
} from './components';
import {
  Home,
  Watch,
  WatchVideo,
  Playlists,
  NotFound,
  Login,
  Signup,
  Playlist,
  EditProfile,
} from './pages';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth, useUser, useToast } from './contexts';
import { LIKED_PL, WATCH_LATER_PL } from './constants';

export default function App() {
  const location = useLocation();
  const query = new URLSearchParams(useLocation().search);

  const { auth } = useAuth();
  const {
    user: { playlists },
  } = useUser();
  const { toast } = useToast();

  return (
    <div className="App">
      <Nav pathname={location.pathname} />
      <ScrollToTop>
        {playlists.status === 'loading' ? (
          <Loader />
        ) : (
          <div className="main">
            {toast.active ? <Toast /> : null}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/watch/:videoId" element={<WatchVideo />} />
              <PrivateRoute path="/playlists" element={<Playlists />} />
              <PrivateRoute
                path="/playlists/:playlistId"
                element={<Playlist />}
              />
              <PrivateRoute
                path="/playlists/liked"
                element={
                  <Playlist
                    playlistId={
                      playlists.lists?.find((pl) => pl.name === LIKED_PL)?._id
                    }
                  />
                }
              />
              <PrivateRoute
                path="/playlists/saved"
                element={
                  <Playlist
                    playlistId={
                      playlists.lists?.find((pl) => pl.name === WATCH_LATER_PL)
                        ?._id
                    }
                  />
                }
              />
              <PrivateRoute path="/profile" element={<EditProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {query.get('action') === 'update_playlist' && (
              <PrivateRoute
                path="/watch/:videoId/"
                element={<AddToPlaylist />}
              />
            )}
          </div>
        )}
      </ScrollToTop>
    </div>
  );
}
