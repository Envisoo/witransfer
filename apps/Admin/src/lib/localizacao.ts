export const CONFIGURACOES_ANGOLA = {
    pais: 'Angola',
    codigo_pais: 'AO',
    moeda: {
        codigo: 'AOA',
        simbolo: 'Kz',
        nome: 'Kwanza Angolano',
        decimais: 2,
    },
    idioma: {
        codigo: 'pt-AO',
        nome: 'Português Angolano',
    },
    fuso_horario: 'Africa/Luanda',
    utc_offset: '+01:00',
    formatos: {
        data: 'DD/MM/YYYY',
        hora: 'HH:mm',
        data_hora: 'DD/MM/YYYY HH:mm',
        telefone: '+244 9XX XXX XXX',
    },
    cidades_principais: [
        { id: 1, nome: 'Luanda', provincia: 'Luanda' },
        { id: 2, nome: 'Viana', provincia: 'Luanda' },
        { id: 3, nome: 'Talatona', provincia: 'Luanda' },
        { id: 4, nome: 'Bengo', provincia: 'Bengo' },
        { id: 5, nome: 'Cabinda', provincia: 'Cabinda' },
        { id: 6, nome: 'Huambo', provincia: 'Huambo' },
        { id: 7, nome: 'Benguela', provincia: 'Benguela' },
        { id: 8, nome: 'Huíla', provincia: 'Huíla' },
        { id: 9, nome: 'Lubango', provincia: 'Huíla' },
        { id: 10, nome: 'Zaire', provincia: 'Zaire' },
        { id: 11, nome: 'Uíge', provincia: 'Uíge' },
        { id: 12, nome: 'Lunda Norte', provincia: 'Lunda Norte' },
        { id: 13, nome: 'Lunda Sul', provincia: 'Lunda Sul' },
    ],
    operadoras_telefonicas: [
        { id: 1, codigo: '900', nome: 'Unitel', prefixo: '+244 9' },
        { id: 2, codigo: '912', nome: 'Angola Telecom', prefixo: '+244 9' },
        { id: 3, codigo: '930', nome: 'Zap', prefixo: '+244 9' },
        { id: 4, codigo: '923', nome: 'Movicel', prefixo: '+244 9' },
    ],
    categorias_viaturas: [
        { id: 1, nome: 'Econômica', descricao: 'Veículos simples e econômicos', cor: '#3b82f6' },
        { id: 2, nome: 'Conforto', descricao: 'Veículos com mais conforto', cor: '#8b5cf6' },
        { id: 3, nome: 'Premium', descricao: 'Veículos de luxo', cor: '#dc2626' },
        { id: 4, nome: 'Van', descricao: 'Vans para grupos', cor: '#059669' },
    ],
    servicos_adicionais: [
        { id: 1, nome: 'Bagagem Extra', descricao: 'Espaço adicional para bagagem', preco: 5000 },
        { id: 2, nome: 'Animal de Estimação', descricao: 'Transporte permitido com pet', preco: 3000 },
        { id: 3, nome: 'Cadeira de Rodas', descricao: 'Acessibilidade para cadeira de rodas', preco: 2000 },
        { id: 4, nome: 'Serviço Premium', descricao: 'Motorista de terno, água, etc', preco: 10000 },
    ],
    tarifas: {
        tarifa_base: 1000, // 1000 Kz
        preco_km: 50, // 50 Kz por km
        preco_minuto: 30, // 30 Kz por minuto
        taxa_plataforma: 0.15, // 15%
        comissao_motorista: 0.85, // 85%
    },
    horarios_operacao: {
        horario_funcionamento: '06:00-23:00',
        horario_pico_inicio: '07:00',
        horario_pico_fim: '09:00',
    },
    validacoes: {
        min_caracteres_nome: 3,
        max_caracteres_nome: 100,
        min_caracteres_email: 5,
        max_caracteres_email: 100,
        min_caracteres_senha: 8,
        telefone_comprimento: 9,
    },
} as const;

export const FORMATO_MOEDA = (valor: number): string => {
    return new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};

export const FORMATO_DATA = (data: Date | string): string => {
    const d = new Date(data);
    return new Intl.DateTimeFormat('pt-AO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(d);
};

export const FORMATO_HORA = (data: Date | string): string => {
    const d = new Date(data);
    return new Intl.DateTimeFormat('pt-AO', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(d);
};

export const FORMATO_DATA_HORA = (data: Date | string): string => {
    return `${FORMATO_DATA(data)} ${FORMATO_HORA(data)}`;
};

export const FORMATO_TELEFONE = (telefone: string): string => {
    const cleaned = telefone.replace(/\D/g, '');
    if (cleaned.length === 9) {
        return `+244 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    }
    return telefone;
};

export const OBTER_NOME_STATUS = (status: string): string => {
    const statusMap: Record<string, string> = {
        ativo: 'Ativo',
        inativo: 'Inativo',
        suspenso: 'Suspenso',
        online: 'Online',
        offline: 'Offline',
        disponivel: 'Disponível',
        ocupado: 'Ocupado',
        ativa: 'Ativa',
        inativa: 'Inativa',
        manutencao: 'Manutenção',
        inspecao: 'Inspeção',
        solicitada: 'Solicitada',
        aceita: 'Aceita',
        emcaminho: 'Em Caminho',
        em_progresso: 'Em Progresso',
        concluida: 'Concluída',
        cancelada: 'Cancelada',
        pendente: 'Pendente',
        processando: 'Processando',
        pago: 'Pago',
        falhou: 'Falhou',
        reembolsado: 'Reembolsado',
    };
    return statusMap[status] || status;
};