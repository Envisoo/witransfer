export type StatusMotorista = 'online' | 'offline' | 'suspenso' | 'disponivel' | 'ocupado';

export interface Motorista {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    numeroDocumento: string;
    cartaConducao: string;
    dataInicio: string;
    status: StatusMotorista;
    viaturaId?: string;
    viaturaModelo?: string;
    numeroViagens: number;
    avaliacao: number;
    ganhoTotal: number;
    ganhoMes: number;
    fotoPerfil?: string;
    ultimaAtualizacao: string;
}

export interface MotoristaFormData {
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    numeroDocumento: string;
    cartaConducao: string;
    dataInicio: string;
    status: StatusMotorista;
    viaturaId?: string;
    fotoPerfil?: File;
}

export interface MotoristaFiltros {
    status?: StatusMotorista;
    busca?: string;
    minAvaliacoes?: number;
    maxAvaliacoes?: number;
    dataInicio?: string;
    dataFim?: string;
}

export interface MotoristaResponse {
    data: Motorista[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}

export interface MotoristaEstatisticas {
    totalMotoristas: number;
    motoristasOnline: number;
    motoristasOffline: number;
    motoristaSuspensos: number;
    avaliacaoMedia: number;
    ganhoTotal: number;
}