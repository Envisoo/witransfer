import { apiClient } from '@/lib/api';
import {
    Pagamento,
    PagamentoFormData,
    PagamentoFiltros,
    PagamentoResponse,
    DashboardFinanceiro,
    EvolucaoFinanceira,
    RelatorioFinanceiro,
} from '@/types/financeiro';

export const financeiroService = {
    obterDashboard: async (): Promise<DashboardFinanceiro> => {
        return apiClient.get<DashboardFinanceiro>(`/financeiro/dashboard`);
    },

    listarPagamentos: async (
        pagina: number = 1,
        limite: number = 10,
        filtros?: PagamentoFiltros
    ): Promise<PagamentoResponse> => {
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            limite: limite.toString(),
            ...(filtros?.status && { status: filtros.status }),
            ...(filtros?.motoristaId && { motoristaId: filtros.motoristaId }),
            ...(filtros?.tipoPagamento && { tipoPagamento: filtros.tipoPagamento }),
            ...(filtros?.dataInicio && { dataInicio: filtros.dataInicio }),
            ...(filtros?.dataFim && { dataFim: filtros.dataFim }),
        });

        return apiClient.get<PagamentoResponse>(
            `/financeiro/pagamentos?${params.toString()}`
        );
    },

    obterPagamento: async (id: string): Promise<Pagamento> => {
        return apiClient.get<Pagamento>(`/financeiro/pagamentos/${id}`);
    },

    criarPagamento: async (dados: PagamentoFormData): Promise<Pagamento> => {
        return apiClient.post<Pagamento>('/financeiro/pagamentos', dados);
    },

    confirmarPagamento: async (id: string): Promise<Pagamento> => {
        return apiClient.patch<Pagamento>(`/financeiro/pagamentos/${id}/confirmar`, {});
    },

    cancelarPagamento: async (id: string, motivo: string): Promise<Pagamento> => {
        return apiClient.patch<Pagamento>(`/financeiro/pagamentos/${id}/cancelar`, { motivo });
    },

    obterEvolucaoReceita: async (
        dataInicio: string,
        dataFim: string
    ): Promise<EvolucaoFinanceira[]> => {
        return apiClient.get<EvolucaoFinanceira[]>(
            `/financeiro/evolucao?dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },

    obterRelatorio: async (
        dataInicio: string,
        dataFim: string
    ): Promise<RelatorioFinanceiro> => {
        return apiClient.get<RelatorioFinanceiro>(
            `/financeiro/relatorio?dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },

    gerarComprovante: async (pagamentoId: string): Promise<Blob> => {
        const response = await apiClient.get(`/financeiro/pagamentos/${pagamentoId}/comprovante`);
        return response;
    },

    exportarPagamentos: async (
        formato: 'pdf' | 'excel',
        dataInicio: string,
        dataFim: string
    ): Promise<Blob> => {
        return apiClient.get(
            `/financeiro/exportar?formato=${formato}&dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
    },
};

export default financeiroService;