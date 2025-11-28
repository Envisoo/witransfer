import { Cliente } from '@/types/cliente';
import { ClientAdvanced, ClientScore, ClientSegment, ClientLoyalty, ClientPattern, ClientNote } from '@/types/clienteAvancado';

// Mock data generator
export const generateClientAdvancedData = (cliente: Cliente): ClientAdvanced => {
    const id = cliente.id;
    const viagensTotal = cliente.numeroViagens || 0;
    const avaliacao = cliente.avaliacaoMedia || 0;

    // Calcular score
    const score: ClientScore = {
        satisfacao: Math.min(100, avaliacao * 20), // 0-5 -> 0-100
        valor: Math.min(100, (viagensTotal / 100) * 100), // baseado em viagens
        engajamento: cliente.status === 'ativo' ? 75 + Math.random() * 25 : 30,
        risco: cliente.status === 'ativo' ? Math.random() * 30 : 70 + Math.random() * 30,
    };

    // Determinar segmento
    let segmento: ClientSegment;
    if (viagensTotal > 50 && avaliacao > 4.5) {
        segmento = { tipo: 'vip', label: 'VIP', cor: 'purple' };
    } else if (viagensTotal > 20) {
        segmento = { tipo: 'recorrente', label: 'Recorrente', cor: 'blue' };
    } else if (viagensTotal < 5) {
        segmento = { tipo: 'novo', label: 'Novo', cor: 'green' };
    } else if (cliente.status === 'inativo') {
        segmento = { tipo: 'inativo', label: 'Inativo', cor: 'gray' };
    } else if (score.risco > 60) {
        segmento = { tipo: 'risco', label: 'Em Risco', cor: 'red' };
    } else {
        segmento = { tipo: 'ocasional', label: 'Ocasional', cor: 'yellow' };
    }

    // Sistema de fidelidade
    const pontos = viagensTotal * 100 + Math.floor(Math.random() * 1000);
    let nivel: 'bronze' | 'prata' | 'ouro' | 'platina' = 'bronze';
    let pontosParaProximo = 5000 - pontos;
    let proximoNivel = 'Prata';
    let beneficios = ['5% desconto em viagens'];

    if (pontos >= 20000) {
        nivel = 'platina';
        pontosParaProximo = 0;
        proximoNivel = 'Máximo';
        beneficios = ['20% desconto', 'Prioridade máxima', 'Suporte VIP', 'Upgrade grátis'];
    } else if (pontos >= 10000) {
        nivel = 'ouro';
        pontosParaProximo = 20000 - pontos;
        proximoNivel = 'Platina';
        beneficios = ['15% desconto', 'Prioridade alta', 'Cancelamento grátis'];
    } else if (pontos >= 5000) {
        nivel = 'prata';
        pontosParaProximo = 10000 - pontos;
        proximoNivel = 'Ouro';
        beneficios = ['10% desconto', 'Prioridade normal'];
    }

    const fidelidade: ClientLoyalty = {
        pontos,
        nivel,
        proximoNivel,
        pontosParaProximo,
        beneficios,
    };

    // Padrões de uso
    const horarios = ['06h-09h', '09h-12h', '12h-15h', '15h-18h', '18h-21h'];
    const categorias = ['Económico', 'Conforto', 'Executivo', 'Van'];
    const trajetos = [
        'Talatona → Centro',
        'Maianga → Kilamba',
        'Benfica → Ingombota',
        'Samba → Viana',
    ];

    const padroes: ClientPattern = {
        frequenciaMedia: viagensTotal > 0 ? viagensTotal / 12 : 0, // por mês
        horarioPreferido: horarios[Math.floor(Math.random() * horarios.length)],
        categoriaVeiculoPreferida: categorias[Math.floor(Math.random() * categorias.length)],
        trajetoFavorito: trajetos[Math.floor(Math.random() * trajetos.length)],
        gastoMedio: 2500 + Math.floor(Math.random() * 3000),
        ultimaViagem: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        diasSemViagem: Math.floor(Math.random() * 30),
    };

    // Notas internas
    const notas: ClientNote[] = [];
    if (segmento.tipo === 'vip') {
        notas.push({
            id: '1',
            autor: 'Admin',
            data: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            texto: 'Cliente VIP com excelente histórico. Sempre pontual nos pagamentos.',
            tipo: 'success',
        });
    }
    if (score.risco > 60) {
        notas.push({
            id: '2',
            autor: 'Sistema',
            data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            texto: 'Alerta: Cliente não realiza viagens há mais de 15 dias. Considerar envio de promoção.',
            tipo: 'warning',
        });
    }

    return {
        id,
        score,
        segmento,
        fidelidade,
        padroes,
        notas,
        documentosVerificados: Math.random() > 0.3,
        emailVerificado: Math.random() > 0.2,
        telefoneVerificado: Math.random() > 0.1,
        metodosPagamento: Math.floor(Math.random() * 3) + 1,
        saldoCredito: Math.floor(Math.random() * 50000),
        ticketsAbertos: Math.floor(Math.random() * 3),
        ticketsResolvidos: Math.floor(Math.random() * 10) + 5,
    };
};

