import { apiClient } from '@/lib/api';
import {
    Viatura,
    ViaturaFormData,
    ViaturaFiltros,
    ViaturaResponse,
    ViaturaEstatisticas,
} from '@/types/viatura';

export const viaturasService = {
    listar: async (
        pagina: number = 1,
        limite: number = 10,
        filtros?: ViaturaFiltros
    ): Promise<ViaturaResponse> => {
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            limite: limite.toString(),
            ...(filtros?.status && { status: filtros.status }),
            ...(filtros?.categoria && { categoria: filtros.categoria }),
            ...(filtros?.busca && { busca: filtros.busca }),
            ...(filtros?.arCondicionado !== undefined && {
                arCondicionado: filtros.arCondicionado.toString(),
            }),
        });

        return apiClient.get<ViaturaResponse>(`/viaturas?${params.toString()}`);
    },

    obter: async (id: string): Promise<Viatura> => {
        return apiClient.get<Viatura>(`/viaturas/${id}`);
    },

    criar: async (dados: ViaturaFormData): Promise<Viatura> => {
        return apiClient.post<Viatura>('/viaturas', dados);
    },

    atualizar: async (id: string, dados: Partial<ViaturaFormData>): Promise<Viatura> => {
        return apiClient.put<Viatura>(`/viaturas/${id}`, dados);
    },

    deletar: async (id: string): Promise<void> => {
        return apiClient.delete(`/viaturas/${id}`);
    },

    buscar: async (termo: string): Promise<Viatura[]> => {
        return apiClient.get<Viatura[]>(`/viaturas/buscar?termo=${termo}`);
    },

    obterEstatisticas: async (): Promise<ViaturaEstatisticas> => {
        return apiClient.get<ViaturaEstatisticas>(`/viaturas/estatisticas`);
    },

    mudarStatus: async (id: string, status: string): Promise<Viatura> => {
        return apiClient.patch<Viatura>(`/viaturas/${id}/status`, { status });
    },

    obterPorMotorista: async (motoristaId: string): Promise<Viatura[]> => {
        return apiClient.get<Viatura[]>(`/viaturas/motorista/${motoristaId}`);
    },
};

export default viaturasService;