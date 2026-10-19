"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login, type LoginState } from "@/app/admin/actions";
import { Field, inputClass, primaryButtonClass } from "@/components/admin/ui";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [show, setShow] = useState(false);

  return (
    <form action={action} className="space-y-6">
      {next && <input type="hidden" name="next" value={next} />}
      <Field label="Username">
        <input name="username" autoComplete="username" required defaultValue={state.username} className={inputClass} placeholder="Masukkan username" />
      </Field>
      <Field label="Password">
        <span className="relative block">
          <input
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            required
            className={`${inputClass} pr-14`}
            placeholder="Masukkan password"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
            className="text-muted hover:text-brand-mid absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </span>
      </Field>
      <div role="alert" aria-live="polite">
        {state.error && <p className="bg-accent/10 text-accent-text rounded-2xl px-5 py-3 text-sm font-medium">{state.error}</p>}
      </div>
      <button type="submit" disabled={pending} className={`${primaryButtonClass} w-full`}>
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
