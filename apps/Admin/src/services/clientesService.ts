import { apiClient } from '@/lib/api';
import {
    Cliente,
    ClienteFormData,
    ClienteFiltros,
    ClienteResponse,
} from '@/types/cliente';

export const clientesService = {
    listar: async (
        pagina: number = 1,
        limite: number = 10,
        filtros?: ClienteFiltros
    ): Promise<ClienteResponse> => {
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

        return apiClient.get<ClienteResponse>(`/clientes?${params.toString()}`);
    },

    obter: async (id: string): Promise<Cliente> => {
        return apiClient.get<Cliente>(`/clientes/${id}`);
    },

    criar: async (dados: ClienteFormData): Promise<Cliente> => {
        return apiClient.post<Cliente>('/clientes', dados);
    },

    atualizar: async (id: string, dados: Partial<ClienteFormData>): Promise<Cliente> => {
        return apiClient.put<Cliente>(`/clientes/${id}`, dados);
    },

    suspender: async (id: string, motivo: string): Promise<Cliente> => {
        return apiClient.patch<Cliente>(`/clientes/${id}/suspender`, { motivo });
    },

    reativar: async (id: string): Promise<Cliente> => {
        return apiClient.patch<Cliente>(`/clientes/${id}/reativar`, {});
    },

    deletar: async (id: string): Promise<void> => {
        return apiClient.delete(`/clientes/${id}`);
    },

    buscar: async (termo: string): Promise<Cliente[]> => {
        return apiClient.get<Cliente[]>(`/clientes/buscar?termo=${termo}`);
    },

    mudarStatus: async (id: string, status: string): Promise<Cliente> => {
        return apiClient.patch<Cliente>(`/clientes/${id}/status`, { status });
    },
};

export default clientesService;