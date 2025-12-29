import { NextRequest, NextResponse } from 'next/server';

// Mock Data
const VIAGENS_MOCK = [
    {
        id: '1001',
        clienteId: 'c1',
        clienteNome: 'João Silva',
        motoristaId: 'm1',
        motoristaNome: 'Carlos Silva',
        viaturaId: 'v1',
        viaturaModelo: 'Toyota Corolla',
        origem: { latitude: -8.838, longitude: 13.234, endereco: 'Rua Rainha Ginga, Luanda' },
        destino: { latitude: -8.84, longitude: 13.24, endereco: 'Talatona Shopping, Luanda' },
        dataPartida: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        distancia: 8.5,
        status: 'em_progresso',
        preco: 5000,
        taxaPlataforma: 750,
        comissaoMotorista: 4250,
        lucroLiquido: 0,
        tipoPagamento: 'dinheiro',
        avaliacao: undefined
    },
    {
        id: '1002',
        clienteId: 'c2',
        clienteNome: 'Maria Santos',
        motoristaId: 'm2',
        motoristaNome: 'Pedro Costa',
        viaturaId: 'v2',
        viaturaModelo: 'Hyundai i10',
        origem: { latitude: -8.810, longitude: 13.210, endereco: 'Aeroporto 4 de Fevereiro' },
        destino: { latitude: -8.850, longitude: 13.250, endereco: 'Hotel Epic Sana' },
        dataPartida: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
        distancia: 12.0,
        status: 'emcaminho',
        preco: 8000,
        taxaPlataforma: 1200,
        comissaoMotorista: 6800,
        lucroLiquido: 0,
        tipoPagamento: 'cartao',
        avaliacao: undefined
    },
    {
        id: '1003',
        clienteId: 'c3',
        clienteNome: 'Ana Oliveira',
        motoristaId: undefined,
        motoristaNome: undefined,
        viaturaId: undefined,
        viaturaModelo: undefined,
        origem: { latitude: -8.820, longitude: 13.220, endereco: 'Mutamba, Luanda' },
        destino: { latitude: -8.860, longitude: 13.260, endereco: 'Kilamba, Bloco A' },
        dataPartida: new Date().toISOString(),
        distancia: 15.5,
        status: 'solicitada',
        preco: 10000,
        taxaPlataforma: 1500,
        comissaoMotorista: 8500,
        lucroLiquido: 0,
        tipoPagamento: 'carteira_digital',
        avaliacao: undefined
    },
    {
        id: '1004',
        clienteId: 'c4',
        clienteNome: 'Ricardo Pereira',
        motoristaId: 'm3',
        motoristaNome: 'Manuel João',
        viaturaId: 'v3',
        viaturaModelo: 'Kia Picanto',
        origem: { latitude: -8.830, longitude: 13.230, endereco: 'Vila Alice' },
        destino: { latitude: -8.870, longitude: 13.270, endereco: 'Nova Vida' },
        dataPartida: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        dataChegada: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        distancia: 10.2,
        status: 'concluida',
        preco: 6500,
        taxaPlataforma: 975,
        comissaoMotorista: 5525,
        lucroLiquido: 0,
        tipoPagamento: 'dinheiro',
        avaliacao: 5,
        comentario: 'Motorista muito educado'
    },
    {
        id: '1005',
        clienteId: 'c5',
        clienteNome: 'Sofia Martins',
        motoristaId: 'm4',
        motoristaNome: 'António José',
        viaturaId: 'v4',
        viaturaModelo: 'Suzuki Alto',
        origem: { latitude: -8.840, longitude: 13.240, endereco: 'Alvalade' },
        destino: { latitude: -8.880, longitude: 13.280, endereco: 'Benfica' },
        dataPartida: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        distancia: 20.0,
        status: 'cancelada',
        preco: 12000,
        taxaPlataforma: 0,
        comissaoMotorista: 0,
        lucroLiquido: 0,
        tipoPagamento: 'cartao',
        motivoCancelamento: 'Demora do motorista',
        avaliacao: undefined
    },
    {
        id: '1006',
        clienteId: 'c6',
        clienteNome: 'Paulo Sousa',
        motoristaId: undefined,
        motoristaNome: undefined,
        viaturaId: undefined,
        viaturaModelo: undefined,
        origem: { latitude: -8.850, longitude: 13.250, endereco: 'Maculusso' },
        destino: { latitude: -8.890, longitude: 13.290, endereco: 'Zango 0' },
        dataPartida: new Date().toISOString(),
        distancia: 25.0,
        status: 'solicitada',
        preco: 15000,
        taxaPlataforma: 2250,
        comissaoMotorista: 12750,
        lucroLiquido: 0,
        tipoPagamento: 'dinheiro',
        avaliacao: undefined
    },
    {
        id: '1007',
        clienteId: 'c7',
        clienteNome: 'Beatriz Lima',
        motoristaId: 'm5',
        motoristaNome: 'Jorge Mendes',
        viaturaId: 'v5',
        viaturaModelo: 'Toyota Yaris',
        origem: { latitude: -8.860, longitude: 13.260, endereco: 'Maianga' },
        destino: { latitude: -8.900, longitude: 13.300, endereco: 'Cacuaco' },
        dataPartida: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        distancia: 18.0,
        status: 'aceita',
        preco: 11000,
        taxaPlataforma: 1650,
        comissaoMotorista: 9350,
        lucroLiquido: 0,
        tipoPagamento: 'transferencia',
        avaliacao: undefined
    }
];

