import { getCareers } from "@/services/codebayu";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import PageTitle from "@/components/page-title";
import Link from "next/link";

function formatDate(date: string, lang: string) {
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short",
  }).format(new Date(date));
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const careers = await getCareers();
  return (
    <>
      <PageTitle>{dict.career.title}</PageTitle>
      <ol className="relative border-s border-neutral-400">
        {careers.map((item, index) => (
          <li
            key={item.id}
            className={`ms-4 ${index !== careers.length - 1 ? "mb-10" : ""}`}
          >
            {/* Dot */}
            <div className="absolute w-3 h-3 bg-neutral-900 rounded-full mt-2 -start-1.5 " />

            {/* Date */}
            <time className="leading-none text-neutral-700">
              {formatDate(item.startDate, lang)}
              {item.endDate
                ? ` – ${formatDate(item.endDate, lang)}`
                : " – Present"}
            </time>

            {/* Position */}
            <h3 className="text-xl font-semibold my-2">{item.position}</h3>

            {/* Company + location */}
            <p className="text-sm text-neutral-600">
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:no-underline"
              >
                {item.company}
              </Link>
              <span className="mx-1">·</span>
              {item.location}
              <span className="mx-1">·</span>
              {item.type}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
