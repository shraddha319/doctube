import { DisplayCard } from '../index';
import { Link } from 'react-router-dom';
import './VideoList.scss';
import EmptyList from './EmptyList';

export default function VideoList({ videos, limit, title, showAllLink }) {
  const videoList = limit ? videos.slice(0, limit) : videos;

  return (
    <div className="Video-List">
      {showAllLink && (
        <header className="video-list__header flex--row">
          <h1 className="title title--h5">{title}</h1>
          {showAllLink && videos.length > 0 && (
            <Link className="link link--hover label" to={showAllLink}>
              Show All
            </Link>
          )}
        </header>
      )}
      <div className="video-list__content  flex--row">
        {videos.length > 0 ? (
          videoList.map((video) => <DisplayCard video={video} />)
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
}
