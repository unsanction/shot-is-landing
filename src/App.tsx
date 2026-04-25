import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const normalizePath = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

function App() {
  const pathname = normalizePath(window.location.pathname);
  const isNotFound = pathname !== '/' && pathname !== '/index.html';

  useEffect(() => {
    document.title = isNotFound ? '404 · SHOT.IS' : 'SHOT.IS';
  }, [isNotFound]);

  return isNotFound ? <NotFoundPage /> : <HomePage />;
}

export default App;
