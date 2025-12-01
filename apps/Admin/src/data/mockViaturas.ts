import { Viatura } from "@/types/viatura";

export const mockViaturas: Viatura[] = [
  {
    id: "1",
    matricula: "LD-00-00",
    modelo: "Toyota Corolla",
    marca: "Toyota",
    cor: "Branco",
    ano: 2022,
    lugares: 4,
    arCondicionado: true,
    motoristaid: "1",
    motoristanome: "João Silva",
    status: "ativa",
    dataUltimaInspecao: "2023-10-15",
    categoria: "conforto",
    numeroViagens: 124,
    kilometragem: 25000,
    ultimaAtualizacao: "2023-11-20T10:30:00Z",
    historico: [
      {
        id: "1",
        tipo: "manutencao",
        titulo: "Troca de óleo e filtros",
        data: "2023-10-15T09:00:00Z",
        descricao: "Troca de óleo do motor e filtros de ar e óleo",
        custo: 350.00,
        quilometragem: 24000
      },
      {
        id: "2",
        tipo: "inspecao",
        titulo: "Inspeção periódica",
        data: "2023-07-10T14:30:00Z",
        descricao: "Inspeção de segurança e itens de desgaste",
        custo: 150.00,
        quilometragem: 18000
      }
    ]
  },
  {
    id: "2",
    matricula: "LD-11-11",
    modelo: "Hyundai HB20",
    marca: "Hyundai",
    cor: "Prata",
    ano: 2021,
    lugares: 4,
    arCondicionado: true,
    motoristaid: "2",
    motoristanome: "Maria Santos",
    status: "ativa",
    dataUltimaInspecao: "2023-09-10",
    categoria: "economica",
    numeroViagens: 98,
    kilometragem: 32000,
    ultimaAtualizacao: "2023-11-18T14:45:00Z",
    historico: [
      {
        id: "3",
        tipo: "manutencao",
        titulo: "Troca de pastilhas de freio",
        data: "2023-09-05T11:15:00Z",
        descricao: "Substituição das pastilhas de freio dianteiras",
        custo: 280.00,
        quilometragem: 30000
      },
      {
        id: "4",
        tipo: "inspecao",
        titulo: "Alinhamento e balanceamento",
        data: "2023-06-20T10:00:00Z",
        descricao: "Alinhamento e balanceamento das rodas",
        custo: 120.00,
        quilometragem: 25000
      }
    ]
  },
  {
    id: "3",
    matricula: "LD-22-22",
    modelo: "Honda Civic",
    marca: "Honda",
    cor: "Preto",
    ano: 2023,
    lugares: 4,
    arCondicionado: true,
    motoristaid: "3",
    motoristanome: "Carlos Oliveira",
    status: "inativa",
    dataUltimaInspecao: "2023-11-05",
    categoria: "premium",
    numeroViagens: 45,
    kilometragem: 12000,
    ultimaAtualizacao: "2023-11-19T09:15:00Z",
    historico: [
      {
        id: "5",
        tipo: "manutencao",
        titulo: "Revisão completa",
        data: "2023-11-01T08:45:00Z",
        descricao: "Revisão completa dos 10.000 km",
        custo: 420.00,
        quilometragem: 10000
      },
      {
        id: "6",
        tipo: "manutencao",
        titulo: "Troca de pneus",
        data: "2023-08-15T13:20:00Z",
        descricao: "Substituição dos pneus traseiros",
        custo: 800.00,
        quilometragem: 5000
      }
    ]
  },
  {
    id: "4",
    matricula: "LD-33-33",
    modelo: "Toyota Hiace",
    marca: "Toyota",
    cor: "Azul",
    ano: 2022,
    lugares: 12,
    arCondicionado: true,
    motoristaid: "4",
    motoristanome: "Ana Pereira",
    status: "manutencao",
    dataUltimaInspecao: "2023-08-20",
    categoria: "van",
    numeroViagens: 76,
    kilometragem: 45000,
    ultimaAtualizacao: "2023-11-17T16:20:00Z",
    historico: [
      {
        id: "7",
        tipo: "manutencao",
        titulo: "Reparo no sistema de ar condicionado",
        data: "2023-11-10T10:30:00Z",
        descricao: "Conserto do compressor e recarga de gás",
        custo: 650.00,
        quilometragem: 42000
      },
      {
        id: "8",
        tipo: "inspecao",
        titulo: "Inspeção de segurança",
        data: "2023-09-25T15:45:00Z",
        descricao: "Verificação de itens de segurança",
        custo: 180.00,
        quilometragem: 38000
      }
    ]
  },
  {
    id: "5",
    matricula: "LD-44-44",
    modelo: "Nissan March",
    marca: "Nissan",
    cor: "Vermelho",
    ano: 2021,
    lugares: 4,
    arCondicionado: false,
    motoristaid: "5",
    motoristanome: "Pedro Costa",
    status: "inspecao",
    dataUltimaInspecao: "2023-07-15",
    categoria: "economica",
    numeroViagens: 132,
    kilometragem: 38000,
    ultimaAtualizacao: "2023-11-16T11:10:00Z",
    historico: [
      {
        id: "9",
        tipo: "manutencao",
        titulo: "Revisão dos 30.000 km",
        data: "2023-11-05T09:30:00Z",
        descricao: "Revisão completa dos 30.000 km",
        custo: 520.00,
        quilometragem: 30000
      },
      {
        id: "10",
        tipo: "manutencao",
        titulo: "Substituição da correia dentada",
        data: "2023-07-10T14:00:00Z",
        descricao: "Troca da correia dentada e tensor",
        custo: 380.00,
        quilometragem: 25000
      }
    ]
  }
];
