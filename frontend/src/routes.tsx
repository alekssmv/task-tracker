import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminTasks from './pages/admin/AdminTasks';
import AdminCreateTask from './pages/admin/CreateTask';
import Task from './pages/admin/Task';
import AssigneeTasks from './pages/assignee/AssigneeTasks';
import TaskAssignee from './pages/assignee/Task';

import AdminRoutes from './utils/AdminRoutes';
import AssigneeRoutes from './utils/AssigneeRoutes';
import NotAuthRoutes from './utils/NotAuthRoutes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Not auth routes */}
        <Route element={<NotAuthRoutes />}>
          <Route path="/" element={<Login />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminTasks />} />
          <Route path="/admin/task/create" element={<AdminCreateTask />} />
          <Route path="/admin/task/:id" element={<Task />} />"
        </Route>

        {/* Assignee routes */}
        <Route element={<AssigneeRoutes />}>
          <Route path='/assignee' element={<AssigneeTasks />} />
          <Route path='/assignee/task/:id' element={<TaskAssignee />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;