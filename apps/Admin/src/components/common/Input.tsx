import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  erro?: string;
  ajuda?: string;
  icone?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, erro, ajuda, icone, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="form-label">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icone && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icone}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              form-input
              ${icone ? 'pl-10' : ''}
              ${erro ? 'border-red-500 focus:border-red-600 focus:ring-red-600' : ''}
              ${className}
            `}
            {...props}
          />
        </div>

        {erro && <p className="form-error">{erro}</p>}
        {ajuda && !erro && <p className="form-help">{ajuda}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;