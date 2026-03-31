import { createContext, useState, useContext, useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Sistema visual de Toast integrado de forma nativa */}
      {toast.visible && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '20px',
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-white)',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          animation: 'slideInRight 0.3s ease-out forwards',
          fontWeight: '500'
        }}>
          <CheckCircle2 color="var(--color-red)" size={24} />
          {toast.message}
        </div>
      )}
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
