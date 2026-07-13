import { useMemo, useState } from "react";

export type FaqItem = {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  summary: string;
  href: string;
};

type Props = {
  faqs: FaqItem[];
  categories: string[];
  locale: "en" | "ja";
  labels: {
    keyword: string;
    searchPlaceholder: string;
    category: string;
    all: string;
    questionCountOne: string;
    questionCountOther: string;
    noResults: string;
  };
};

export default function FaqSearch({ faqs, categories, locale, labels }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);

    return faqs.filter((faq) => {
      if (category && faq.category !== category) return false;
      if (!normalizedQuery) return true;

      return [faq.title, faq.summary, ...faq.keywords]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(normalizedQuery);
    });
  }, [category, faqs, query]);

  return (
    <div className="faq-search">
      <div className="search-controls">
        <label>
          <span>{labels.keyword}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
          />
        </label>
        <label>
          <span>{labels.category}</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">{labels.all}</option>
            {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="result-count" aria-live="polite">
        {(results.length === 1 ? labels.questionCountOne : labels.questionCountOther).replace(
          "{count}",
          String(results.length),
        )}
      </p>

      {results.length > 0 ? (
        <ul className="faq-index">
          {results.map((faq) => (
            <li key={faq.id}>
              <span className="faq-category">{faq.category}</span>
              <a href={faq.href} style={{ viewTransitionName: `faq-${faq.id}` }}>
                <strong>{faq.title}</strong>
                <span>{faq.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-result">{labels.noResults}</p>
      )}
    </div>
  );
}
