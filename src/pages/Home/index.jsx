import './Home.scss';
import './Carousel.scss';
import bgVideo from '../../assets/home/our_planet_tiger.mp4';
import netflixLogo from '../../assets/home/Netflix_logo.svg';

import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="Home">
      <section className="home__landing flex--column">
        <video loop={true} autoPlay muted={true}>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="home__overlay"></div>
        <div className="home__content home__content--our-planet">
          <img className="content__logo" src={netflixLogo} alt="Netflix logo" />
          <h2 className="content__title">OUR PLANET</h2>
          <h3 className="content__text">
            Winner of two Emmy Awards - Our Planet is a groundbreaking Netflix
            original documentary series.
          </h3>
          <Link to="/watch" className="btn btn--white btn--hover--expand-x">
            Watch Now
          </Link>
        </div>
      </section>
      <div className="carousel justify-center">
        <div className="option option-1 active"></div>
        <div className="option option-2"></div>
        <div className="option option-3"></div>
      </div>
    </div>
  );
}
