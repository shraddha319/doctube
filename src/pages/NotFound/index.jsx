import './NotFound.scss';
import brokenReel from '../../assets/Error/broken-reel-1.png';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="layout--center NotFound">
      <img className="not-found__image" src={brokenReel} alt="404 error" />
      <h1 className="not-found__title">404 Error</h1>
      <p className="not-found__detail text--md">
        Oops! The link you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn--icon--left btn--primary">
        <span className="btn__icon fa--xs">
          <i className="fas fa-arrow-left"></i>
        </span>
        <p className="btn__text">Back to Home</p>
      </Link>
    </div>
  );
}
