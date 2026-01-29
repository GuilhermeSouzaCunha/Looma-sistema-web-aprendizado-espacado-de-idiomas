// RootLayout.jsx (ou crie um AppWrapper.jsx e use ele como raiz das rotas)
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';  // ← useNavigate do react-router!
import HeaderApp from './HeaderApp.jsx';

export default function RootLayout() {
    const navigate = useNavigate(); 

    const [currentPage, setCurrentPage] = useState('dashboard');

    const handleNavigate = (page) => {
        setCurrentPage(page);
        navigate(`/${page}`);
    };

    const handleLogout = () => {
        console.log('Logout realizado!');
        // lógica de logout (limpar token, redirecionar para login...)
        navigate('/login');
    };

    return (
        <>
            <HeaderApp
                currentPage={currentPage}
                onNavigate={handleNavigate}
                user={null}
                onLogout={handleLogout}
                userPoints={1250}
                streak={7}
            />
            <Outlet />
        </>
    );
}