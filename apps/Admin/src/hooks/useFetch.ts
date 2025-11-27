'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { getMensagemErro } from '@/lib/errorHandler';

interface UseFetchOptions {
    autoFetch?: boolean;
    dependencies?: any[];
}

interface UseFetchState<T> {
    dados: T | null;
    carregando: boolean;
    erro: string | null;
}

export const useFetch = <T = any>(
    url: string,
    opcoes: UseFetchOptions = {}
): UseFetchState<T> & { refetch: () => Promise<void> } => {
    const [estado, setEstado] = useState<UseFetchState<T>>({
        dados: null,
        carregando: true,
        erro: null,
    });

    const { autoFetch = true, dependencies = [url] } = opcoes;

    const buscarDados = useCallback(async () => {
        try {
            setEstado((prev) => ({ ...prev, carregando: true, erro: null }));
            const dados = await apiClient.get<T>(url);
            setEstado({ dados, carregando: false, erro: null });
        } catch (erro: any) {
            const mensagem = getMensagemErro(erro);
            setEstado({ dados: null, carregando: false, erro: mensagem });
        }
    }, [url]);

    useEffect(() => {
        if (autoFetch) {
            buscarDados();
        }
    }, dependencies);

    return {
        ...estado,
        refetch: buscarDados,
    };
};

export default useFetch;