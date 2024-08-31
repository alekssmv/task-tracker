import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes.tsx'
import GlobalStyle from './global-style.tsx';
import userStore from './stores/UserStore.tsx';
import Api from './utils/Api.ts';

async function initApp() {

  /**
   * Проверяем, если токен уже есть в localStorage, 
   * то запрашиваем данные пользователя.
   * Нужно для поддержки авторизации.
   */
  const token = localStorage.getItem('access_token');
  if (token !== null) {
    const data = await Api.profile(token);
    if (data) {
      userStore.setLogin(data.login);
      userStore.setRoles(data.roles);
    }
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <GlobalStyle />
      <Router />
    </StrictMode>,
  );
}

initApp();