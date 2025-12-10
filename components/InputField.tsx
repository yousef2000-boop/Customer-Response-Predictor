import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  type?: 'number' | 'currency' | 'toggle';
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'number',
  min = 0,
  max,
  step = 1,
  helperText
}) => {
  
  if (type === 'toggle') {
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-400 transition-colors">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          {helperText && <span className="text-xs text-slate-400">{helperText}</span>}
        </div>
        <button
          onClick={() => onChange(name, value === 1 ? 0 : 1)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            value === 1 ? 'bg-blue-600' : 'bg-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value === 1 ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative">
        {type === 'currency' && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 sm:text-sm">$</span>
          </div>
        )}
        <input
          type="number"
          name={name}
          id={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(name, parseFloat(e.target.value) || 0)}
          className={`block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border
            ${type === 'currency' ? 'pl-7' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default InputField;