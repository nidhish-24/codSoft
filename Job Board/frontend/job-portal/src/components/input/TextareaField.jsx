import { AlertCircle } from "lucide-react";

const TextareaField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 6,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-cyan-400">
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </label>

      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 border rounded-xl text-gray-200 bg-gray-800 placeholder-gray-500 text-base transition-all duration-300 resize-y focus:outline-none ${
          error
            ? "border-pink-500 focus:border-pink-400 focus:ring-pink-400"
            : "border-gray-700 focus:border-cyan-500 focus:ring-cyan-500"
        }`}
        style={{
          minHeight: "150px",
          background: disabled ? "#2c2c2c" : "linear-gradient(145deg, #1f1f1f, #292929)",
        }}
        {...props}
      />

      {error && (
        <div className="flex items-center space-x-2 text-sm text-pink-400">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p className="text-sm text-cyan-400">{helperText}</p>
      )}
    </div>
  );
};

export default TextareaField;
