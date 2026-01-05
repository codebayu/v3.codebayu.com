import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import PageTitle from "@/components/page-title";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <div>
      <PageTitle>Bayu Setiawan（バユ・セティアワン）</PageTitle>
      <p className="text-lg">{dict.home.summary}</p>
    </div>
  );
}
