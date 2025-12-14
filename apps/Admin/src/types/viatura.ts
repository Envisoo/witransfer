export type StatusViatura = 'ativa' | 'inativa' | 'manutencao' | 'inspecao';
export type CategoriaViatura = 'economica' | 'conforto' | 'premium' | 'van';

export interface Viatura {
    historico: any;

    id: string;
    matricula: string;
    modelo: string;
    marca: string;
    cor: string;
    ano: number;
    lugares: number;
    arCondicionado: boolean;
    motoristaid?: string;
    motoristanome?: string;
    status: StatusViatura;
    dataUltimaInspecao: string;
    categoria: CategoriaViatura;
    fotoPrincipal?: string;
    numeroViagens: number;
    kilometragem: number;
    ultimaAtualizacao: string;
    // Informações técnicas adicionais
    numeroChassi?: string;
    numeroMotor?: string;
    tipoCombustivel?: 'gasolina' | 'gasoleo' | 'gpl' | 'eletrico' | 'hibrido';
    transmissao?: 'manual' | 'automatica';
    potencia?: number; // cv
    cilindrada?: number; // cc
    tipoTracao?: string;
    // Estado e condições
    estadoGeral?: 'novo' | 'semi-novo' | 'usado';
    nivelConservacao?: 'otimo' | 'bom' | 'razoavel' | 'mau';
    quilometragemAtual?: number;
    dataUltimaRevisao?: string;
    dataProximaRevisao?: string;
    // Documentação
    documentoCarroUrl?: string;
    seguroCompanhia?: string;
    seguroNumeroApolice?: string;
    seguroValidade?: string;
    inspecaoDataUltima?: string;
    inspecaoValidade?: string;
    observacoesDocumentacao?: string;
    // Fotos
    fotosExternas?: string[];
    fotosInternas?: string[];
    fotoMotor?: string;
    videoUrl?: string;
    // Extras
    possuiABS?: boolean;
    possuiAirbags?: boolean;
}

export interface ViaturaFormData {
    matricula: string;
    modelo: string;

    marca: string;
    cor: string;
    ano: number;
    lugares: number;
    arCondicionado: boolean;
    motoristaid?: string;
    status: StatusViatura;
    dataUltimaInspecao: string;
    categoria: CategoriaViatura;
    fotoPrincipal?: File;
    kilometragem: number;
    // Informações técnicas adicionais
    numeroChassi?: string;
    numeroMotor?: string;
    tipoCombustivel?: 'gasolina' | 'gasoleo' | 'gpl' | 'eletrico' | 'hibrido';
    transmissao?: 'manual' | 'automatica';
    potencia?: number;
    cilindrada?: number;
    tipoTracao?: string;
    // Estado e condições
    estadoGeral?: 'novo' | 'semi-novo' | 'usado';
    nivelConservacao?: 'otimo' | 'bom' | 'razoavel' | 'mau';
    quilometragemAtual?: number;
    dataUltimaRevisao?: string;
    dataProximaRevisao?: string;
    // Documentação
    documentoCarro?: File;
    seguroCompanhia?: string;
    seguroNumeroApolice?: string;
    seguroValidade?: string;
    inspecaoDataUltima?: string;
    inspecaoValidade?: string;
    observacoesDocumentacao?: string;
    // Fotos
    fotosExternas?: File[];
    fotosInternas?: File[];
    fotoMotor?: File;
    video?: File;
    // Extras
    possuiABS?: boolean;
    possuiAirbags?: boolean;
}

export interface ViaturaFiltros {
    status?: StatusViatura;
    categoria?: CategoriaViatura;
    busca?: string;
    arCondicionado?: boolean;
}

export interface ViaturaResponse {
    data: Viatura[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}

export interface ViaturaEstatisticas {
    totalViaturas: number;
    viaturaAtivas: number;
    viaturaInativas: number;
    viaturaManutencao: number;
    viaturaInspecao: number;
    porCategoria: Record<CategoriaViatura, number>;
}