'use client';

import { useState, useCallback } from 'react';

interface UseModalReturn {
    aberto: boolean;
    abrir: () => void;
    fechar: () => void;
    alternar: () => void;
}

export const useModal = (abiertoInicial: boolean = false): UseModalReturn => {
    const [aberto, setAberto] = useState(abiertoInicial);

    const abrir = useCallback(() => setAberto(true), []);
    const fechar = useCallback(() => setAberto(false), []);
    const alternar = useCallback(() => setAberto((prev) => !prev), []);

    return {
        aberto,
        abrir,
        fechar,
        alternar,
    };
};

export default useModal;