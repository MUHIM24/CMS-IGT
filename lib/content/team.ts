import type { TeamRole } from "./types";

// Role generik (BUKAN nama+foto orang spesifik) — lihat BR-2 di specs/01-spec.md
export const teamRoles: TeamRole[] = [
  {
    title: "Chief Executive Officer",
    initials: "CEO",
    note: "Strategi & pengembangan bisnis",
  },
  {
    title: "Chief Technology Officer",
    initials: "CTO",
    note: "Arsitektur sistem & riset teknologi",
  },
  {
    title: "Head of Engineering",
    initials: "HoE",
    note: "Delivery proyek & quality assurance",
  },
  {
    title: "Head of Project Delivery",
    initials: "HoPD",
    note: "Manajemen proyek & hubungan klien",
  },
];

export function getTeamRoles(): TeamRole[] {
  return teamRoles;
}