// GET /api/viagens
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const pagina = parseInt(searchParams.get('pagina') || '1');
        const limite = parseInt(searchParams.get('limite') || '10');
        const busca = searchParams.get('busca')?.toLowerCase() || '';
        const status = searchParams.get('status') || '';
        const dataFiltro = searchParams.get('data') || '';
        const motoristaFiltro = searchParams.get('motorista')?.toLowerCase() || '';

        let viagensFiltradas = [...VIAGENS_MOCK];

        // Filtro por Busca (ID ou Cliente)
        if (busca) {
            viagensFiltradas = viagensFiltradas.filter(v =>
                v.id.toLowerCase().includes(busca) ||
                v.clienteNome.toLowerCase().includes(busca)
            );
        }

        // Filtro por Status
        if (status) {
            viagensFiltradas = viagensFiltradas.filter(v => v.status === status);
        }

        // Filtro por Data
        if (dataFiltro) {
            viagensFiltradas = viagensFiltradas.filter(v => v.dataPartida.startsWith(dataFiltro));
        }

        // Filtro por Motorista
        if (motoristaFiltro) {
            viagensFiltradas = viagensFiltradas.filter(v =>
                v.motoristaNome?.toLowerCase().includes(motoristaFiltro)
            );
        }

        // Paginação
        const total = viagensFiltradas.length;
        const totalPaginas = Math.ceil(total / limite);
        const inicio = (pagina - 1) * limite;
        const fim = inicio + limite;
        const dadosPaginados = viagensFiltradas.slice(inicio, fim);

        const resposta = {
            data: dadosPaginados,
            total: total,
            pagina: pagina,
            limite: limite,
            totalPaginas: totalPaginas,
        };

        return NextResponse.json({
            success: true,
            data: resposta,
        });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'ERRO_BUSCAR_VIAGENS',
                    message: erro.message,
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}

// POST /api/viagens
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Simulação de criação
        const novaViagem = {
            id: (1000 + VIAGENS_MOCK.length + 1).toString(),
            ...body,
            dataPartida: new Date().toISOString(),
            status: 'solicitada'
        };

        // Em um cenário real, salvaríamos no banco
        // VIAGENS_MOCK.push(novaViagem); 

        return NextResponse.json(
            {
                success: true,
                data: novaViagem,
            },
            { status: 201 }
        );
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'ERRO_CRIAR_VIAGEM',
                    message: erro.message,
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}