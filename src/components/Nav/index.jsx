import { NavLink, Link } from 'react-router-dom';
import './Nav.scss';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { useAuth } from '../../context';

export default function Nav({ pathname }) {
  const { auth } = useAuth();

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
          <LogoIcon className="icon--lg" fill="#fff" />
        </Link>
      </div>

      <nav className="nav nav--main">
        <ul className="list--no-bullets">
          <li className="nav__item">
            <NavLink end activeClassName="active" className="link" to="/watch">
              Watch
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              end
              activeClassName="active"
              className="link"
              to="/playlists"
            >
              Playlists
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              end
              activeClassName="active"
              className="link flex--row"
              to="/playlists/liked"
            >
              <span class="fa--xs">
                <i class="far fa-thumbs-up"></i>
              </span>
              <p>Liked</p>
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              end
              activeClassName="active"
              className="link flex--row"
              to="/playlists/watch-later"
            >
              <span class="fa--xs">
                <i class="far fa-clock"></i>
              </span>
              <p>Saved</p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <nav className="nav nav--social">
        <ul className="list--no-bullets">
          <li className="nav__item">
            {auth?.authToken ? (
              <NavLink
                end
                activeClassName="active"
                className="link flex--row"
                to="/"
              >
                <span className="fa--xs">
                  <i className="far fa-user-circle"></i>
                </span>
                <p>{auth.user.firstName}</p>
              </NavLink>
            ) : (
              <NavLink
                end
                activeClassName="active"
                className="link flex--row"
                to="/login"
              >
                <span className="fa--sm">
                  <i className="far fa-user-circle"></i>
                </span>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
