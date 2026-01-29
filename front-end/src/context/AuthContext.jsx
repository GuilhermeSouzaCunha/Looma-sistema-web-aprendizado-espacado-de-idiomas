import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const res = await axios.get('http://127.0.0.1:8000/auth/profile/', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data.user);
                } catch (err) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate('/login');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [navigate]);

    // signup
    const signup = async (nome_usuario, email, password, idioma_nativo_id = 1, idioma_alvo_id = 2) => {
        try {
            await axios.post('http://127.0.0.1:8000/auth/signup/', {
                nome_usuario,
                email,
                password,
                idioma_nativo_id,
                idioma_alvo_id
            });
            alert('Cadastro realizado com sucesso! Faça login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.error || 'Erro no cadastro. Tente novamente.');
        }
    };

    // signin
    const login = async (email, password) => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/signin/', { email, password });
            localStorage.setItem('accessToken', res.data.access);
            localStorage.setItem('refreshToken', res.data.refresh);
            setUser(res.data.user);
            alert('Login realizado com sucesso!');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Erro no login. Verifique suas credenciais.');
        }
    };

    // logout
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate('/login');
    };

    // token em todas as requisições automaticamente
    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    // Refresh token automático se access expirar (erro 401)
    axios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refresh = localStorage.getItem('refreshToken');
                    const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh });
                    localStorage.setItem('accessToken', res.data.access);
                    originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                    return axios(originalRequest);
                } catch (refreshErr) {
                    logout();
                    return Promise.reject(refreshErr);
                }
            }
            return Promise.reject(error);
        }
    );

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};