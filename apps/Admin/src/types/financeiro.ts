import { TipoPagamento } from "./viagem";

export type StatusPagamento = 'pendente' | 'processando' | 'pago' | 'falhou' | 'reembolsado';

export interface Pagamento {
    id: string;
    motoristaId: string;
    motoristaNome: string;
    valor: number;
    taxa: number;
    liquido: number;
    status: StatusPagamento;
    tipoPagamento: TipoPagamento;
    dataPagamento?: string;
    dataSolicitacao: string;
    numeroViagens: number;
    periodoInicio: string;
    periodoFim: string;
    comprovante?: string;
}

export interface DashboardFinanceiro {
    receita: number;
    pagamentos: number;
    taxas: number;
    despesas: number;
    lucroLiquido: number;
    percentualVariacao: number;
}

export interface PagamentoFormData {
    motoristaId: string;
    valor: number;
    tipoPagamento: TipoPagamento;
    periodoInicio: string;
    periodoFim: string;
}

export interface PagamentoFiltros {
    status?: StatusPagamento;
    motoristaId?: string;
    tipoPagamento?: TipoPagamento;
    dataInicio?: string;
    dataFim?: string;
}

export interface PagamentoResponse {
    data: Pagamento[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
    totalValor: number;
}

export interface EvolucaoFinanceira {
    data: string;
    receita: number;
    pagamentos: number;
    lucro: number;
}

export interface RelatorioFinanceiro {
    periodo: {
        inicio: string;
        fim: string;
    };
    receita: {
        total: number;
        porDia: EvolucaoFinanceira[];
    };
    pagamentos: {
        total: number;
        porMotorista: Array<{
            motoristaId: string;
            motoristaNome: string;
            valor: number;
            numeroViagens: number;
        }>;
    };
    taxas: number;
    despesas: number;
    lucroLiquido: number;
}