import { apiClient } from '@/lib/api';
import {
    Notificacao,
    Template,
    TemplateFormData,
    ConfiguracaoNotificacao,
    EstatisticasEmail,
    NotificacaoResponse,
    TemplateResponse,
} from '@/types/notificacao';

export const notificacoesService = {
    listarNotificacoes: async (
        pagina: number = 1,
        limite: number = 10
    ): Promise<NotificacaoResponse> => {
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            limite: limite.toString(),
        });

        return apiClient.get<NotificacaoResponse>(
            `/notificacoes?${params.toString()}`
        );
    },

    obterNotificacao: async (id: string): Promise<Notificacao> => {
        return apiClient.get<Notificacao>(`/notificacoes/${id}`);
    },

    marcarComoLida: async (id: string): Promise<Notificacao> => {
        return apiClient.patch<Notificacao>(`/notificacoes/${id}/lida`, {});
    },

    marcarTudasComoLidas: async (): Promise<void> => {
        return apiClient.patch(`/notificacoes/todas/lidas`, {});
    },

    deletarNotificacao: async (id: string): Promise<void> => {
        return apiClient.delete(`/notificacoes/${id}`);
    },

    listarTemplates: async (
        pagina: number = 1,
        limite: number = 10
    ): Promise<TemplateResponse> => {
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            limite: limite.toString(),
        });

        return apiClient.get<TemplateResponse>(
            `/notificacoes/templates?${params.toString()}`
        );
    },

    obterTemplate: async (id: string): Promise<Template> => {
        return apiClient.get<Template>(`/notificacoes/templates/${id}`);
    },

    criarTemplate: async (dados: TemplateFormData): Promise<Template> => {
        return apiClient.post<Template>('/notificacoes/templates', dados);
    },

    atualizarTemplate: async (
        id: string,
        dados: Partial<TemplateFormData>
    ): Promise<Template> => {
        return apiClient.put<Template>(`/notificacoes/templates/${id}`, dados);
    },

    deletarTemplate: async (id: string): Promise<void> => {
        return apiClient.delete(`/notificacoes/templates/${id}`);
    },

    obterConfiguracoes: async (): Promise<ConfiguracaoNotificacao[]> => {
        return apiClient.get<ConfiguracaoNotificacao[]>(
            `/notificacoes/configuracoes`
        );
    },

    atualizarConfiguracao: async (
        id: string,
        dados: Partial<ConfiguracaoNotificacao>
    ): Promise<ConfiguracaoNotificacao> => {
        return apiClient.patch<ConfiguracaoNotificacao>(
            `/notificacoes/configuracoes/${id}`,
            dados
        );
    },

    obterEstatisticas: async (): Promise<EstatisticasEmail> => {
        return apiClient.get<EstatisticasEmail>(`/notificacoes/estatisticas`);
    },

    testarTemplate: async (
        templateId: string,
        email: string
    ): Promise<{ sucesso: boolean; mensagem: string }> => {
        return apiClient.post(`/notificacoes/templates/${templateId}/testar`, { email });
    },

    reenviarNotificacao: async (notificacaoId: string): Promise<Notificacao> => {
        return apiClient.post(`/notificacoes/${notificacaoId}/reenviar`, {});
    },

    obterHistoricoEmails: async (
        pagina: number = 1,
        limite: number = 20
    ): Promise<NotificacaoResponse> => {
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            limite: limite.toString(),
        });

        return apiClient.get<NotificacaoResponse>(
            `/notificacoes/historico?${params.toString()}`
        );
    },
};

export default notificacoesService;