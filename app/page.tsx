"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500">
      <div className="bg-white py-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5" />
              </div>
              {/* <button
                type="submit"
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Search
              </button> */}
              <Button variant={"default"} className="text-md h-25">
                Search
              </Button>
            </form>
            <div className="flex items-center space-x-4">
              <Button variant={"outline"}>Sign Up</Button>
              <Button variant={"ghost"}>Sign In</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center text-white pt-20">
          <h1 className="text-6xl font-bold mb-6">Build amazing things</h1>
          <p className="text-xl mb-8">
            We&apos;re GitHub, the company behind the npm Registry and npm CLI.
            We offer those to the community for free, but our day job is
            building and selling useful tools for developers like you.
          </p>
          <h2 className="text-4xl font-bold mb-6">
            Take your JavaScript development up a notch
          </h2>
          <p className="text-xl mb-8">
            Get started today for free, or step up to npm Pro to enjoy a premium
            JavaScript development experience, with features like private
            packages.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition duration-300"
            >
              Sign up for free
            </Link>
            <Link
              href="/pro"
              className="bg-white text-red-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Learn about Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
