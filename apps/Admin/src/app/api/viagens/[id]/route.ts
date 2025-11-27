import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        // TODO: Buscar viagem pelo ID no banco de dados
        const viagem = {
            id,
            origem: 'Luanda',
            destino: 'Viana',
            data: new Date().toISOString(),
            status: 'concluida',
        };

        return NextResponse.json({
            success: true,
            data: viagem,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await request.json();

        // TODO: Atualizar viagem no banco de dados

        return NextResponse.json({
            success: true,
            data: { id, ...body },
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
