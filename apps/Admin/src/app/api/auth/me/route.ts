import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'teodorop@gmail.com';

// GET /api/auth/me
export async function GET(_request: NextRequest) {
  try {
    const usuario = {
      id: '1',
      nome: 'Administrador',
      email: ADMIN_EMAIL,
      telefone: '923456789',
      papel: 'admin' as const,
      ativo: true,
      dataCriacao: '2024-12-01',
    };

    return NextResponse.json({
      success: true,
      data: usuario,
    });
  } catch (erro: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'ERRO_AUTENTICACAO',
          message: 'Não autenticado',
          status: 401,
        },
      },
      { status: 401 }
    );
  }
}
