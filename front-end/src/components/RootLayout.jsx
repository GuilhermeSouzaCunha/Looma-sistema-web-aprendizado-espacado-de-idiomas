import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderApp from './HeaderApp.jsx';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export default function RootLayout() {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);

    const currentPage = location.pathname.replace('/', '') || 'dashboard';

    const navigate = useNavigate();

    const handleNavigate = (page) => {
        navigate(`/${page}`);
    };

    return (
        <>
            <HeaderApp
                currentPage={currentPage}
                onNavigate={handleNavigate}
                //isDarkMode={}
                //onToggleDarkMode={}
                user={user}                
                onLogout={logout}    
                userPoints={user?.pontos || 1250}
                streak={user?.sequencia_atual || 7}
            />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
        </>
    );
}