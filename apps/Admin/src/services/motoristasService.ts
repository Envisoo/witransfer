import { apiClient } from '@/lib/api';
import {
    Motorista,
    MotoristaFormData,
    MotoristaFiltros,
    MotoristaResponse,
    MotoristaEstatisticas,
} from '@/types/motorista';

export const motoristasService = {
    listar: async (
        pagina: number = 1,
        limite: number = 10,
        filtros?: MotoristaFiltros
    ): Promise<MotoristaResponse> => {
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            limite: limite.toString(),
            ...(filtros?.status && { status: filtros.status }),
            ...(filtros?.busca && { busca: filtros.busca }),
            ...(filtros?.minAvaliacoes !== undefined && {
                minAvaliacoes: filtros.minAvaliacoes.toString(),
            }),
            ...(filtros?.maxAvaliacoes !== undefined && {
                maxAvaliacoes: filtros.maxAvaliacoes.toString(),
            }),
            ...(filtros?.dataInicio && { dataInicio: filtros.dataInicio }),
            ...(filtros?.dataFim && { dataFim: filtros.dataFim }),
        });

        return apiClient.get<MotoristaResponse>(`/motoristas?${params.toString()}`);
    },

    obter: async (id: string): Promise<Motorista> => {
        return apiClient.get<Motorista>(`/motoristas/${id}`);
    },

    criar: async (dados: MotoristaFormData): Promise<Motorista> => {
        return apiClient.post<Motorista>('/motoristas', dados);
    },

    atualizar: async (id: string, dados: Partial<MotoristaFormData>): Promise<Motorista> => {
        return apiClient.put<Motorista>(`/motoristas/${id}`, dados);
    },

    suspender: async (id: string, motivo: string): Promise<Motorista> => {
        return apiClient.patch<Motorista>(`/motoristas/${id}/suspender`, { motivo });
    },

    reativar: async (id: string): Promise<Motorista> => {
        return apiClient.patch<Motorista>(`/motoristas/${id}/reativar`, {});
    },

    deletar: async (id: string): Promise<void> => {
        return apiClient.delete(`/motoristas/${id}`);
    },

    buscar: async (termo: string): Promise<Motorista[]> => {
        return apiClient.get<Motorista[]>(`/motoristas/buscar?termo=${termo}`);
    },

    obterEstatisticas: async (): Promise<MotoristaEstatisticas> => {
        return apiClient.get<MotoristaEstatisticas>(`/motoristas/estatisticas`);
    },

    obterOnline: async (): Promise<Motorista[]> => {
        return apiClient.get<Motorista[]>(`/motoristas/online`);
    },

    mudarStatus: async (id: string, status: string): Promise<Motorista> => {
        return apiClient.patch<Motorista>(`/motoristas/${id}/status`, { status });
    },
};

export default motoristasService;