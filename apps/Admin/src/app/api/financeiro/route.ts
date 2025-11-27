import { NextRequest, NextResponse } from 'next/server';

// GET /api/financeiro/dashboard
export async function GET(_request: NextRequest) {
    try {
        // TODO: Conectar com banco de dados real
        const dados = {
            receita: 1250000,
            pagamentos: 1062500,
            taxas: 187500,
            despesas: 50000,
            lucroLiquido: 1000000,
            percentualVariacao: 12.5,
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
                    code: 'ERRO_BUSCAR_FINANCEIRO',
                    message: erro.message,
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}