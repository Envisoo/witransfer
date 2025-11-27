import { apiClient } from '@/lib/api';
import { LoginRequest, LoginResponse, Usuario, AuthToken } from '@/types/api';

export interface RegistroRequest {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    senhaConfirmacao: string;
}

export interface AlterarSenhaRequest {
    senhaAtual: string;
    novaSenha: string;
    novaSenhaConfirmacao: string;
}

export interface RecuperarSenhaRequest {
    email: string;
}

export interface ResetarSenhaRequest {
    token: string;
    novaSenha: string;
    novaSenhaConfirmacao: string;
}

export interface AtualizarPerfilRequest {
    nome: string;
    telefone: string;
    fotoPerfil?: File;
}

export const authService = {
    login: async (credenciais: LoginRequest): Promise<LoginResponse> => {
        return apiClient.post<LoginResponse>('/auth/login', credenciais);
    },

    registro: async (dados: RegistroRequest): Promise<LoginResponse> => {
        return apiClient.post<LoginResponse>('/auth/registro', dados);
    },

    obterMeuPerfil: async (): Promise<Usuario> => {
        return apiClient.get<Usuario>('/auth/me');
    },

    atualizarPerfil: async (dados: AtualizarPerfilRequest): Promise<Usuario> => {
        return apiClient.put<Usuario>('/auth/perfil', dados);
    },

    alterarSenha: async (dados: AlterarSenhaRequest): Promise<{ mensagem: string }> => {
        return apiClient.post('/auth/alterar-senha', dados);
    },

    recuperarSenha: async (dados: RecuperarSenhaRequest): Promise<{ mensagem: string }> => {
        return apiClient.post('/auth/recuperar-senha', dados);
    },

    resetarSenha: async (dados: ResetarSenhaRequest): Promise<{ mensagem: string }> => {
        return apiClient.post('/auth/resetar-senha', dados);
    },

    refreshToken: async (refreshToken: string): Promise<AuthToken> => {
        return apiClient.post<AuthToken>('/auth/refresh', { refreshToken });
    },

    logout: async (): Promise<{ mensagem: string }> => {
        return apiClient.post('/auth/logout', {});
    },

    verificarToken: async (): Promise<boolean> => {
        try {
            await apiClient.get('/auth/verify');
            return true;
        } catch {
            return false;
        }
    },

    confirmarEmail: async (token: string): Promise<{ mensagem: string }> => {
        return apiClient.post('/auth/confirmar-email', { token });
    },

    reenviarConfirmacaoEmail: async (email: string): Promise<{ mensagem: string }> => {
        return apiClient.post('/auth/reenviar-confirmacao', { email });
    },

    deletarConta: async (senha: string): Promise<{ mensagem: string }> => {
        return apiClient.post('/auth/deletar-conta', { senha });
    },
};

export default authService;