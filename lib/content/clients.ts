// Logo resmi 2 klien pertama sudah diizinkan dipasang. Marquee auto-scroll di ClientsMarquee
// sengaja dinonaktifkan sementara (baru 2 logo, scroll kurang natural) - aktifkan lagi begitu
// jumlah logo klien nambah jadi ~5+ (lihat komentar di ClientsMarquee.tsx).
export type Client = { name: string; logo: string };

export const clients: Client[] = [
  { name: "Woori Finance Indonesia", logo: "/clients/woori-finance-indonesia.jpg" },
  { name: "Shinhan Indo Finance", logo: "/clients/shinhan-indo-finance.jpg" },
];
