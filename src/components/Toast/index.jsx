import { useToast } from '../../contexts';
import './toast.scss';
import { useEffect } from 'react';

export default function Toast() {
  const {
    toast: { active, type, body },
    dispatchToast,
  } = useToast();

  const typeIconMap = {
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle',
    error: 'fa-skull-crossbones',
    success: 'fa-check-circle',
  };

  useEffect(() => {
    if (active) {
      const timerID = setTimeout(() => {
        dispatchToast({ type: 'HIDE_TOAST' });
      }, 3000);

      return () => {
        clearTimeout(timerID);
      };
    }
  }, [active, dispatchToast, body]);

  return (
    <div
      class={`toast ${active ? 'toast--show' : 'toast--hide'}
    toast--${type}`}
    >
      <div class="toast__layout">
        <span class="toast__icon fa--sm">
          <i class={`fas ${typeIconMap[type]}`}></i>
        </span>
        <span class="toast__text">{body}</span>
        <button
          onClick={() => dispatchToast({ type: 'HIDE_TOAST' })}
          class="toast__close btn"
        >
          <span className="fa--xs">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
}
