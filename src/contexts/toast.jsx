import { createContext, useReducer, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const initialToast = {
    body: '',
    type: '',
    active: false,
  };
  const [toast, dispatchToast] = useReducer(toastReducer, initialToast);

  function toastReducer(state, { type, payload }) {
    switch (type) {
      case 'TRIGGER_TOAST':
        return { ...state, active: true, ...payload };

      case 'HIDE_TOAST':
        return { ...state, active: false };

      default:
        return state;
    }
  }

  return (
    <ToastContext.Provider value={{ toast, dispatchToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
