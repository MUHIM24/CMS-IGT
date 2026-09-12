import { getTeamRoles } from "@/lib/content/team";

export function Team() {
  const roles = getTeamRoles();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="bg-brand/10 text-brand inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
            Tim Kami
          </span>
          <h2 className="font-display text-text mt-5 text-3xl font-bold">
            Struktur Tim Inti
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <div key={role.title} className="border-border rounded-2xl border bg-white p-6 text-center">
              <div className="bg-brand/10 text-brand font-display mx-auto flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold">
                {role.initials}
              </div>
              <h3 className="font-display text-text mt-4 text-sm font-bold">{role.title}</h3>
              <p className="text-muted mt-2 text-xs leading-relaxed">{role.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
