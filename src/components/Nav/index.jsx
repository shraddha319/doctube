import { NavLink, Link } from 'react-router-dom';
import './Nav.scss';
import logoIcon from '../../assets/logo.svg';

export default function Nav({ pathname }) {
  return (
    <header
      className="header"
      style={{ background: pathname === '/' ? 'rgba(0,0,0,0.5)' : '' }}
    >
      <button className="btn" id="header__toggle">
        <span></span>
      </button>

      <div className="header__brand brand">
        <Link className="link" to="/">
          <img className="icon--lg" src={logoIcon} />
        </Link>
      </div>

      <nav className="nav nav--main">
        <ul className="list--no-bullets">
          <li className="nav__item">
            <NavLink activeClassName="active" className="link" to="/watch">
              Watch
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink activeClassName="active" className="link" to="/my-list">
              My List
            </NavLink>
          </li>
        </ul>
      </nav>

      <nav className="nav nav--social">
        <ul className="list--no-bullets">
          <li className="nav__item">
            <NavLink activeClassName="active" className="link" to="/login">
              <span className="fa--sm">
                <i className="far fa-user-circle"></i>
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
