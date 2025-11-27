import { NextRequest, NextResponse } from 'next/server';

// GET /api/clientes/[id]
export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // TODO: Buscar no banco de dados
        const cliente = {
            id,
            nome: 'João Silva',
            email: 'joao@email.com',
            telefone: '923456789',
            dataNascimento: '1990-05-15',
            endereco: 'Luanda, Angola',
            status: 'ativo',
            dataCadastro: '2024-12-01',
            numeroViagens: 15,
            avaliacaoMedia: 4.8,
            ultimaAtualizacao: new Date().toISOString(),
        };

        return NextResponse.json({ success: true, data: cliente });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_BUSCAR_CLIENTE', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}

// PUT /api/clientes/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        // TODO: Validar dados
        // TODO: Atualizar no banco de dados

        return NextResponse.json({
            success: true,
            data: { id, ...body, ultimaAtualizacao: new Date().toISOString() },
        });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_ATUALIZAR_CLIENTE', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}

// DELETE /api/clientes/[id]
export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // TODO: Deletar no banco de dados

        return NextResponse.json({ success: true, message: `Cliente ${id} deletado com sucesso` });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_DELETAR_CLIENTE', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}

// PATCH /api/clientes/[id]/suspender
export async function PATCH(
    // request is unused because we work with static data
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        // const body = await request.json(); // not needed for static response

        // TODO: Atualizar status no banco de dados

        return NextResponse.json({
            success: true,
            data: { id, status: 'suspenso', ultimaAtualizacao: new Date().toISOString() },
        });
    } catch (erro: any) {
        return NextResponse.json(
            {
                success: false,
                error: { code: 'ERRO_SUSPENDER_CLIENTE', message: erro.message, status: 500 },
            },
            { status: 500 }
        );
    }
}