export type StatusMotorista = 'online' | 'offline' | 'suspenso' | 'disponivel' | 'ocupado';
export type DisponibilidadeMotorista = 'Ativo' | 'Inativo' | 'Férias';
export type SexoMotorista = 'Masculino' | 'Feminino' | 'Outro';

// Interface para histórico de acidentes
export interface HistoricoAcidente {
    id: string;
    data: string;
    veiculo: string;
    gravidade: 'Leve' | 'Moderado' | 'Grave';
    descricao: string;
}

// Interface para infrações de trânsito
export interface InfracaoTransito {
    id: string;
    data: string;
    tipo: string;
    multa: number;
    descricao: string;
}

export interface Motorista {
    id: string;

    // A) Dados Pessoais
    nome: string;
    nomeApelido?: string;
    dataNascimento: string;
    sexo?: SexoMotorista;
    nacionalidade?: string;
    nif?: string;
    numeroDocumento: string;
    endereco?: string;
    cidade?: string;
    provincia?: string;
    telefone: string;
    telefoneAlternativo?: string;
    email: string;
    fotoPerfil?: string;

    // B) Documentação do Motorista
    cartaConducao: string;
    dataEmissaoCarta?: string;
    dataValidadeCarta?: string;
    cartaProfissional?: boolean;
    antecedentesUrl?: string; // URL do upload do registo criminal
    documentoMedicoUrl?: string; // URL do atestado médico
    fotoBI?: string; // URL da foto do BI
    fotoCarta?: string; // URL da foto da carta

    // C) Informações Profissionais
    experienciaAnos?: number;
    idiomasFalados?: string[];
    disponibilidade: DisponibilidadeMotorista;
    dataInicio: string;
    turno?: string;

    // Relação com viatura
    viaturaId?: string;
    viaturaModelo?: string;

    // F) Segurança & Avaliação
    pontuacao: number; // 1 a 5 estrelas
    numeroAdvertencias?: number;
    historicoAcidentes?: HistoricoAcidente[];
    infracoesTransito?: InfracaoTransito[];

    // G) Observações
    notasInternas?: string;
    comportamento?: string;
    recomendacoes?: string;
    restricoesMedicas?: string;

    // Performance
    kmConduzidos?: number;
    consumoMedio?: number;
    numeroViagens: number;
    pontualidade?: number; // Percentual
    reclamacoes?: number;

    // Financeiro
    ganhoTotal: number;
    ganhoMes: number;
    comissoes?: number;
    descontos?: number;
    pagamentosRealizados?: number;

    // Dados do sistema
    status: StatusMotorista;
    avaliacao: number;
    ultimaAtualizacao: string;
}


export interface MotoristaFormData {
    // A) Dados Pessoais
    nome: string;
    nomeApelido?: string;
    dataNascimento: string;
    sexo?: SexoMotorista;
    nacionalidade?: string;
    nif?: string;
    numeroDocumento: string;
    endereco?: string;
    cidade?: string;
    provincia?: string;
    telefone: string;
    telefoneAlternativo?: string;
    email: string;
    fotoPerfil?: File;

    // B) Documentação
    cartaConducao: string;
    dataEmissaoCarta?: string;
    dataValidadeCarta?: string;
    cartaProfissional?: boolean;
    antecedentes?: File;
    documentoMedico?: File;
    fotoBI?: File;
    fotoCarta?: File;

    // C) Informações Profissionais
    experienciaAnos?: number;
    idiomasFalados?: string[];
    disponibilidade: DisponibilidadeMotorista;
    dataInicio: string;
    turno?: string;

    // Relação com viatura
    viaturaId?: string;
    status: StatusMotorista;

    // G) Observações
    notasInternas?: string;
    comportamento?: string;
    recomendacoes?: string;
    restricoesMedicas?: string;
}


export interface MotoristaFiltros {
    status?: StatusMotorista;
    busca?: string;
    minAvaliacoes?: number;
    maxAvaliacoes?: number;
    dataInicio?: string;
    dataFim?: string;
}

export interface MotoristaResponse {
    data: Motorista[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}

export interface MotoristaEstatisticas {
    totalMotoristas: number;
    motoristasOnline: number;
    motoristasOffline: number;
    motoristaSuspensos: number;
    avaliacaoMedia: number;
    ganhoTotal: number;
}