import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'teodorop@gmail.com';
const ADMIN_SENHA = '123456';

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json();

    if (email !== ADMIN_EMAIL || senha !== ADMIN_SENHA) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ERRO_LOGIN',
            message: 'Credenciais inválidas',
            status: 401,
          },
        },
        { status: 401 }
      );
    }

    const usuario = {
      id: '1',
      nome: 'Administrador',
      email: ADMIN_EMAIL,
      telefone: '923456789',
      papel: 'admin' as const,
      ativo: true,
      dataCriacao: '2024-12-01',
    };

    const token = {
      access_token: 'token_jwt_aqui',
      tipo_token: 'Bearer',
      expires_in: 86400,
    };

    return NextResponse.json(
      {
        success: true,
        data: {
          token,
          usuario,
        },
      },
      { status: 200 }
    );
  } catch (erro: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'ERRO_LOGIN',
          message: 'Erro ao processar login',
          status: 400,
        },
      },
      { status: 400 }
    );
  }
}
