import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Topbar from '@components/Topbar';
import { AuthProvider } from '@context/AuthContext';
import '@styles/root.css';

function Root()  {
  return (
    <AuthProvider>
      <div>
        <Topbar />
        <div className="app-container">
          <Navbar />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default Root;

