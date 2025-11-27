import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  erro?: string;
  ajuda?: string;
  opcoes: SelectOption[];
  opcaoVazia?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      erro,
      ajuda,
      opcoes,
      opcaoVazia = 'Selecione uma opção',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="form-label">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}

        <select
          ref={ref}
          className={`
            form-input
            ${erro ? 'border-red-500 focus:border-red-600 focus:ring-red-600' : ''}
            ${className}
          `}
          {...props}
        >
          {opcaoVazia && <option value="">{opcaoVazia}</option>}
          {opcoes.map((opcao) => (
            <option key={opcao.value} value={opcao.value}>
              {opcao.label}
            </option>
          ))}
        </select>

        {erro && <p className="form-error">{erro}</p>}
        {ajuda && !erro && <p className="form-help">{ajuda}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;