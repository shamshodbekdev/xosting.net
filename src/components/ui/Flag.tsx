import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface FlagProps {
  locale: Locale;
  className?: string;
}

/**
 * Dumaloq bayroq ikonkalari. Har bir bayroq 40x40 kvadratga, doira ichida
 * yaxshi ko'rinadigan qilib chizilgan. Ikkala o'zbek yozuvi ham O'zbekiston bayrog'idan foydalanadi.
 */
export function Flag({ locale, className }: FlagProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn("h-5 w-5 shrink-0 rounded-full ring-1 ring-white/20", className)}
    >
      {locale === "en" ? <UnitedKingdom /> : locale === "ru" ? <Russia /> : <Uzbekistan />}
    </svg>
  );
}

function Uzbekistan() {
  const stars = [
    [16.5, 3.6], [19.5, 3.6], [22.5, 3.6],
    [15, 6.6], [18, 6.6], [21, 6.6], [24, 6.6],
    [16.5, 9.6], [19.5, 9.6], [22.5, 9.6],
  ];

  return (
    <>
      <rect width="40" height="40" fill="#1EB53A" />
      <rect width="40" height="26.7" fill="#fff" />
      <rect width="40" height="13.3" fill="#0099B5" />
      <rect y="13.3" width="40" height="1.1" fill="#CE1126" />
      <rect y="25.6" width="40" height="1.1" fill="#CE1126" />
      {/* Yarim oy */}
      <circle cx="9.5" cy="6.7" r="4.4" fill="#fff" />
      <circle cx="11.3" cy="6.7" r="3.7" fill="#0099B5" />
      {/* Yulduzlar */}
      {stars.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.75" fill="#fff" />
      ))}
    </>
  );
}

function Russia() {
  return (
    <>
      <rect width="40" height="40" fill="#fff" />
      <rect y="13.3" width="40" height="13.4" fill="#0039A6" />
      <rect y="26.7" width="40" height="13.3" fill="#D52B1E" />
    </>
  );
}

function UnitedKingdom() {
  return (
    <>
      <rect width="40" height="40" fill="#012169" />
      <path d="M0 0L40 40M40 0L0 40" stroke="#fff" strokeWidth="7" />
      <path d="M0 0L40 40M40 0L0 40" stroke="#C8102E" strokeWidth="2.6" />
      <path d="M20 0V40M0 20H40" stroke="#fff" strokeWidth="11" />
      <path d="M20 0V40M0 20H40" stroke="#C8102E" strokeWidth="6.4" />
    </>
  );
}
