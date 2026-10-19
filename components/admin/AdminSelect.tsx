"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dropdown dashboard: komponen Select yang sama dengan /blog (bukan <select> bawaan browser),
// trigger dibentuk pill seperti input dashboard (bg-admin-field, tinggi 56px).
export function AdminSelect({ name, options, defaultValue }: { name: string; options: readonly string[]; defaultValue?: string }) {
  return (
    <Select name={name} defaultValue={defaultValue ?? options[0]}>
      <SelectTrigger className="bg-admin-field text-text focus-visible:ring-brand/40 h-auto min-h-14 w-full rounded-full border-0 px-6 text-base focus-visible:ring-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
