"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface PackageResult {
  package: {
    name: string;
    version: string;
    date: string;
    description: string;
    keywords: string[];
  };
}

export default function SearchResults({
  results,
  initialQuery,
}: {
  results: PackageResult[];
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery || "");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl max-h-4xl mx-auto flex justify-between items-center mb-10">
        <Image src="/npm-logo.svg" alt="npm" width={64} height={64} />
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search packages"
              className="w-auto text-primary px-10 py-2 bg-slate-100 border border-gray-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Search
          </button>
        </form>
      </div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {results.length} packages found
        </h2>
        <ul className="space-y-8">
          {results.map(
            (result: {
              package: {
                name: string;
                version: string;
                date: string;
                description: string;
                keywords: string[];
              };
            }) => (
              <li key={result.package.name} className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      href={`/package/${result.package.name}`}
                      className="text-xl font-semibold text-red-600 hover:underline"
                    >
                      {result.package.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      v{result.package.version}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    Published{" "}
                    {new Date(result.package.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="mt-2 text-gray-700 text-wrap break-all">
                  {result.package.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center space-x-4">
                  <span className="text-sm text-gray-600">Keywords:</span>
                  {result.package.keywords &&
                    result.package.keywords.map((keyword: string) => (
                      <span
                        key={keyword}
                        className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
