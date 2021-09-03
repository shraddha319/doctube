import './VideoList.scss';
import { Link } from 'react-router-dom';

export default function EmptyList() {
  return (
    <div className="video-list--empty">
      <p>No videos in this playlist yet.</p>
      <Link to="/watch" className="btn btn--primary">
        Explore
      </Link>
    </div>
  );
}
