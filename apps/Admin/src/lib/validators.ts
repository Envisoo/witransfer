export const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validarTelefone = (telefone: string): boolean => {
    const cleaned = telefone.replace(/\D/g, '');
    return cleaned.length === 9;
};

export const validarCPF = (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.length === 14;
};

export const validarDocumentoAngola = (documento: string): boolean => {
    // Validação simples para Angola - BI: 9 dígitos ou 9 caracteres
    const cleaned = documento.replace(/\D/g, '');
    return cleaned.length >= 6 && cleaned.length <= 14;
};

export const validarCartaConducao = (carta: string): boolean => {
    // Validação simples para carta de condução
    return carta.length >= 8 && carta.length <= 12;
};

export const validarMatricula = (matricula: string): boolean => {
    // Matrícula Angola: ABC-12-CD-123 ou formato similar
    const regex = /^[A-Z]{2,3}-\d{2}-[A-Z]{2}-\d{3}$/;
    return regex.test(matricula.toUpperCase());
};

export const validarSenha = (senha: string): boolean => {
    // Mínimo 8 caracteres, 1 maiúscula, 1 número
    return (
        senha.length >= 8 &&
        /[A-Z]/.test(senha) &&
        /[0-9]/.test(senha) &&
        /[!@#$%^&*]/.test(senha)
    );
};

export const validarData = (data: string | Date): boolean => {
    const d = new Date(data);
    return d instanceof Date && !isNaN(d.getTime());
};

export const validarURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const validarIdade = (data: string, idadeMinima: number = 18): boolean => {
    const hoje = new Date();
    const nascimento = new Date(data);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= idadeMinima;
};

export const validarFuturaDia = (data: string): boolean => {
    const d = new Date(data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return d >= hoje;
};

export const validarNumero = (valor: any): boolean => {
    return typeof valor === 'number' && !isNaN(valor);
};

export const validarPositivo = (valor: number): boolean => {
    return validarNumero(valor) && valor > 0;
};

export const validarRangeNumerico = (
    valor: number,
    minimo: number,
    maximo: number
): boolean => {
    return validarNumero(valor) && valor >= minimo && valor <= maximo;
};

export const validarComprimentoString = (
    texto: string,
    minimo: number,
    maximo: number
): boolean => {
    return texto.length >= minimo && texto.length <= maximo;
};

export const validarNomeUsuario = (nome: string): boolean => {
    // Apenas letras, números, hífen e sublinhado, 3-20 caracteres
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(nome);
};

export const validarCor = (cor: string): boolean => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return regex.test(cor);
};

export const validarJSON = (texto: string): boolean => {
    try {
        JSON.parse(texto);
        return true;
    } catch {
        return false;
    }
};

export const mensagenErroValidacao = {
    email: 'E-mail inválido',
    telefone: 'Telefone deve conter 9 dígitos',
    cpf: 'CPF deve conter 14 dígitos',
    documento: 'Documento inválido',
    cartaConducao: 'Carta de condução inválida',
    matricula: 'Matrícula deve estar no formato ABC-12-CD-123',
    senha: 'Senha deve ter mínimo 8 caracteres, 1 maiúscula, 1 número e 1 caractere especial',
    data: 'Data inválida',
    url: 'URL inválida',
    idade: 'Idade mínima não atingida',
    futuro: 'A data deve ser no futuro',
    numero: 'Valor deve ser um número',
    positivo: 'Valor deve ser positivo',
    nome: 'Nome deve ter entre 3 e 100 caracteres',
    username: 'Usuário deve ter entre 3 e 20 caracteres (apenas letras, números, hífen e sublinhado)',
    cor: 'Cor inválida',
    json: 'JSON inválido',
};