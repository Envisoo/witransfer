import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
  carregando?: boolean;
}

const Paginacao: React.FC<PaginacaoProps> = ({
  paginaAtual,
  totalPaginas,
  onMudarPagina,
  carregando = false,
}) => {
  const paginas = [];
  const inicio = Math.max(1, paginaAtual - 2);
  const fim = Math.min(totalPaginas, paginaAtual + 2);

  for (let i = inicio; i <= fim; i++) {
    paginas.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Botão Anterior */}
      <button
        onClick={() => onMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1 || carregando}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      {/* Primeira página (se não estiver visível) */}
      {inicio > 1 && (
        <>
          <button
            onClick={() => onMudarPagina(1)}
            className="px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={carregando}
          >
            1
          </button>
          {inicio > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {/* Números das páginas */}
      {paginas.map((pagina) => (
        <button
          key={pagina}
          onClick={() => onMudarPagina(pagina)}
          className={`
            px-3 py-2 rounded-lg transition-colors
            ${
              pagina === paginaAtual
                ? 'bg-teal-600 text-white font-semibold'
                : 'hover:bg-gray-100'
            }
          `}
          disabled={carregando}
        >
          {pagina}
        </button>
      ))}

      {/* Última página (se não estiver visível) */}
      {fim < totalPaginas && (
        <>
          {fim < totalPaginas - 1 && <span className="text-gray-500">...</span>}
          <button
            onClick={() => onMudarPagina(totalPaginas)}
            className="px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={carregando}
          >
            {totalPaginas}
          </button>
        </>
      )}

      {/* Botão Próximo */}
      <button
        onClick={() => onMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas || carregando}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

export default Paginacao;