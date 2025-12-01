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