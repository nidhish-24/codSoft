import { AlertCircle } from "lucide-react";

const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-cyan-400"
      >
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Icon className="h-5 w-5 text-cyan-400" />
          </div>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-3 py-3 rounded-xl bg-gray-900 text-gray-200 placeholder-gray-500 text-base transition-all duration-300 border ${
            error
              ? "border-pink-500 focus:border-pink-400 focus:ring-pink-400"
              : "border-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
          } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            disabled ? "bg-gray-800 text-gray-500 cursor-not-allowed" : ""
          }`}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center space-x-2 text-sm text-pink-400 mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p className="text-sm text-cyan-400">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;
