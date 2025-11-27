# TaxiGest Angola - Sistema de Gestão de Transporte

Sistema completo de gestão de táxis e transporte desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🚀 Características

- ✅ **Dashboard Principal**: Visão geral com métricas em tempo real
- ✅ **Gestão de Clientes**: CRUD completo com filtros e buscas
- ✅ **Gestão de Motoristas**: Cadastro, edição e gerenciamento de status
- ✅ **Gestão de Viaturas**: Controle de frota com categorias
- ✅ **Gestão de Viagens**: Monitoramento em tempo real
- ✅ **Controlo Financeiro**: Relatórios de receita e pagamentos
- ✅ **Relatórios**: Análises de desempenho e faturamento
- ✅ **Notificações**: Sistema de e-mails automáticos
- ✅ **Configurações**: Personalização do sistema

## 🛠 Tecnologias Utilizadas

- **Next.js 14**: Framework React com SSR
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Estilização utilitária
- **Recharts**: Gráficos interativos
- **React Hot Toast**: Notificações
- **Axios**: Cliente HTTP
- **Zustand**: Gerenciamento de estado

## 📋 Pré-requisitos

- Node.js 18.17+
- npm 9+ ou yarn

## 🔧 Instalação Rápida

```bash
# 1. Clonar ou criar o projeto
git clone <seu-repositorio>
cd taxigest-angola

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
taxigest-angola/
├── src/
│   ├── app/                    # Páginas (App Router)
│   ├── components/             # Componentes React
│   ├── lib/                    # Funções auxiliares
│   ├── hooks/                  # Custom Hooks
│   ├── services/               # Serviços API
│   ├── types/                  # Tipos TypeScript
│   └── utils/                  # Utilitários
├── public/                     # Arquivos estáticos
├── next.config.js             # Configuração Next.js
├── tailwind.config.ts         # Configuração Tailwind
├── tsconfig.json              # Configuração TypeScript
└── package.json               # Dependências
```

## 🔑 Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=TaxiGest Angola
NEXT_PUBLIC_APP_VERSION=1.0.0

# Regional Configuration
NEXT_PUBLIC_MOEDA=AOA
NEXT_PUBLIC_PAIS=Angola
NEXT_PUBLIC_TIMEZONE=Africa/Luanda
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor de dev

# Build
npm run build           # Build para produção
npm start              # Iniciar servidor de produção

# Linting
npm run lint           # Verificar code quality
npm run lint:fix       # Corrigir automaticamente

# Type checking
npm run type-check     # Verificar tipos TypeScript

# Testing
npm test              # Executar testes
npm run test:watch   # Testes em watch mode
```

## 🎨 Padrões de Código

### Componentes

Todos os componentes devem ter:
- Tipos TypeScript apropriados
- Props documentadas
- Uso de `forwardRef` quando necessário
- Classe `use client` se forem Client Components

```typescript
'use client';

import React from 'react';

interface MeuComponenteProps {
  titulo: string;
  children: React.ReactNode;
}

const MeuComponente: React.FC<MeuComponenteProps> = ({ titulo, children }) => {
  return (
    <div>
      <h1>{titulo}</h1>
      {children}
    </div>
  );
};

export default MeuComponente;
```

### Serviços

Sempre usar `apiClient` para requisições:

```typescript
import { apiClient } from '@/lib/api';

export const meuService = {
  listar: async () => {
    return apiClient.get('/endpoint');
  },
  
  criar: async (dados) => {
    return apiClient.post('/endpoint', dados);
  },
};
```

### Hooks Customizados

Padrão para hooks:

```typescript
'use client';

import { useState, useCallback } from 'react';

export const useMeuHook = () => {
  const [estado, setEstado] = useState(null);
  
  const funcao = useCallback(() => {
    // lógica
  }, []);
  
  return { estado, funcao };
};
```

## 🔐 Autenticação

O projeto inclui autenticação com:
- Login/Logout
- Token JWT
- Persistência no localStorage
- Interceptors automáticos

Use o hook `useAuth()`:

```typescript
const { usuario, autenticado, login, logout } = useAuth();
```

## 🎯 Páginas Disponíveis

- `/` - Home (redireciona para dashboard ou login)
- `/dashboard` - Dashboard Principal
- `/clientes` - Gestão de Clientes
- `/motoristas` - Gestão de Motoristas
- `/viaturas` - Gestão de Viaturas
- `/viagens` - Gestão de Viagens
- `/financeiro` - Controlo Financeiro
- `/relatorios` - Relatórios
- `/notificacoes` - Notificações
- `/configuracoes` - Configurações

## 🧩 Componentes Disponíveis

### Common
- `Button` - Botão reutilizável
- `Input` - Campo de entrada
- `Modal` - Modal dialog
- `Badge` - Badges de status
- `LoadingSpinner` - Indicador de carregamento
- `Select` - Dropdown select
- `Toast` - Notificação toast

### Layout
- `MainLayout` - Layout principal
- `Header` - Cabeçalho
- `Sidebar` - Menu lateral

## 🔨 Desenvolvimento

### Adicionar Nova Página

1. Crie a pasta: `src/app/novo-modulo/`
2. Crie `page.tsx`:

```typescript
'use client';

import MainLayout from '@/components/layout/MainLayout';

export default function NovoModulo() {
  return (
    <MainLayout titulo="Novo Módulo">
      {/* Conteúdo aqui */}
    </MainLayout>
  );
}
```

### Adicionar Novo Serviço

1. Crie: `src/services/novoService.ts`
2. Use `apiClient` para requisições
3. Exporte as funções

### Adicionar Novo Hook

1. Crie: `src/hooks/useMeuHook.ts`
2. Adicione `'use client'` no topo
3. Exporte o hook

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
rm -rf .next
npm run dev
```

### Tailwind não funciona
```bash
npm run build
```

### Porta em uso
```bash
npm run dev -- -p 3001
```

## 📚 Recursos Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org)
- [React Hot Toast](https://react-hot-toast.com)

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/MinhaFeature`
2. Faça commit: `git commit -m 'Add MinhaFeature'`
3. Push: `git push origin feature/MinhaFeature`
4. Abra um Pull Request

## 📄 Licença

MIT License - veja LICENSE.md para detalhes

## 👨‍💼 Suporte

Para suporte e dúvidas:
- Email: suporte@taxigest.ao
- WhatsApp: +244 9XX XXX XXX

## 🌍 Sobre

**TaxiGest Angola** é um sistema de gestão de transporte desenvolvido para o mercado angolano, com suporte completo a:

- ✅ Moeda: AOA (Kwanza Angolano)
- ✅ Idioma: Português Angolano
- ✅ Fuso horário: Africa/Luanda
- ✅ Formatos locais: DD/MM/YYYY

**Desenvolvido com ❤️ para Angola**

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024