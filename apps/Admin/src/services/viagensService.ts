import { apiClient } from '@/lib/api';
import {
    Viagem,
    ViagemFormData,
    ViagemFiltros,
    ViagemResponse,
    ViagemEstatisticas,
    ViagemTiempoReal,
} from '@/types/viagem';

export const viagensService = {
    listar: async (
        pagina: number = 1,
        limite: number = 10,
        filtros?: ViagemFiltros
    ): Promise<ViagemResponse> => {
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            limite: limite.toString(),
            ...(filtros?.status && { status: filtros.status }),
            ...(filtros?.clienteId && { clienteId: filtros.clienteId }),
            ...(filtros?.motoristaId && { motoristaId: filtros.motoristaId }),
            ...(filtros?.dataInicio && { dataInicio: filtros.dataInicio }),
            ...(filtros?.dataFim && { dataFim: filtros.dataFim }),
            ...(filtros?.tipoPagamento && { tipoPagamento: filtros.tipoPagamento }),
        });

        return apiClient.get<ViagemResponse>(`/viagens?${params.toString()}`);
    },

    obter: async (id: string): Promise<Viagem> => {
        return apiClient.get<Viagem>(`/viagens/${id}`);
    },

    criar: async (dados: ViagemFormData): Promise<Viagem> => {
        return apiClient.post<Viagem>('/viagens', dados);
    },

    atualizar: async (id: string, dados: Partial<ViagemFormData>): Promise<Viagem> => {
        return apiClient.put<Viagem>(`/viagens/${id}`, dados);
    },

    cancelar: async (id: string, motivo: string): Promise<Viagem> => {
        return apiClient.patch<Viagem>(`/viagens/${id}/cancelar`, { motivo });
    },

    avaliar: async (id: string, avaliacao: number, comentario?: string): Promise<Viagem> => {
        return apiClient.patch<Viagem>(`/viagens/${id}/avaliar`, { avaliacao, comentario });
    },

    obterEstatisticas: async (): Promise<ViagemEstatisticas> => {
        return apiClient.get<ViagemEstatisticas>(`/viagens/estatisticas`);
    },

    obterEmProgresso: async (): Promise<Viagem[]> => {
        return apiClient.get<Viagem[]>(`/viagens/em-progresso`);
    },

    obterTiempoReal: async (): Promise<ViagemTiempoReal[]> => {
        return apiClient.get<ViagemTiempoReal[]>(`/viagens/tempo-real`);
    },

    obterPorCliente: async (clienteId: string): Promise<Viagem[]> => {
        return apiClient.get<Viagem[]>(`/viagens/cliente/${clienteId}`);
    },

    obterPorMotorista: async (motoristaId: string): Promise<Viagem[]> => {
        return apiClient.get<Viagem[]>(`/viagens/motorista/${motoristaId}`);
    },
};

export default viagensService;