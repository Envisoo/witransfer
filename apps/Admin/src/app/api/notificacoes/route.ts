import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
    try {
        // TODO: Buscar notificações do usuário
        const notificacoes = [
            {
                id: '1',
                titulo: 'Nova Viagem',
                mensagem: 'Você tem uma nova viagem agendada.',
                lida: false,
                data: new Date().toISOString(),
            },
            {
                id: '2',
                titulo: 'Pagamento Confirmado',
                mensagem: 'O pagamento da viagem #123 foi confirmado.',
                lida: true,
                data: new Date().toISOString(),
            },
        ];

        return NextResponse.json({
            success: true,
            data: notificacoes,
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // TODO: Criar nova notificação

        return NextResponse.json({
            success: true,
            data: { id: '3', ...body, data: new Date().toISOString() },
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