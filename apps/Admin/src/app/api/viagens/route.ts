import { NextRequest, NextResponse } from 'next/server';

// GET /api/viagens
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const pagina = searchParams.get('pagina') || '1';
        const limite = searchParams.get('limite') || '10';

        // TODO: Conectar com banco de dados real
        const dados = {
            data: [
                {
                    id: '1',
                    clienteId: '1',
                    clienteNome: 'João Silva',
                    motoristaId: '1',
                    motoristaNome: 'Carlos Silva',
                    viaturaId: '1',
                    viaturaModelo: 'Toyota Corolla',
                    origem: {
                        latitude: -8.838,
                        longitude: 13.234,
                        endereco: 'Luanda, Angola',
                    },
                    destino: {
                        latitude: -8.84,
                        longitude: 13.24,
                        endereco: 'Talatona, Luanda',
                    },
                    dataPartida: new Date().toISOString(),
                    dataChegada: new Date(Date.now() + 1800000).toISOString(),
                    duracao: 30,
                    distancia: 8.5,
                    status: 'concluida',
                    preco: 50000,
                    taxaPlataforma: 7500,
                    comissaoMotorista: 42500,
                    lucroLiquido: 0,
                    tipoPagamento: 'dinheiro',
                    avaliacao: 5,
                    comentario: 'Ótima viagem',
                },
            ],
            total: 1,
            pagina: parseInt(pagina),
            limite: parseInt(limite),
            totalPaginas: 1,
        };

        return NextResponse.json({
            success: true,
            data: dados,
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

        // TODO: Validar dados
        // TODO: Salvar no banco de dados

        return NextResponse.json(
            {
                success: true,
                data: {
                    id: '123',
                    ...body,
                    dataPartida: new Date().toISOString(),
                },
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