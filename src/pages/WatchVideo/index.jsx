import './WatchVideo.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { DisplayCard, Loader } from '../../components';
import { useAuth, useData } from '../../context';
import { isVideoInPlaylist } from '../../utility/utils';
import { LIKED_PL, WATCH_LATER_PL } from '../../utility/constants';
import { updatePlaylist, getVideo } from '../../api';
import { useEffect, useState } from 'react';

export default function WatchVideo() {
  const { videoId } = useParams();
  const {
    data: { videos, playlists },
    dispatchData,
  } = useData();
  const {
    auth: { authToken, user },
  } = useAuth();
  const [video, setVideo] = useState(
    videos?.find((video) => video._id === videoId)
  );
  const [loading, setLoading] = useState(false);
  const [videoState, setVideoState] = useState({
    liked: isVideoInPlaylist(
      video?._id,
      playlists?.find((pl) => pl.name === LIKED_PL)
    ),
    saved: isVideoInPlaylist(
      video?._id,
      playlists?.find((pl) => pl.name === WATCH_LATER_PL)
    ),
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (video) return;
      setLoading(true);
      try {
        const {
          data: {
            data: { video: fetchedVideo },
          },
          status,
        } = await getVideo(videoId);
        if (status === 200) setVideo(fetchedVideo);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  async function likeHandler() {
    const playlistId = playlists.find((pl) => pl.name === LIKED_PL)?._id;
    try {
      const { status } = !videoState.liked
        ? await updatePlaylist(user._id, playlistId, {
            videos: [video._id],
            type: 'add',
          })
        : await updatePlaylist(user._id, playlistId, {
            videos: [video._id],
            type: 'remove',
          });
      console.log(status);
      if (status === 204) {
        !videoState.liked
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
      setVideoState({ ...videoState, liked: !videoState.liked });
    }
  }

  async function watchLaterHandler() {
    const playlistId = playlists.find((pl) => pl.name === WATCH_LATER_PL)?._id;
    try {
      const { status } = !videoState.saved
        ? await updatePlaylist(user._id, playlistId, {
            videos: [video._id],
            type: 'add',
          })
        : await updatePlaylist(user._id, playlistId, {
            videos: [video._id],
            type: 'remove',
          });

      if (status === 204) {
        !videoState.saved
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
      setVideoState({ ...videoState, saved: !videoState.saved });
    }
  }

  return (
    <div className="Watch-Video layout--default">
      {loading || !video ? (
        <Loader />
      ) : (
        <>
          <div className="watch-video__player">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              width="100%"
              height="100%"
            />
          </div>
          <div className="watch-video__buttons flex--row">
            <button
              className={`btn btn--icon ${
                videoState.liked ? 'btn--selected' : 'btn--action'
              }`}
              onClick={() => (authToken ? likeHandler() : navigate('/login'))}
            >
              <span className="btn__icon fa--sm">
                <i className="far fa-thumbs-up"></i>
              </span>
            </button>
            <button
              className={`btn btn--icon ${
                videoState.saved ? 'btn--selected' : 'btn--action'
              }`}
              onClick={() =>
                authToken ? watchLaterHandler() : navigate('/login')
              }
            >
              <span className="btn__icon fa--sm">
                <i className="far fa-clock"></i>
              </span>
            </button>
            <Link
              state={{ videoId: video._id }}
              to={{
                search: '?action=update_playlist',
              }}
              className="btn btn--icon btn--action"
            >
              <span className="btn__icon fa--sm">
                <i className="far fa-list-alt"></i>
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
        </>
      )}
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
