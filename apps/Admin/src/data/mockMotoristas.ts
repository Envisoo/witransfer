import { Motorista } from '@/types/motorista';

export const mockMotoristas: Motorista[] = [
    {
        id: '1',
        // A) Dados Pessoais
        nome: 'João Paulo Silva',
        nomeApelido: 'JP',
        dataNascimento: '1985-05-15',
        sexo: 'Masculino',
        nacionalidade: 'Angolana',
        nif: '123456789',
        numeroDocumento: '001234567LA032',
        endereco: 'Rua da Samba, Bairro Operário',
        cidade: 'Luanda',
        provincia: 'Luanda',
        telefone: '923456789',
        telefoneAlternativo: '912345678',
        email: 'joao.silva@email.com',
        fotoPerfil: undefined,

        // B) Documentação
        cartaConducao: 'L-1234567',
        dataEmissaoCarta: '2010-03-20',
        dataValidadeCarta: '2026-03-20',
        cartaProfissional: true,
        antecedentesUrl: undefined,
        documentoMedicoUrl: undefined,
        fotoBI: undefined,
        fotoCarta: undefined,

        // C) Informações Profissionais
        experienciaAnos: 15,
        idiomasFalados: ['Português', 'Inglês', 'Kimbundu'],
        disponibilidade: 'Ativo',
        dataInicio: '2023-01-10',
        turno: 'Diurno',

        // Viatura
        viaturaId: 'v1',
        viaturaModelo: 'Toyota Corolla',

        // F) Segurança & Avaliação
        pontuacao: 4.8,
        numeroAdvertencias: 0,
        historicoAcidentes: [],
        infracoesTransito: [],

        // G) Observações
        notasInternas: 'Motorista exemplar, sempre pontual e educado.',
        comportamento: 'Excelente relacionamento com clientes.',
        recomendacoes: 'Indicado para viagens VIP.',
        restricoesMedicas: undefined,

        // Performance
        kmConduzidos: 45000,
        consumoMedio: 7.5,
        numeroViagens: 150,
        pontualidade: 98,
        reclamacoes: 0,

        // Financeiro
        ganhoTotal: 450000,
        ganhoMes: 50000,
        comissoes: 15000,
        descontos: 500,
        pagamentosRealizados: 10,

        // Sistema
        status: 'online',
        avaliacao: 4.8,
        ultimaAtualizacao: '2023-11-25T10:00:00Z',
    },
    {
        id: '2',
        // A) Dados Pessoais
        nome: 'Maria Fernanda Costa',
        nomeApelido: 'Mafe',
        dataNascimento: '1990-08-20',
        sexo: 'Feminino',
        nacionalidade: 'Angolana',
        nif: '987654321',
        numeroDocumento: '007654321LA045',
        endereco: 'Avenida Brasil, Maianga',
        cidade: 'Luanda',
        provincia: 'Luanda',
        telefone: '912345678',
        telefoneAlternativo: undefined,
        email: 'maria.costa@email.com',
        fotoPerfil: undefined,

        // B) Documentação
        cartaConducao: 'L-7654321',
        dataEmissaoCarta: '2015-06-10',
        dataValidadeCarta: '2025-06-10',
        cartaProfissional: true,
        antecedentesUrl: undefined,
        documentoMedicoUrl: undefined,
        fotoBI: undefined,
        fotoCarta: undefined,

        // C) Informações Profissionais
        experienciaAnos: 8,
        idiomasFalados: ['Português', 'Francês'],
        disponibilidade: 'Ativo',
        dataInicio: '2023-03-15',
        turno: 'Noturno',

        // Viatura
        viaturaId: 'v2',
        viaturaModelo: 'Hyundai i10',

        // F) Segurança & Avaliação
        pontuacao: 4.9,
        numeroAdvertencias: 0,
        historicoAcidentes: [],
        infracoesTransito: [],

        // G) Observações
        notasInternas: 'Motorista com excelente avaliação.',
        comportamento: 'Muito profissional e cuidadosa.',
        recomendacoes: 'Ótima para clientes femininas.',
        restricoesMedicas: undefined,

        // Performance
        kmConduzidos: 28000,
        consumoMedio: 6.8,
        numeroViagens: 85,
        pontualidade: 99,
        reclamacoes: 0,

        // Financeiro
        ganhoTotal: 280000,
        ganhoMes: 35000,
        comissoes: 10500,
        descontos: 0,
        pagamentosRealizados: 8,

        // Sistema
        status: 'offline',
        avaliacao: 4.9,
        ultimaAtualizacao: '2023-11-24T18:30:00Z',
    },
    {
        id: '3',
        // A) Dados Pessoais
        nome: 'Carlos Eduardo Santos',
        nomeApelido: 'Cadú',
        dataNascimento: '1982-12-05',
        sexo: 'Masculino',
        nacionalidade: 'Angolana',
        nif: '456789123',
        numeroDocumento: '009876543LA012',
        endereco: 'Rua Direita, Viana',
        cidade: 'Viana',
        provincia: 'Luanda',
        telefone: '934567890',
        telefoneAlternativo: '923567890',
        email: 'carlos.santos@email.com',
        fotoPerfil: undefined,

        // B) Documentação
        cartaConducao: 'L-9876543',
        dataEmissaoCarta: '2008-02-15',
        dataValidadeCarta: '2024-12-20', // A vencer em breve
        cartaProfissional: false,
        antecedentesUrl: undefined,
        documentoMedicoUrl: undefined,
        fotoBI: undefined,
        fotoCarta: undefined,

        // C) Informações Profissionais
        experienciaAnos: 20,
        idiomasFalados: ['Português', 'Umbundu'],
        disponibilidade: 'Inativo',
        dataInicio: '2022-11-01',
        turno: 'Diurno',

        // Viatura
        viaturaId: 'v3',
        viaturaModelo: 'Kia Picanto',

        // F) Segurança & Avaliação
        pontuacao: 3.5,
        numeroAdvertencias: 3,
        historicoAcidentes: [
            {
                id: 'a1',
                data: '2023-08-15',
                veiculo: 'Kia Picanto',
                gravidade: 'Leve',
                descricao: 'Colisão traseira em semáforo'
            }
        ],
        infracoesTransito: [
            {
                id: 'i1',
                data: '2023-05-10',
                tipo: 'Excesso de velocidade',
                multa: 5000,
                descricao: '20km/h acima do limite'
            },
            {
                id: 'i2',
                data: '2023-09-22',
                tipo: 'Estacionamento irregular',
                multa: 2000,
                descricao: 'Estacionado em local proibido'
            }
        ],

        // G) Observações
        notasInternas: 'Motorista com histórico de infrações. Necessita acompanhamento.',
        comportamento: 'Às vezes impaciente no trânsito.',
        recomendacoes: 'Treinamento de direção defensiva recomendado.',
        restricoesMedicas: undefined,

        // Performance
        kmConduzidos: 60000,
        consumoMedio: 8.2,
        numeroViagens: 200,
        pontualidade: 85,
        reclamacoes: 5,

        // Financeiro
        ganhoTotal: 600000,
        ganhoMes: 10000,
        comissoes: 18000,
        descontos: 12000, // Multas e danos
        pagamentosRealizados: 15,

        // Sistema
        status: 'suspenso',
        avaliacao: 3.5,
        ultimaAtualizacao: '2023-11-20T09:15:00Z',
    },
    {
        id: '4',
        // A) Dados Pessoais
        nome: 'Ana Beatriz Lima',
        nomeApelido: 'Bia',
        dataNascimento: '1995-02-28',
        sexo: 'Feminino',
        nacionalidade: 'Angolana',
        nif: '321654987',
        numeroDocumento: '005432167LA089',
        endereco: 'Rua da Paz, Talatona',
        cidade: 'Luanda',
        provincia: 'Luanda',
        telefone: '945678901',
        telefoneAlternativo: undefined,
        email: 'ana.lima@email.com',
        fotoPerfil: undefined,

        // B) Documentação
        cartaConducao: 'L-5432167',
        dataEmissaoCarta: '2018-11-05',
        dataValidadeCarta: '2028-11-05',
        cartaProfissional: true,
        antecedentesUrl: undefined,
        documentoMedicoUrl: undefined,
        fotoBI: undefined,
        fotoCarta: undefined,

        // C) Informações Profissionais
        experienciaAnos: 5,
        idiomasFalados: ['Português', 'Inglês', 'Espanhol'],
        disponibilidade: 'Ativo',
        dataInicio: '2023-06-20',
        turno: 'Vespertino',

        // Viatura
        viaturaId: 'v4',
        viaturaModelo: 'Suzuki Alto',

        // F) Segurança & Avaliação
        pontuacao: 4.7,
        numeroAdvertencias: 1,
        historicoAcidentes: [],
        infracoesTransito: [
            {
                id: 'i3',
                data: '2023-10-05',
                tipo: 'Semáforo vermelho',
                multa: 8000,
                descricao: 'Avançou sinal vermelho'
            }
        ],

        // G) Observações
        notasInternas: 'Jovem motorista com bom desempenho.',
        comportamento: 'Simpática e educada com os passageiros.',
        recomendacoes: 'Pode assumir mais responsabilidades.',
        restricoesMedicas: undefined,

        // Performance
        kmConduzidos: 35000,
        consumoMedio: 6.5,
        numeroViagens: 120,
        pontualidade: 96,
        reclamacoes: 1,

        // Financeiro
        ganhoTotal: 350000,
        ganhoMes: 42000,
        comissoes: 12600,
        descontos: 8000,
        pagamentosRealizados: 6,

        // Sistema
        status: 'online',
        avaliacao: 4.7,
        ultimaAtualizacao: '2023-11-25T11:45:00Z',
    },
    {
        id: '5',
        // A) Dados Pessoais
        nome: 'Pedro Henrique Oliveira',
        nomeApelido: 'Pedrinho',
        dataNascimento: '1988-10-10',
        sexo: 'Masculino',
        nacionalidade: 'Angolana',
        nif: '147258369',
        numeroDocumento: '002345678LA056',
        endereco: 'Avenida Comandante Gika, Maculusso',
        cidade: 'Luanda',
        provincia: 'Luanda',
        telefone: '956789012',
        telefoneAlternativo: '934567123',
        email: 'pedro.oliveira@email.com',
        fotoPerfil: undefined,

        // B) Documentação
        cartaConducao: 'L-2345678',
        dataEmissaoCarta: '2012-07-18',
        dataValidadeCarta: '2027-07-18',
        cartaProfissional: true,
        antecedentesUrl: undefined,
        documentoMedicoUrl: undefined,
        fotoBI: undefined,
        fotoCarta: undefined,

        // C) Informações Profissionais
        experienciaAnos: 12,
        idiomasFalados: ['Português', 'Inglês', 'Kikongo'],
        disponibilidade: 'Ativo',
        dataInicio: '2023-02-05',
        turno: 'Integral',

        // Viatura
        viaturaId: 'v5',
        viaturaModelo: 'Toyota Rav4',

        // F) Segurança & Avaliação
        pontuacao: 4.6,
        numeroAdvertencias: 0,
        historicoAcidentes: [],
        infracoesTransito: [],

        // G) Observações
        notasInternas: 'Motorista confiável e experiente.',
        comportamento: 'Calmo e profissional em todas as situações.',
        recomendacoes: 'Ideal para viagens longas e executivas.',
        restricoesMedicas: 'Usa óculos para dirigir',

        // Performance
        kmConduzidos: 52000,
        consumoMedio: 9.5,
        numeroViagens: 180,
        pontualidade: 97,
        reclamacoes: 0,

        // Financeiro
        ganhoTotal: 550000,
        ganhoMes: 60000,
        comissoes: 18000,
        descontos: 0,
        pagamentosRealizados: 12,

        // Sistema
        status: 'disponivel',
        avaliacao: 4.6,
        ultimaAtualizacao: '2023-11-25T08:20:00Z',
    }
];
