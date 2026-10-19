import type { Metadata } from "next";
import { DemoForm } from "@/components/admin/DemoForm";
import { Card, Field, inputClass, PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Ubah Password" };

// Mengikuti referensi "Edit Password" BuildWithAngga. Tahap tampilan: password akun dummy diatur lewat env, bukan form ini.
export default function ChangePasswordPage() {
  return (
    <>
      <PageHeader title="Ubah Password" subtitle="Amankan akun Anda dengan kombinasi password yang kuat" />
      <Card className="max-w-xl">
        <DemoForm submitLabel="Perbarui Sekarang" fullWidthSubmit>
          <Field label="Password Lama">
            <input type="password" autoComplete="current-password" className={inputClass} />
          </Field>
          <Field label="Password Baru" hint="maks. 24 karakter">
            <input type="password" autoComplete="new-password" maxLength={24} className={inputClass} />
          </Field>
          <Field label="Konfirmasi Password Baru" hint="maks. 24 karakter">
            <input type="password" autoComplete="new-password" maxLength={24} className={inputClass} />
          </Field>
        </DemoForm>
      </Card>
    </>
  );
}
