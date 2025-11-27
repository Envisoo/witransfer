export type TipoNotificacao =
    | 'boas_vindas'
    | 'confirmacao_viagem'
    | 'lembrete_viagem'
    | 'avaliacao'
    | 'recuperacao_senha'
    | 'pagamento_realizado'
    | 'alerta_sistema';

export type StatusEmail = 'rascunho' | 'enviado' | 'aberto' | 'clicado' | 'falhou';

export interface Notificacao {
    id: string;
    tipo: TipoNotificacao;
    titulo: string;
    mensagem: string;
    destinatario: string;
    status: StatusEmail;
    dataEnvio: string;
    dataAbertura?: string;
    metadados?: Record<string, any>;
}

export interface Template {
    id: string;
    nome: string;
    tipo: TipoNotificacao;
    assunto: string;
    corpo: string;
    ativo: boolean;
    variaveisPossiveis: string[];
    dataCriacao: string;
    dataAtualizacao: string;
}

export interface TemplateFormData {
    nome: string;
    tipo: TipoNotificacao;
    assunto: string;
    corpo: string;
    ativo: boolean;
}

export interface ConfiguracaoNotificacao {
    id: string;
    tipo: TipoNotificacao;
    trigger: string;
    destinatario: string;
    conteudoPersonalizavel: boolean;
    ativo: boolean;
    dataCriacao: string;
}

export interface EstatisticasEmail {
    totalEnviados: number;
    totalAbertos: number;
    totalCliques: number;
    taxaAbertura: number;
    taxaCliques: number;
    porTipo: Record<TipoNotificacao, {
        enviados: number;
        abertos: number;
        cliques: number;
    }>;
}

export interface NotificacaoResponse {
    data: Notificacao[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}

export interface TemplateResponse {
    data: Template[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}