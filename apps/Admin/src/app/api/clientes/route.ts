import { NextRequest, NextResponse } from 'next/server';

// GET /api/clientes
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const pagina = parseInt(searchParams.get('pagina') || '1');
        const limite = parseInt(searchParams.get('limite') || '10');
        // Static data for demonstration
        const dados = {
            data: [
                {
                    id: '1',
                    nome: 'João Silva',
                    email: 'joao@email.com',
                    telefone: '923456789',
                    status: 'ativo',
                    dataCadastro: '2024-12-01',
                    numeroViagens: 15,
                    avaliacaoMedia: 4.8,
                },
                {
                    id: '2',
                    nome: 'Maria Santos',
                    email: 'maria@email.com',
                    telefone: '924567890',
                    status: 'ativo',
                    dataCadastro: '2024-12-05',
                    numeroViagens: 8,
                    avaliacaoMedia: 4.9,
                },
            ],
            total: 2,
            pagina,
            limite,
            totalPaginas: 1,
        };
        return NextResponse.json({ success: true, data: dados });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_BUSCAR_CLIENTES', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}

// POST /api/clientes
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        // Static creation response
        const novoCliente = {
            id: '123',
            ...body,
            dataCadastro: new Date().toISOString(),
        };
        return NextResponse.json({ success: true, data: novoCliente }, { status: 201 });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_CRIAR_CLIENTE', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}