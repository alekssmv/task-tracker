import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes.tsx'
import GlobalStyle from './global-style.tsx';
import userStore from './stores/UserStore.tsx';
import Api from './utils/Api.ts';
import tasksStore from './stores/TasksStore.tsx';

async function initApp() {

  const token = localStorage.getItem('access_token');
  if (token !== null) {
    /**
 * Проверяем, если токен уже есть в localStorage, 
 * то запрашиваем данные пользователя.
 */
    const data = await Api.profile(token);
    if (data) {
      userStore.setLogin(data.login);
      userStore.setRoles(data.roles);
    }

    // Получение тасков для админа.
    if (userStore.getRoles() === 'admin') {
      const response = await Api.getAdminTasks(token);
      if (response.success) {
        tasksStore.setTasks(response.data);
      }
    }

    // Получение тасков для пользователя.
    if (userStore.getRoles() === 'assignee') {
      const response = await Api.getAssigneeTasks(token);
      console.log('respose');
      console.log(response);
      if (response.success) {
        tasksStore.setTasks(response.data);
      }
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