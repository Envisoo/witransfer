export type StatusCliente = 'ativo' | 'inativo' | 'suspenso';

export interface Cliente {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    dataNascimento?: string;
    endereco?: string;
    status: StatusCliente;
    dataCadastro: string;
    numeroViagens: number;
    avaliacaoMedia: number;
    fotoPerfil?: string;
    documentoId?: string;
    ultimaAtualizacao: string;
}

export interface ClienteFormData {
    nome: string;
    email: string;
    telefone: string;
    dataNascimento?: string;
    endereco?: string;
    status: StatusCliente;
    fotoPerfil?: File;
    documentoId?: string;
}

export interface ClienteFiltros {
    status?: StatusCliente;
    busca?: string;
    dataInicio?: string;
    dataFim?: string;
    minAvaliacoes?: number;
    maxAvaliacoes?: number;
}

export interface ClienteResponse {
    data: Cliente[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}