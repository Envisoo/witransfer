import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
    try {
        // TODO: Implementar lógica real de faturamento
        const dados = {
            faturamentoTotal: 0,
            transacoes: [],
        };

        return NextResponse.json({
            success: true,
            data: dados,
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
