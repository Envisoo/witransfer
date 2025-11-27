import { NextRequest, NextResponse } from 'next/server';

// GET /api/motoristas
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
                    nome: 'Carlos Silva',
                    email: 'carlos@email.com',
                    telefone: '923456789',
                    status: 'online',
                    viaturaModelo: 'Toyota Corolla',
                    numeroViagens: 156,
                    avaliacao: 4.7,
                    ganhoTotal: 250000,
                    ganhoMes: 45000,
                    dataInicio: '2023-06-15',
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
                error: {
                    code: 'ERRO_BUSCAR_MOTORISTAS',
                    message: erro.message,
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}

// POST /api/motoristas
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const novoMotorista = {
            id: '123',
            ...body,
            dataInicio: body.dataInicio || new Date().toISOString(),
            ultimaAtualizacao: new Date().toISOString(),
        };
        return NextResponse.json({ success: true, data: novoMotorista }, { status: 201 });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'ERRO_CRIAR_MOTORISTA',
                    message: erro.message,
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}

// DELETE /api/motoristas
export async function DELETE() {
    try {
        // In a real API we would get the id from the route params.
        // Here we simply return a static success message.
        return NextResponse.json({
            success: true,
            message: 'Motorista deletado com sucesso',
        });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'ERRO_DELETAR_MOTORISTA',
                    message: erro.message,
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}