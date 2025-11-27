import { NextRequest, NextResponse } from 'next/server';

// GET /api/viaturas
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const pagina = parseInt(searchParams.get('pagina') || '1');
        const limite = parseInt(searchParams.get('limite') || '10');
        // Unused search parameters are ignored for static data
        // const busca = searchParams.get('busca');
        // const status = searchParams.get('status');

        const dados = {
            data: [
                {
                    id: '1',
                    matricula: 'ABC-12-CD-001',
                    modelo: 'Corolla',
                    marca: 'Toyota',
                    cor: '#ffffff',
                    ano: 2022,
                    lugares: 4,
                    arCondicionado: true,
                    motoristaid: '1',
                    motoristanome: 'Carlos Silva',
                    status: 'ativa',
                    dataUltimaInspecao: '2024-12-01',
                    categoria: 'economica',
                    numeroViagens: 345,
                    kilometragem: 45000,
                    ultimaAtualizacao: new Date().toISOString(),
                },
            ],
            total: 1,
            pagina,
            limite,
            totalPaginas: 1,
        };

        return NextResponse.json({ success: true, data: dados });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_BUSCAR_VIATURAS', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}

// POST /api/viaturas
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const novaViatura = {
            id: '123',
            ...body,
            ultimaAtualizacao: new Date().toISOString(),
        };
        return NextResponse.json({ success: true, data: novaViatura }, { status: 201 });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_CRIAR_VIATURA', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}