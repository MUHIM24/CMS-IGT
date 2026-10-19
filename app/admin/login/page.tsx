import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Masuk" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Image src="/logo-icon.png" alt="" width={48} height={48} className="h-12 w-12 object-contain" priority />
          <span className="leading-tight">
            <span className="block text-xl font-bold">PT IGT</span>
            <span className="text-muted block text-sm">Dashboard Website</span>
          </span>
        </div>
        <div className="rounded-3xl bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-bold">Masuk</h1>
          <p className="text-muted mt-2 mb-8 text-base">Kelola konten website PT Inovasi Gantarawana Teknologi.</p>
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}
