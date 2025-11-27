import { FORMATO_DATA, FORMATO_HORA, FORMATO_MOEDA, FORMATO_TELEFONE } from './localizacao';

export const formatarMoeda = (valor: number): string => {
    return FORMATO_MOEDA(valor);
};

export const formatarData = (data: Date | string): string => {
    return FORMATO_DATA(data);
};

export const formatarHora = (data: Date | string): string => {
    return FORMATO_HORA(data);
};

export const formatarDataHora = (data: Date | string): string => {
    return `${FORMATO_DATA(data)} ${FORMATO_HORA(data)}`;
};

export const formatarTelefone = (telefone: string): string => {
    return FORMATO_TELEFONE(telefone);
};

export const truncarTexto = (texto: string, comprimento: number = 30): string => {
    if (texto.length > comprimento) {
        return `${texto.slice(0, comprimento)}...`;
    }
    return texto;
};

export const capitalizarPrimeiraLetra = (texto: string): string => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export const capitalizarTodosPrimeiraLetra = (texto: string): string => {
    return texto
        .split(' ')
        .map((palavra) => capitalizarPrimeiraLetra(palavra))
        .join(' ');
};

export const calcularDistancia = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export const calcularTempoViagem = (
    distancia: number,
    velocidadeMedia: number = 30
): number => {
    const horas = distancia / velocidadeMedia;
    return Math.round(horas * 60);
};

export const calcularTarifa = (
    distancia: number,
    tempoMinutos: number,
    tarifaBase: number = 1000,
    precoKm: number = 50,
    precoMinuto: number = 30
): number => {
    return Math.round(tarifaBase + distancia * precoKm + tempoMinutos * precoMinuto);
};

export const formatarDuracao = (minutos: number): string => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas > 0) {
        return `${horas}h ${mins}m`;
    }
    return `${mins}m`;
};

export const formatarDistancia = (km: number): string => {
    if (km < 1) {
        return `${Math.round(km * 1000)}m`;
    }
    return `${km.toFixed(1)}km`;
};

export const formatarPercentual = (valor: number): string => {
    return `${(valor * 100).toFixed(1)}%`;
};

export const slug = (texto: string): string => {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export const gerarCor = (texto: string): string => {
    let hash = 0;
    for (let i = 0; i < texto.length; i++) {
        hash = texto.charCodeAt(i) + ((hash << 5) - hash);
    }
    const cor = (hash & 0x00ffffff).toString(16).padStart(6, '0');
    return `#${cor}`;
};

export const formatarBytes = (bytes: number, decimais: number = 2): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimais < 0 ? 0 : decimais;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};