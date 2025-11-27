import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse, ApiError } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');
// Use mock API only when explicitly enabled via env flag
const USE_STATIC = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para requisição
axiosInstance.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('taxigest_token') : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para resposta
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('taxigest_token');
                localStorage.removeItem('taxigest_usuario');
                window.location.href = '/login';
            }
        }

        const apiError: ApiError = {
            code: error.code || 'ERRO_DESCONHECIDO',
            message: error.message || 'Erro na requisição',
            status: error.response?.status || 500,
            details: error.response?.data as Record<string, any> | undefined,
        };

        return Promise.reject(apiError);
    }
);

// Mock de dados estáticos (sem backend)
type StatusMotorista = 'online' | 'offline' | 'suspenso' | 'disponivel' | 'ocupado';
type Motorista = {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    numeroDocumento: string;
    cartaConducao: string;
    dataInicio: string;
    status: StatusMotorista;
    viaturaId?: string;
    viaturaModelo?: string;
    numeroViagens: number;
    avaliacao: number;
    ganhoTotal: number;
    ganhoMes: number;
    fotoPerfil?: string;
    ultimaAtualizacao: string;
};

type MotoristaResponse = {
    data: Motorista[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let MOTORISTAS_DB: Motorista[] = [
    {
        id: '1',
        nome: 'Carlos Silva',
        email: 'carlos@email.com',
        telefone: '923456789',
        dataNascimento: '1990-03-10',
        numeroDocumento: '00456789LA045',
        cartaConducao: 'B-123456',
        dataInicio: '2023-06-15',
        status: 'online',
        viaturaId: 'V1',
        viaturaModelo: 'Toyota Corolla',
        numeroViagens: 156,
        avaliacao: 4.7,
        ganhoTotal: 250000,
        ganhoMes: 45000,
        fotoPerfil: '',
        ultimaAtualizacao: new Date().toISOString(),
    },
    {
        id: '2',
        nome: 'Ana Pereira',
        email: 'ana.pereira@email.com',
        telefone: '924111222',
        dataNascimento: '1988-11-22',
        numeroDocumento: '00991234LA012',
        cartaConducao: 'B-654321',
        dataInicio: '2022-01-05',
        status: 'disponivel',
        viaturaId: 'V2',
        viaturaModelo: 'Hyundai i20',
        numeroViagens: 98,
        avaliacao: 4.5,
        ganhoTotal: 180000,
        ganhoMes: 38000,
        fotoPerfil: '',
        ultimaAtualizacao: new Date().toISOString(),
    },
];

const mockApi = {
    get: async <T = any>(url: string): Promise<T> => {
        await delay(300);
        // Lista com paginação
        if (url.startsWith('/motoristas')) {
            const [path, queryString] = url.split('?');
            const params = new URLSearchParams(queryString);
            const pagina = parseInt(params.get('pagina') || '1');
            const limite = parseInt(params.get('limite') || '10');
            const busca = params.get('busca') || '';
            const status = params.get('status') as StatusMotorista | null;

            let itens = [...MOTORISTAS_DB];
            if (busca) {
                const b = busca.toLowerCase();
                itens = itens.filter(
                    (m) => m.nome.toLowerCase().includes(b) || m.email.toLowerCase().includes(b)
                );
            }
            if (status) {
                itens = itens.filter((m) => m.status === status);
            }

            // detalhe por id
            const idMatch = path.match(/^\/motoristas\/(.+)$/);
            if (idMatch) {
                const id = idMatch[1];
                const item = itens.find((m) => m.id === id);
                if (!item) throw { message: 'Motorista não encontrado', status: 404 } as ApiError;
                return item as unknown as T;
            }

            const total = itens.length;
            const inicio = (pagina - 1) * limite;
            const paginados = itens.slice(inicio, inicio + limite);
            const resposta: MotoristaResponse = {
                data: paginados,
                total,
                pagina,
                limite,
                totalPaginas: Math.max(1, Math.ceil(total / limite)),
            };
            return resposta as unknown as T;
        }

        throw { message: `Endpoint mock não implementado: ${url}`, status: 404 } as ApiError;
    },

    post: async <T = any>(url: string, data?: any): Promise<T> => {
        await delay(300);
        if (url === '/motoristas') {
            const novo: Motorista = {
                id: (Math.max(0, ...MOTORISTAS_DB.map((m) => parseInt(m.id))) + 1).toString(),
                nome: data?.nome || 'Novo Motorista',
                email: data?.email || 'novo@email.com',
                telefone: data?.telefone || '900000000',
                dataNascimento: data?.dataNascimento || '1995-01-01',
                numeroDocumento: data?.numeroDocumento || '00000000',
                cartaConducao: data?.cartaConducao || 'B-000000',
                dataInicio: data?.dataInicio || new Date().toISOString(),
                status: data?.status || 'disponivel',
                viaturaId: data?.viaturaId,
                viaturaModelo: data?.viaturaModelo,
                numeroViagens: 0,
                avaliacao: 0,
                ganhoTotal: 0,
                ganhoMes: 0,
                fotoPerfil: data?.fotoPerfil,
                ultimaAtualizacao: new Date().toISOString(),
            };
            MOTORISTAS_DB.unshift(novo);
            return novo as unknown as T;
        }
        throw { message: `Endpoint mock não implementado: ${url}`, status: 404 } as ApiError;
    },

    put: async <T = any>(url: string, data?: any): Promise<T> => {
        await delay(300);
        const match = url.match(/^\/motoristas\/(.+)$/);
        if (match) {
            const id = match[1];
            const idx = MOTORISTAS_DB.findIndex((m) => m.id === id);
            if (idx === -1) throw { message: 'Motorista não encontrado', status: 404 } as ApiError;
            MOTORISTAS_DB[idx] = { ...MOTORISTAS_DB[idx], ...data, ultimaAtualizacao: new Date().toISOString() };
            return MOTORISTAS_DB[idx] as unknown as T;
        }
        throw { message: `Endpoint mock não implementado: ${url}`, status: 404 } as ApiError;
    },

    patch: async <T = any>(url: string, data?: any): Promise<T> => {
        await delay(300);
        const statusMatch = url.match(/^\/motoristas\/(.+)\/status$/);
        if (statusMatch) {
            const id = statusMatch[1];
            const idx = MOTORISTAS_DB.findIndex((m) => m.id === id);
            if (idx === -1) throw { message: 'Motorista não encontrado', status: 404 } as ApiError;
            MOTORISTAS_DB[idx] = { ...MOTORISTAS_DB[idx], status: data?.status, ultimaAtualizacao: new Date().toISOString() };
            return MOTORISTAS_DB[idx] as unknown as T;
        }
        throw { message: `Endpoint mock não implementado: ${url}`, status: 404 } as ApiError;
    },

    delete: async <T = any>(url: string): Promise<T> => {
        await delay(300);
        const match = url.match(/^\/motoristas\/(.+)$/);
        if (match) {
            const id = match[1];
            MOTORISTAS_DB = MOTORISTAS_DB.filter((m) => m.id !== id);
            return undefined as unknown as T;
        }
        throw { message: `Endpoint mock não implementado: ${url}`, status: 404 } as ApiError;
    },
};

export const apiClient = USE_STATIC
    ? {
          get: mockApi.get,
          post: mockApi.post,
          put: mockApi.put,
          patch: mockApi.patch,
          delete: mockApi.delete,
      }
    : {
          get: async <T = any>(url: string, config?: any): Promise<T> => {
              const response = await axiosInstance.get<ApiResponse<T>>(url, config);
              return response.data.data as T;
          },

          post: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
              const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
              return response.data.data as T;
          },

          put: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
              const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
              return response.data.data as T;
          },

          patch: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
              const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config);
              return response.data.data as T;
          },

          delete: async <T = any>(url: string, config?: any): Promise<T> => {
              const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
              return response.data.data as T;
          },
      };

export default axiosInstance;