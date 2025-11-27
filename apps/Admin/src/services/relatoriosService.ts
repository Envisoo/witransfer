import { apiClient } from '@/lib/api';

export interface RelatorioViagens {
    periodo: {
        inicio: string;
        fim: string;
    };
    total: number;
    porMotorista: Array<{
        motoristaId: string;
        motoristaNome: string;
        numeroViagens: number;
        avaliacaoMedia: number;
    }>;
    porCliente: Array<{
        clienteId: string;
        clienteNome: string;
        numeroViagens: number;
        gastoPorMes?: number;
    }>;
    distanciaTotal: number;
    tempoMedio: number;
    graficos: any;
}

export interface Relatoriofaturamento {
    periodo: {
        inicio: string;
        fim: string;
    };
    receita: number;
    pagamentos: number;
    taxas: number;
    lucroLiquido: number;
    porMotorista: Array<{
        motoristaId: string;
        motoristaNome: string;
        receita: number;
        comissao: number;
        lucro: number;
    }>;
    graficos: any;
}

export interface RelatorioDesempenho {
    motoristas: {
        maisViagens: Array<{
            motoristaId: string;
            motoristaNome: string;
            numeroViagens: number;
        }>;
        melhorAvaliados: Array<{
            motoristaId: string;
            motoristaNome: string;
            avaliacao: number;
        }>;
    };
    clientes: {
        maisFrequentes: Array<{
            clienteId: string;
            clienteNome: string;
            numeroViagens: number;
        }>;
    };
    taxaCancelamento: number;
    satisfacao: number;
}

export const relatoriosService = {
    obterRelatorioViagens: async (
        dataInicio: string,
        dataFim: string
    ): Promise<RelatorioViagens> => {
        return apiClient.get<RelatorioViagens>(
            `/relatorios/viagens?dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },

    obterRelatoriofaturamento: async (
        dataInicio: string,
        dataFim: string
    ): Promise<Relatoriofaturamento> => {
        return apiClient.get<Relatoriofaturamento>(
            `/relatorios/faturamento?dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },

    obterRelatorioDesempenho: async (
        dataInicio: string,
        dataFim: string
    ): Promise<RelatorioDesempenho> => {
        return apiClient.get<RelatorioDesempenho>(
            `/relatorios/desempenho?dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },

    exportarRelatorioViagens: async (
        formato: 'pdf' | 'excel',
        dataInicio: string,
        dataFim: string
    ): Promise<Blob> => {
        return apiClient.get(
            `/relatorios/viagens/exportar?formato=${formato}&dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },

    exportarRelatoriofaturamento: async (
        formato: 'pdf' | 'excel',
        dataInicio: string,
        dataFim: string
    ): Promise<Blob> => {
        return apiClient.get(
            `/relatorios/faturamento/exportar?formato=${formato}&dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },

    exportarRelatorioDesempenho: async (
        formato: 'pdf' | 'excel',
        dataInicio: string,
        dataFim: string
    ): Promise<Blob> => {
        return apiClient.get(
            `/relatorios/desempenho/exportar?formato=${formato}&dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },
};

export default relatoriosService;