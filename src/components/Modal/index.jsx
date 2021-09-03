import './Modal.scss';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default function Modal({ children, title = 'title' }) {
  const navigate = useNavigate();

  return ReactDOM.createPortal(
    <div className="Modal--container">
      <div className="Modal">
        <header className="Modal__header">
          <h1>{title}</h1>
          <button
            onClick={() => navigate(-1)}
            className="btn btn--icon btn--gray btn--round--full"
          >
            <span className="btn__icon fa--xs">
              <i class="fas fa-times"></i>
            </span>
          </button>
        </header>
        <main className="Modal__content">{children}</main>
      </div>
    </div>,
    document.getElementById('modal_root')
  );
}
