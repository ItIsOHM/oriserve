"use client";

import Dependencies from "@/components/Dependencies";
import { useEffect, useState } from "react";

async function getVersionDetails(packageName: string, version: string) {
  const response = await fetch(
    `https://registry.npmjs.org/${packageName}/${version}`
  );
  const data = await response.json();
  return data;
}

export default function VersionDetail({
  params,
}: {
  params: { name: string; version: string };
}) {
  interface VersionInfo {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    time: string;
    dist: {
      tarball: string;
      shasum: string;
    };
    description: string;
    repository?: {
      url: string;
    };
    author?: {
      name: string;
      url?: string;
    };
    license: string;
  }

  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getVersionDetails(params.name, params.version);
      setVersionInfo(data);
    }

    fetchData();
  }, [params.name, params.version]);

  if (!versionInfo) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {versionInfo.name}{" "}
        <span className="text-gray-500">v{versionInfo.version}</span>
      </h1>

      <div className="mb-4">
        <p className="text-gray-700">{versionInfo.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Author</h2>
        {versionInfo.author ? (
          <p>
            {versionInfo.author.url ? (
              <a href={versionInfo.author.url} className="text-blue-500">
                {versionInfo.author.name}
              </a>
            ) : (
              versionInfo.author.name
            )}
          </p>
        ) : (
          <p>No author details available</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Version Details</h2>
        <p>License: {versionInfo.license}</p>
        {versionInfo.repository && (
          <p>
            Repository:{" "}
            <a
              href={versionInfo.repository.url.slice(4)}
              className="text-blue-500"
            >
              {versionInfo.repository.url.slice(4)}
            </a>
          </p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Dependencies</h2>
        <Dependencies dependencies={versionInfo.dependencies || {}}/>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Published on</h2>
        <p>{new Date(versionInfo.time).toLocaleDateString()}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Distribution</h2>
        <p>
          Tarball:{" "}
          <a href={versionInfo.dist.tarball} className="text-blue-500">
            {versionInfo.dist.tarball}
          </a>
        </p>
        <p>SHA: {versionInfo.dist.shasum}</p>
      </div>
    </div>
  );
}
