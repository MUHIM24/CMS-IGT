"use client";

interface FilterTabsProps<T extends string> {
  options: readonly T[];
  active: T;
  onChange: (value: T) => void;
  labelFor?: (value: T) => string;
  ariaLabel: string;
}

// Tab filter pill (dipakai /layanan & /portfolio). Aktif: biru tua brand-mid teks putih (8.92).
export function FilterTabs<T extends string>({ options, active, onChange, labelFor, ariaLabel }: FilterTabsProps<T>) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={active === opt}
          className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
            active === opt ? "bg-brand-mid text-white" : "text-muted hover:text-brand-mid hover:bg-brand/10"
          }`}
        >
          {labelFor ? labelFor(opt) : opt}
        </button>
      ))}
    </div>
  );
}
