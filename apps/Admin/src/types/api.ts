export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: ApiError;
    message?: string;
    timestamp?: string;
    path?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
    status: number;
}

export interface PaginationMeta {
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
    temProxima: boolean;
    temAnterior: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

export interface RequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    data?: any;
    timeout?: number;
}

export interface AuthToken {
    access_token: string;
    refresh_token?: string;
    tipo_token: string;
    expires_in: number;
}

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    papel: 'admin' | 'gestor' | 'supervisor' | 'operador';
    ativo: boolean;
    dataCriacao: string;
}

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token: AuthToken;
    usuario: Usuario;
}

export interface LogError {
    id: string;
    tipo: string;
    mensagem: string;
    stack?: string;
    usuario?: string;
    rota?: string;
    metodo?: string;
    statusCode?: number;
    timestamp: string;
}