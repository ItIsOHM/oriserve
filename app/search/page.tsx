import SearchResults from "@/components/SearchResults"

async function searchPackages(query: string) {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${query}`)
  const data = await response.json()
  return data.objects
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const results = await searchPackages(searchParams.q)

  return (
    <div>
      <SearchResults results={results} initialQuery={searchParams.q} />
    </div>
  )
}