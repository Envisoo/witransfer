import React from 'react';

interface LoadingSpinnerProps {
  tamanho?: 'sm' | 'md' | 'lg';
  texto?: string;
  fullHeight?: boolean;
}

const tamanhoClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  tamanho = 'md',
  texto = 'Carregando...',
  fullHeight = false,
}) => {
  const container = fullHeight ? 'h-screen' : 'py-8';

  return (
    <div className={`flex flex-col items-center justify-center ${container}`}>
      <div
        className={`
          animate-spin rounded-full border-4 border-gray-300 
          border-t-teal-600 ${tamanhoClasses[tamanho]}
        `}
      />
      {texto && <p className="mt-4 text-gray-600 font-medium">{texto}</p>}
    </div>
  );
};

export default LoadingSpinner;