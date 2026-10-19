import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DemoForm } from "@/components/admin/DemoForm";
import { Card, Field, inputClass, PageHeader } from "@/components/admin/ui";
import { readSessionToken, SESSION_COOKIE } from "@/lib/admin/session";
import { siteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = { title: "Profil Saya" };

export default async function ProfilePage() {
  const session = await readSessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  const name = session?.username ?? "";
  return (
    <>
      <PageHeader title="Profil Saya" subtitle="Informasi akun yang tampil di dashboard" />
      <Card className="max-w-xl">
        <DemoForm submitLabel="Simpan Profil" fullWidthSubmit>
          <Field label="Nama Lengkap">
            <input defaultValue={name.charAt(0).toUpperCase() + name.slice(1)} className={inputClass} />
          </Field>
          <Field label="Username">
            <input defaultValue={name} disabled className={inputClass} />
          </Field>
          <Field label="Email">
            <input type="email" defaultValue={siteSettings.email} className={inputClass} />
          </Field>
          <Field label="Jabatan">
            <input defaultValue="Administrator" className={inputClass} />
          </Field>
        </DemoForm>
      </Card>
    </>
  );
}
