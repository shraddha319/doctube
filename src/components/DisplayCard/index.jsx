import './DisplayCard.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { lowerCaseHyphenate } from '../../utility/utils';

export default function DisplayCard({ video }) {
  const [cardHover, setCardHover] = useState(false);

  return (
    <div className="DisplayCard clickable card__layout">
      <div
        className="card__media"
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        {cardHover && (
          <div className="card__overlay justify-center">
            <Link
              className="card__play btn btn--icon"
              to={`/watch/${lowerCaseHyphenate(video.title)}`}
            >
              <span className="fa--md fa--primary">
                <i className="fas fa-play-circle"></i>
              </span>
            </Link>
          </div>
        )}
        <img
          className="card__media--image"
          src={video.imageURL}
          alt={video.title}
        />
      </div>
      <div className="card__body">
        <h2 className="card__title">{video.title}</h2>
        <div className="card__details">
          <p className="card__year-duration">{`${video.releaseDate.year} · ${video.durationMin} min`}</p>
        </div>
      </div>
    </div>
  );
}
