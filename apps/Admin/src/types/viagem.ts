export type StatusViagem = 'solicitada' | 'aceita' | 'emcaminho' | 'em_progresso' | 'concluida' | 'cancelada';
export type TipoPagamento = 'dinheiro' | 'cartao' | 'transferencia' | 'carteira_digital';

export interface Localizacao {
    latitude: number;
    longitude: number;
    endereco?: string;
}

export interface Viagem {
    id: string;
    clienteId: string;
    clienteNome: string;
    motoristaId?: string;
    motoristaNome?: string;
    viaturaId?: string;
    viaturaModelo?: string;
    origem: Localizacao;
    destino: Localizacao;
    dataPartida: string;
    dataChegada?: string;
    duracao?: number;
    distancia: number;
    status: StatusViagem;
    preco: number;
    taxaPlataforma: number;
    comissaoMotorista: number;
    lucroLiquido: number;
    tipoPagamento: TipoPagamento;
    avaliacao?: number;
    comentario?: string;
    motivoCancelamento?: string;
    localizacaoAtual?: Localizacao;
}

export interface ViagemFormData {
    clienteId: string;
    motoristaId?: string;
    viaturaId?: string;
    origem: Localizacao;
    destino: Localizacao;
    tipoPagamento: TipoPagamento;
    preco?: number;
}

export interface ViagemFiltros {
    status?: StatusViagem;
    clienteId?: string;
    motoristaId?: string;
    dataInicio?: string;
    dataFim?: string;
    tipoPagamento?: TipoPagamento;
}

export interface ViagemResponse {
    data: Viagem[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}

export interface ViagemEstatisticas {
    totalViagens: number;
    viagensHoje: number;
    viagensEmProgresso: number;
    viagensCanceladas: number;
    receita: number;
    distanciaTotal: number;
    tempoMedio: number;
}

export interface ViagemTiempoReal {
    id: string;
    motoristaId: string;
    motoristaNome: string;
    localizacao: Localizacao;
    status: StatusViagem;
    clienteNome: string;
    destino: string;
    distancia: number;
    tempoEstimado: number;
}