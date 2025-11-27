// Status
export const STATUS_CLIENTES = {
    ATIVO: 'ativo',
    INATIVO: 'inativo',
    SUSPENSO: 'suspenso',
} as const;

export const STATUS_MOTORISTAS = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    SUSPENSO: 'suspenso',
    DISPONIVEL: 'disponivel',
    OCUPADO: 'ocupado',
} as const;

export const STATUS_VIATURAS = {
    ATIVA: 'ativa',
    INATIVA: 'inativa',
    MANUTENCAO: 'manutencao',
    INSPECAO: 'inspecao',
} as const;

export const STATUS_VIAGENS = {
    SOLICITADA: 'solicitada',
    ACEITA: 'aceita',
    EMCAMINHO: 'emcaminho',
    EMPROGRESSS: 'emprogresss',
    CONCLUIDA: 'concluida',
    CANCELADA: 'cancelada',
} as const;

export const STATUS_PAGAMENTO = {
    PENDENTE: 'pendente',
    PROCESSANDO: 'processando',
    PAGO: 'pago',
    FALHOU: 'falhou',
    REEMBOLSADO: 'reembolsado',
} as const;

// Tipos
export const TIPO_PAGAMENTO = {
    DINHEIRO: 'dinheiro',
    CARTAO: 'cartao',
    TRANSFERENCIA: 'transferencia',
    CARTEIRA_DIGITAL: 'carteira_digital',
} as const;

export const TIPO_NOTIFICACAO = {
    BOAS_VINDAS: 'boas_vindas',
    CONFIRMACAO_VIAGEM: 'confirmacao_viagem',
    LEMBRETE_VIAGEM: 'lembrete_viagem',
    AVALIACAO: 'avaliacao',
    RECUPERACAO_SENHA: 'recuperacao_senha',
    PAGAMENTO_REALIZADO: 'pagamento_realizado',
    ALERTA_SISTEMA: 'alerta_sistema',
} as const;

export const CATEGORIA_VIATURAS = {
    ECONOMICA: 'economica',
    CONFORTO: 'conforto',
    PREMIUM: 'premium',
    VAN: 'van',
} as const;

// Paginação
export const PAGINAS_POR_TABELA = 10;
export const PAGINAS_POR_RELATORIO = 20;
export const LIMITE_MAXIMO_RESULTADOS = 100;

// Timeouts
export const TIMEOUT_API = 10000; // 10 segundos
export const TIMEOUT_UPLOAD = 30000; // 30 segundos

// Tamanhos
export const TAMANHO_MAXIMO_UPLOAD = 5 * 1024 * 1024; // 5 MB
export const TAMANHO_MAXIMO_FOTO = 2 * 1024 * 1024; // 2 MB

// Validações
export const COMPRIMENTO_NOME_MIN = 3;
export const COMPRIMENTO_NOME_MAX = 100;
export const COMPRIMENTO_EMAIL_MIN = 5;
export const COMPRIMENTO_EMAIL_MAX = 100;
export const COMPRIMENTO_SENHA_MIN = 8;
export const COMPRIMENTO_TELEFONE = 9;

// URLs
export const ROTAS_PUBLICAS = ['/', '/login', '/register', '/recuperar-senha'];
export const ROTAS_AUTENTICADAS = [
    '/dashboard',
    '/clientes',
    '/motoristas',
    '/viaturas',
    '/viagens',
    '/financeiro',
    '/relatorios',
    '/notificacoes',
    '/configuracoes',
];

// Cores
export const CORES_STATUS = {
    ativo: '#10b981', // green
    inativo: '#6b7280', // gray
    suspenso: '#f59e0b', // amber
    online: '#10b981', // green
    offline: '#6b7280', // gray
    disponivel: '#3b82f6', // blue
    ocupado: '#ef4444', // red
    ativa: '#10b981', // green
    inativa: '#6b7280', // gray
    manutencao: '#f59e0b', // amber
    inspecao: '#06b6d4', // cyan
    solicitada: '#06b6d4', // cyan
    aceita: '#3b82f6', // blue
    emcaminho: '#8b5cf6', // purple
    emprogresss: '#ec4899', // pink
    concluida: '#10b981', // green
    cancelada: '#ef4444', // red
    pendente: '#f59e0b', // amber
    processando: '#06b6d4', // cyan
    pago: '#10b981', // green
    falhou: '#ef4444', // red
    reembolsado: '#3b82f6', // blue
} as const;

// Mensagens
export const MENSAGENS = {
    SUCESSO_CRIADO: 'Criado com sucesso',
    SUCESSO_ATUALIZADO: 'Atualizado com sucesso',
    SUCESSO_DELETADO: 'Deletado com sucesso',
    ERRO_GENERICO: 'Ocorreu um erro, tente novamente',
    ERRO_CONEXAO: 'Erro de conexão com o servidor',
    ERRO_AUTENTICACAO: 'Erro de autenticação',
    ERRO_AUTORIZACAO: 'Você não tem permissão para acessar',
    CONFIRMACAO_DELETAR: 'Tem certeza que deseja deletar?',
    CARREGANDO: 'Carregando...',
    SEM_DADOS: 'Nenhum dado encontrado',
} as const;

// Regex
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REGEX_TELEFONE = /^\d{9}$/;
export const REGEX_CPF = /^\d{14}$/;
export const REGEX_SENHA = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const REGEX_NOME = /^[a-zA-Z\s]{3,}$/;
export const REGEX_MATRICULA = /^[A-Z]{2,3}-\d{2}-[A-Z]{2}-\d{3}$/;
export const REGEX_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Delays
export const DELAY_DEBOUNCE = 500; // ms
export const DELAY_THROTTLE = 1000; // ms

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'witransfer_token',
    USUARIO: 'witransfer_usuario',
    PREFERENCIAS: 'witransfer_preferencias',
    TEMAS: 'witransfer_tema',
} as const;