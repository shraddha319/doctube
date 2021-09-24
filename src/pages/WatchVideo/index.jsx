import './WatchVideo.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { DisplayCard, Loader, ButtonLoader } from '../../components';
import {
  HeartOutline,
  HeartSolid,
  ClockOutline,
  ClockSolid,
  AddPlaylistIcon,
} from '../../assets/icons';
import { LIKED_PL, WATCH_LATER_PL } from '../../constants';
import { getVideo } from '../../api';
import { useEffect, useState } from 'react';
import { useVideos, useUser, useAuth } from '../../contexts';
import {
  addToPlaylist,
  removeFromPlaylist,
} from '../../contexts/user/services';

export default function WatchVideo() {
  const { videoId } = useParams();
  const {
    user: {
      playlists: { lists: playlists, status },
      profile,
    },
    dispatchUser,
    isVideoLiked,
    isVideoSaved,
  } = useUser();
  const {
    videos: { videos },
  } = useVideos();
  const [video, setVideo] = useState(
    videos?.find((video) => video._id === videoId)
  );
  const [loading, setLoading] = useState({
    like: false,
    save: false,
    fetch: false,
  });

  const {
    auth: { token },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (video) return;
      try {
        setLoading({ ...loading, fetch: true });
        const {
          data: {
            data: { video: fetchedVideo },
          },
          status,
        } = await getVideo(videoId);
        if (status === 200) setVideo(fetchedVideo);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading({ ...loading, fetch: false });
      }
    })();
  }, []);

  async function likeHandler(video) {
    const playlistId = playlists.find((pl) => pl.name === LIKED_PL)?._id;

    setLoading({ ...loading, like: true });
    !isVideoLiked(videoId)
      ? await addToPlaylist(dispatchUser, profile?._id, playlistId, video)
      : await removeFromPlaylist(
          dispatchUser,
          profile?._id,
          playlistId,
          videoId
        );
    setLoading({ ...loading, like: false });
  }

  async function watchLaterHandler() {
    const playlistId = playlists.find((pl) => pl.name === WATCH_LATER_PL)?._id;

    setLoading({ ...loading, save: true });
    !isVideoSaved(videoId)
      ? await addToPlaylist(dispatchUser, profile?._id, playlistId, video)
      : await removeFromPlaylist(
          dispatchUser,
          profile?._id,
          playlistId,
          videoId
        );
    setLoading({ ...loading, save: false });
  }

  return loading.fetch || status === 'loading' ? (
    <Loader />
  ) : (
    <div className="Watch-Video layout--default">
      <div className="watch-video__player">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          width="100%"
          height="100%"
        />
      </div>
      <div className="watch-video__buttons flex--row">
        {loading.like ? (
          <ButtonLoader />
        ) : (
          <button
            className={`btn btn--icon ${
              profile && isVideoLiked(video._id)
                ? 'btn--selected'
                : 'btn--action'
            }`}
            onClick={() => (token ? likeHandler(video) : navigate('/login'))}
          >
            <span className="fa--md fa--hover fa--primary">
              {profile && isVideoLiked(video._id) ? (
                <HeartSolid />
              ) : (
                <HeartOutline />
              )}
            </span>
          </button>
        )}
        {loading.save ? (
          <ButtonLoader />
        ) : (
          <button
            className={`btn btn--icon ${
              profile && isVideoSaved(video._id)
                ? 'btn--selected'
                : 'btn--action'
            }`}
            onClick={() => (token ? watchLaterHandler() : navigate('/login'))}
          >
            <span className="fa--md fa--hover fa--primary">
              {profile && isVideoSaved(video._id) ? (
                <ClockSolid />
              ) : (
                <ClockOutline />
              )}
            </span>
          </button>
        )}
        <Link
          state={{ videoId: video._id }}
          to={{
            search: '?action=update_playlist',
          }}
          className="btn btn--icon btn--action"
        >
          <span className="fa--md fa--hover fa--primary">
            <AddPlaylistIcon />
          </span>
        </Link>
      </div>
      <div className="watch-video__info flex--row">
        <DisplayCardHorizontal video={video} />
        {videos && (
          <section className="doc__suggestion">
            <h2>You May Also Like</h2>
            <div className="doc__suggestion__list">
              {videos.map((video) => (
                <DisplayCard video={video} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  function DisplayCardHorizontal({ video }) {
    let specsObj = {
      Country: video.country,
      Genre: video.genre,
      Language: video.language,
      Release: processDate(video.releaseDate),
      'Official Site': video.officialSite,
      Director: video.director,
      Tags: video.tags,
    };

    function processDate(dateObj) {
      let { day, month, year } = dateObj;
      day = datePadZero(day);
      month = datePadZero(month);
      if (day && month && year) return `${day}-${month}-${year}`;
      return year ? year : '-';
    }

    function datePadZero(value) {
      return value?.toString().length === 1 ? '0' + value.toString() : value;
    }

    function SpecsTable({ specsObj }) {
      return (
        <div className="specs__table">
          {Object.keys(specsObj).map((spec) => (
            <div className="spec__row">
              <p className="spec__key">{spec}</p>
              <p className="spec__value">
                {Array.isArray(specsObj[spec])
                  ? specsObj[spec].join(', ')
                  : specsObj[spec]}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <section className="doc__details card__layout">
        <div className="card__media">
          <img
            className="card__media--image"
            src={video.imageURL}
            alt={video.title}
          />
        </div>
        <div className="card__body">
          <h2 className="card__body__title">{video.title}</h2>
          <div className="card__body__stats flex--row">
            <div className="body__rating">{`IMDB ★ ${video.rating.imdb}`}</div>
            <p className="body__duration">{`${video.durationMin} min`}</p>
          </div>
          <p className="card__body__summary text--muted">{video.description}</p>
          <div className="card__body__specs text--muted">
            <div className="specs__table">
              <SpecsTable specsObj={specsObj} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
