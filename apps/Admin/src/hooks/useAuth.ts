'use client';

import { useState, useEffect, useCallback } from 'react';
import { Usuario, LoginRequest, LoginResponse } from '@/types/api';
import { apiClient } from '@/lib/api';
import { STORAGE_KEYS } from '@/lib/constants';

interface UseAuthReturn {
    usuario: Usuario | null;
    token: string | null;
    autenticado: boolean;
    carregando: boolean;
    login: (credenciais: LoginRequest) => Promise<LoginResponse>;
    logout: () => void;
    atualizar: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);

    // Restaurar dados do localStorage ao montar
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const usuarioJson = localStorage.getItem(STORAGE_KEYS.USUARIO);

        if (token && usuarioJson) {
            try {
                const usuario = JSON.parse(usuarioJson);
                setToken(token);
                setUsuario(usuario);
            } catch (erro) {
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USUARIO);
            }
        }

        setCarregando(false);
    }, []);

    const login = useCallback(async (credenciais: LoginRequest): Promise<LoginResponse> => {
        try {
            const resposta = await apiClient.post<LoginResponse>('/auth/login', credenciais);

            localStorage.setItem(STORAGE_KEYS.TOKEN, resposta.token.access_token);
            localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(resposta.usuario));

            setToken(resposta.token.access_token);
            setUsuario(resposta.usuario);

            return resposta;
        } catch (erro) {
            throw erro;
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USUARIO);

        setToken(null);
        setUsuario(null);
    }, []);

    const atualizar = useCallback(async () => {
        try {
            const usuario = await apiClient.get<Usuario>('/auth/me');
            setUsuario(usuario);
            localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(usuario));
        } catch (erro) {
            logout();
            throw erro;
        }
    }, [logout]);

    return {
        usuario,
        token,
        autenticado: !!token && !!usuario,
        carregando,
        login,
        logout,
        atualizar,
    };
};

export default useAuth;