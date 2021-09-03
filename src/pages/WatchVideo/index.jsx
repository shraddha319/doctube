import './WatchVideo.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { DisplayCard } from '../../components';
import { useAuth, useData } from '../../context';
import { lowerCaseHyphenate, isVideoInPlaylist } from '../../utility/utils';
import { LIKED_PL, WATCH_LATER_PL } from '../../utility/constants';

export default function WatchVideo() {
  const { title } = useParams();
  const {
    data: { videos, playlists },
    dispatchData,
  } = useData();
  const { authToken } = useAuth();
  const video = videos.find(
    (video) => lowerCaseHyphenate(video.title) === title
  );
  const navigate = useNavigate();

  const isLiked = isVideoInPlaylist(
    video._id,
    playlists.find((pl) => pl.name === LIKED_PL)
  );
  const isWatchLater = isVideoInPlaylist(
    video._id,
    playlists.find((pl) => pl.name === WATCH_LATER_PL)
  );

  function likeHandler() {
    isLiked
      ? dispatchData({
          type: 'REMOVE_FROM_PLAYLIST',
          payload: {
            videoId: video._id,
            playlistName: LIKED_PL,
          },
        })
      : dispatchData({
          type: 'ADD_TO_PLAYLIST',
          payload: {
            video,
            playlistName: LIKED_PL,
          },
        });
  }

  function watchLaterHandler() {
    isWatchLater
      ? dispatchData({
          type: 'REMOVE_FROM_PLAYLIST',
          payload: {
            videoId: video._id,
            playlistName: WATCH_LATER_PL,
          },
        })
      : dispatchData({
          type: 'ADD_TO_PLAYLIST',
          payload: {
            video,
            playlistName: WATCH_LATER_PL,
          },
        });
  }

  return (
    <div className="Watch-Video layout--default">
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
            isLiked ? 'btn--selected' : 'btn--action'
          }`}
          onClick={() => (authToken ? likeHandler : navigate('/login'))}
        >
          <span className="btn__icon fa--sm">
            <i className="far fa-thumbs-up"></i>
          </span>
        </button>
        <button
          className={`btn btn--icon ${
            isWatchLater ? 'btn--selected' : 'btn--action'
          }`}
          onClick={() => (authToken ? watchLaterHandler : navigate('/login'))}
        >
          <span className="btn__icon fa--sm">
            <i className="far fa-clock"></i>
          </span>
        </button>
        <Link
          state={{ video: { title: video.title, _id: video._id } }}
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
        <section className="doc__suggestion">
          <h2>You May Also Like</h2>
          <div className="doc__suggestion__list">
            {videos.map((video) => (
              <DisplayCard video={video} />
            ))}
          </div>
        </section>
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
      return value.toString().length === 1 ? '0' + value.toString() : value;
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
            <div className="body__rating">{`IMDB ★ ${video.stats.rating.imdb}`}</div>
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
