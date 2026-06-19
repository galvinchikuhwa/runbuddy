type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  min,
  max,
  step,
}: FormInputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[var(--text)]">{label}</span>
      <input
        className="w-full rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)]/70"
        max={max}
        min={min}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        step={step}
        type={type}
        value={value}
      />
    </label>
  );
}
