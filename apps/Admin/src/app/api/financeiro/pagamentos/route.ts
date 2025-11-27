import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        dados: [],
        total: 0,
        pagina: 1,
        totalPaginas: 0
    });
}

export async function POST() {
    return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}
