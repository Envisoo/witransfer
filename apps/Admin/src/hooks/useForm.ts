'use client';

import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
    valorInicial: T;
    onSubmit?: (dados: T) => Promise<void> | void;
    onErro?: (erro: any) => void;
}

interface UseFormReturn<T> {
    valores: T;
    erros: Partial<Record<keyof T, string>>;
    enviando: boolean;
    mudar: (campo: keyof T, valor: any) => void;
    mudarMultiplos: (dados: Partial<T>) => void;
    resetar: () => void;
    enviar: (e?: React.FormEvent) => Promise<void>;
    definirErro: (campo: keyof T, mensagem: string) => void;
    limparErro: (campo: keyof T) => void;
}

export const useForm = <T extends Record<string, any>>({
    valorInicial,
    onSubmit,
    onErro,
}: UseFormOptions<T>): UseFormReturn<T> => {
    const [valores, setValores] = useState<T>(valorInicial);
    const [erros, setErros] = useState<Partial<Record<keyof T, string>>>({});
    const [enviando, setEnviando] = useState(false);

    const mudar = useCallback((campo: keyof T, valor: any) => {
        setValores((prev) => ({
            ...prev,
            [campo]: valor,
        }));
        // Limpar erro ao começar a digitar
        if (erros[campo]) {
            setErros((prev) => ({
                ...prev,
                [campo]: undefined,
            }));
        }
    }, [erros]);

    const mudarMultiplos = useCallback((dados: Partial<T>) => {
        setValores((prev) => ({
            ...prev,
            ...dados,
        }));
    }, []);

    const resetar = useCallback(() => {
        setValores(valorInicial);
        setErros({});
    }, [valorInicial]);

    const definirErro = useCallback((campo: keyof T, mensagem: string) => {
        setErros((prev) => ({
            ...prev,
            [campo]: mensagem,
        }));
    }, []);

    const limparErro = useCallback((campo: keyof T) => {
        setErros((prev) => {
            const novoErros = { ...prev };
            delete novoErros[campo];
            return novoErros;
        });
    }, []);

    const enviar = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();
            setEnviando(true);

            try {
                if (onSubmit) {
                    await onSubmit(valores);
                }
                setErros({});
            } catch (erro: any) {
                const mensagem = erro.message || 'Erro ao enviar formulário';
                setErros((prev) => ({
                    ...prev,
                    _geral: mensagem,
                }));
                onErro?.(erro);
            } finally {
                setEnviando(false);
            }
        },
        [valores, onSubmit, onErro]
    );

    return {
        valores,
        erros,
        enviando,
        mudar,
        mudarMultiplos,
        resetar,
        enviar,
        definirErro,
        limparErro,
    };
};

export default useForm;