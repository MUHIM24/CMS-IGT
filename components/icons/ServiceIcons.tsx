// Icon custom per layanan (bukan icon set generik kayak Lucide/sparkle) — relevan ke konten masing-masing.
import type { ComponentType } from "react";

type IconProps = { className?: string };

export function WebIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18" />
      <circle cx="6" cy="6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <rect x="4" y="3" width="7" height="7" rx="1.5" />
      <rect x="13" y="3" width="7" height="7" rx="1.5" />
      <rect x="4" y="14" width="7" height="7" rx="1.5" />
      <rect x="13" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function SystemIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <rect x="3" y="4" width="18" height="5" rx="1.2" />
      <rect x="3" y="10" width="18" height="5" rx="1.2" />
      <rect x="3" y="16" width="18" height="5" rx="1.2" />
      <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="18.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MobileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

export function ConsultingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M12 3a9 9 0 1 0 5.5 16.1L21 20l-1.1-3.4A9 9 0 0 0 12 3z" />
      <path d="M8.5 12h7M8.5 15h4.5" />
    </svg>
  );
}

export function FintechIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12.2l2 2 4-4.2" />
    </svg>
  );
}

export const serviceIcons: Record<string, ComponentType<IconProps>> = {
  "web-development": WebIcon,
  "app-development": AppIcon,
  "system-development": SystemIcon,
  "mobile-apps": MobileIcon,
  "it-consulting": ConsultingIcon,
  "fintech-multifinance": FintechIcon,
};
