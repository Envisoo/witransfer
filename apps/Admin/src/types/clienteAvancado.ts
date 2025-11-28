export interface ClientScore {
    satisfacao: number; // 0-100
    valor: number; // 0-100
    engajamento: number; // 0-100
    risco: number; // 0-100 (quanto maior, maior o risco de churn)
}

export interface ClientSegment {
    tipo: 'vip' | 'recorrente' | 'ocasional' | 'inativo' | 'novo' | 'risco';
    label: string;
    cor: string;
}

export interface ClientLoyalty {
    pontos: number;
    nivel: 'bronze' | 'prata' | 'ouro' | 'platina';
    proximoNivel: string;
    pontosParaProximo: number;
    beneficios: string[];
}

export interface ClientPattern {
    frequenciaMedia: number; // viagens por mês
    horarioPreferido: string;
    categoriaVeiculoPreferida: string;
    trajetoFavorito: string;
    gastoMedio: number; // por viagem em Kz
    ultimaViagem: string; // ISO date
    diasSemViagem: number;
}

export interface ClientNote {
    id: string;
    autor: string;
    data: string;
    texto: string;
    tipo: 'info' | 'warning' | 'success' | 'error';
}

export interface ClientAdvanced {
    id: string;
    score: ClientScore;
    segmento: ClientSegment;
    fidelidade: ClientLoyalty;
    padroes: ClientPattern;
    notas: ClientNote[];
    documentosVerificados: boolean;
    emailVerificado: boolean;
    telefoneVerificado: boolean;
    metodosPagamento: number;
    saldoCredito: number;
    ticketsAbertos: number;
    ticketsResolvidos: number;
}
