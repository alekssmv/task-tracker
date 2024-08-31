import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminTasks from './pages/admin/AdminTasks';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminTasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;