import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'teodorop@gmail.com';
const ADMIN_SENHA = '123456';

// POST /api/auth/login
export async function POST(request: NextRequest) {
    try {
        const { email, senha } = await request.json();

        // Validação simples de credenciais (mock)
        if (email !== ADMIN_EMAIL || senha !== ADMIN_SENHA) {
            throw new Error('Credenciais inválidas');
        }

        // TODO: Validar credenciais no banco de dados
        // TODO: Gerar JWT token

        // Mock response
        const usuario = {
            id: '1',
            nome: 'Administrador',
            email: ADMIN_EMAIL,
            telefone: '923456789',
            papel: 'admin',
            ativo: true,
            dataCriacao: '2024-12-01',
        };

        const token = 'token_jwt_aqui'; // TODO: Gerar token real

        return NextResponse.json(
            {
                success: true,
                data: {
                    token: {
                        access_token: token,
                        tipo_token: 'Bearer',
                        expires_in: 86400,
                    },
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
                    message: 'Credenciais inválidas',
                    status: 401,
                },
            },
            { status: 401 }
        );
    }
}

// GET /api/auth/me
export async function GET(_request: NextRequest) {
    try {
        // TODO: Verificar token JWT
        const usuario = {
            id: '1',
            nome: 'Administrador',
            email: ADMIN_EMAIL,
            telefone: '923456789',
            papel: 'admin',
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