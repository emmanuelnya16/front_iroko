import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './motion/gsap'; // Central GSAP plugin registration (must be first)
import { ThemeProvider } from './context/ThemeContext';
import App from './App.tsx';
import './styles/theme.css';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
