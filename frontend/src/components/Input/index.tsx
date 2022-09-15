import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, ...rest }: InputProps) {
  if (label) {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id}>{label}</label>
        <input
          {...rest}
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
      </div>
    );
  }
  return (
    <input
      {...rest}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  );
}
