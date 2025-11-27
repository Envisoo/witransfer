import { NextRequest, NextResponse } from 'next/server';

// GET /api/relatorios/viagens
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tipo = searchParams.get('tipo'); // viagens, faturamento, desempenho

        // TODO: Conectar com banco de dados real e filtrar por datas

        if (tipo === 'desempenho') {
            const dados = {
                motoristas: {
                    maisViagens: [
                        { motoristaId: '1', motoristaNome: 'Carlos Silva', numeroViagens: 345 },
                        { motoristaId: '2', motoristaNome: 'João Santos', numeroViagens: 298 },
                        { motoristaId: '3', motoristaNome: 'Maria Costa', numeroViagens: 267 },
                    ],
                    melhorAvaliados: [
                        { motoristaId: '1', motoristaNome: 'Carlos Silva', avaliacao: 4.9 },
                        { motoristaId: '2', motoristaNome: 'João Santos', avaliacao: 4.8 },
                        { motoristaId: '3', motoristaNome: 'Maria Costa', avaliacao: 4.7 },
                    ],
                },
                clientes: {
                    maisFrequentes: [
                        { clienteId: '1', clienteNome: 'Empresa X', numeroViagens: 125 },
                        { clienteId: '2', clienteNome: 'Empresa Y', numeroViagens: 98 },
                    ],
                },
                taxaCancelamento: 0.05,
                satisfacao: 0.92,
            };

            return NextResponse.json({
                success: true,
                data: dados,
            });
        }

        const dados = {
            total: 1250,
            porMotorista: [
                { motoristaId: '1', motoristaNome: 'Carlos Silva', numeroViagens: 345, avaliacaoMedia: 4.9 },
            ],
            porCliente: [
                { clienteId: '1', clienteNome: 'João Silva', numeroViagens: 12, gastoPorMes: 600000 },
            ],
            distanciaTotal: 12500,
            tempoMedio: 25,
            graficos: [],
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
                    code: 'ERRO_BUSCAR_RELATORIOS',
                    message: erro.message,
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}