import { AlertCircle } from "lucide-react";

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon: Icon,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-cyan-400"
      >
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Icon className="h-5 w-5 text-cyan-400" />
          </div>
        )}

        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-10 py-3 border rounded-xl text-gray-200 text-base transition-all duration-300 bg-gray-800 placeholder-gray-500 appearance-none focus:outline-none resize-none ${
            error
              ? "border-pink-500 focus:border-pink-400 focus:ring-pink-400"
              : "border-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
          } ${disabled ? "bg-gray-900 text-gray-500 cursor-not-allowed" : ""}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-gray-800 text-gray-200"
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-cyan-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-sm text-pink-400 mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;
