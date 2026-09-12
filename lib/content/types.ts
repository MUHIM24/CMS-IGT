// Tipe data konten (lihat specs/03-data-model.md). Field generik, gak terikat ke satu CMS,
// biar gampang di-mapping ke headless CMS pas Fase 2 (lihat specs/02-plan.md ADR-3).

export interface Service {
  slug: string;
  title: string;
  description: string;
  order: string; // "01".."06" — dipakai sebagai label visual, bukan icon generik
}

export interface CaseStudy {
  slug: string;
  tag: string;
  title: string;
  clientLabel: string; // placeholder generik sampai ada data asli (lihat BR-2 di specs/01-spec.md)
  description: string;
  imageUrl: string; // foto ilustratif (stok), bukan foto proyek asli — lihat catatan di case-studies.ts
}

export interface TeamRole {
  title: string;
  initials: string;
  note: string;
}
