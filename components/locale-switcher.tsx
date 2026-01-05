"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, Locale } from "@/i18n-config";

const LOCALE_META: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  ja: { label: "日本語", flag: "🇯🇵" },
};

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] as Locale;

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <div className="flex gap-3">
        {i18n.locales.map((locale) => {
          const isActive = locale === currentLocale;

          return (
            <Link
              key={locale}
              href={redirectedPathname(locale)}
              aria-current={isActive ? "true" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 16px",
                borderRadius: 10,
                border: "1px solid",
                borderColor: isActive ? "#000" : "#ddd",
                background: isActive ? "#000" : "#fff",
                color: isActive ? "#fff" : "#000",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              {LOCALE_META[locale].label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
