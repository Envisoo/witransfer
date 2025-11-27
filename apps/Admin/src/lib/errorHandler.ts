import { ApiError } from '@/types/api';

export class AppError extends Error {
    constructor(
        public message: string,
        public code: string = 'APP_ERROR',
        public status: number = 500
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleApiError = (error: any): AppError => {
    if (error instanceof AppError) {
        return error;
    }

    if (error.status) {
        const apiError = error as ApiError;
        return new AppError(apiError.message, apiError.code, apiError.status);
    }

    if (error.message) {
        return new AppError(error.message, 'ERRO_DESCONHECIDO', 500);
    }

    return new AppError('Erro desconhecido', 'ERRO_DESCONHECIDO', 500);
};

export const getMensagemErro = (error: any): string => {
    if (typeof error === 'string') {
        return error;
    }

    const appError = handleApiError(error);

    const mensagens: Record<number, string> = {
        400: 'Dados inválidos',
        401: 'Não autenticado',
        403: 'Não autorizado',
        404: 'Recurso não encontrado',
        409: 'Conflito - recurso já existe',
        422: 'Dados inválidos ou incompletos',
        429: 'Muitas requisições - tente novamente mais tarde',
        500: 'Erro interno do servidor',
        503: 'Serviço indisponível',
    };

    return mensagens[appError.status] || appError.message || 'Erro desconhecido';
};

export const logError = (error: any, contexto?: string): void => {
    const appError = handleApiError(error);

    console.error(`[${contexto || 'ERROR'}]`, {
        message: appError.message,
        code: appError.code,
        status: appError.status,
        timestamp: new Date().toISOString(),
    });

    // Aqui você pode enviar para um serviço de logging remoto
    if (process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true') {
        // Implementar integração com Sentry, LogRocket, etc
    }
};

export const tratarErro = (error: any, contexto?: string): void => {
    logError(error, contexto);
    // Adicione lógica adicional de tratamento se necessário
};

export class ValidationError extends AppError {
    constructor(
        public fields: Record<string, string>,
        message: string = 'Erro de validação'
    ) {
        super(message, 'VALIDATION_ERROR', 422);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends AppError {
    constructor(recurso: string = 'Recurso') {
        super(`${recurso} não encontrado`, 'NOT_FOUND', 404);
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Não autenticado') {
        super(message, 'UNAUTHORIZED', 401);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Não autorizado') {
        super(message, 'FORBIDDEN', 403);
        this.name = 'ForbiddenError';
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Recurso já existe') {
        super(message, 'CONFLICT', 409);
        this.name = 'ConflictError';
    }
}