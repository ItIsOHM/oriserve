'use client'

import { useState, useEffect } from 'react'
import Readme from '@/components/Readme'
import Dependencies from '@/components/Dependencies'
import Versions from '@/components/Versions'
import { ArrowUpRight, Copy } from 'lucide-react'

// Fetch package info from NPM registry
async function getPackageInfo(name: string) {
  const response = await fetch(`https://registry.npmjs.org/${name}`)
  return response.json()
}

// Fetch the number of weekly downloads from NPM registry
async function getPackageDownloads(name: string) {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`);
  return response.json();
}

// Fetch the number of pull requests from GitHub
async function getRepoPullRequests(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all`)
  const pullRequests = await response.json()
  return pullRequests.length
}

// Fetch the number of issues from GitHub
async function getRepoIssues(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=open`)
  const issues = await response.json()
  return issues.length
}

// Fetch the README from GitHub if not provided by NPM registry
async function getGitHubReadme(owner: string, repo: string) {
  const token = process.env.GITHUB_TOKEN;  // Store a GitHub token for authentication
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      Accept: 'application/vnd.github.VERSION.html',
      Authorization: token ? `token ${token}` : ''  // Use token if available
    }
  });

  if (response.status === 404) {
    return 'No README available';
  }

  const readme = await response.text();
  return readme;
}

// Improve repository URL parsing logic
function parseGitHubRepoUrl(repoUrl: string) {
  const match = repoUrl.match(/github\.com[:/](.+?)\/(.+?)(\.git|\/|$)/);
  if (match) {
    const [, owner, repo] = match;
    return { owner, repo };
  }
  return null;
}

export default function PackageDetail({ params }: { params: { name: string } }) {
  interface PackageInfo {
    name: string;
    'dist-tags': { latest: string };
    versions: { [key: string]: { dependencies?: { [key: string]: string }; [key: string]: unknown } };
    time: { [key: string]: string };
    readme: string;
    repository?: { url: string };
    homepage?: string;
    license?: string;
    dist?: { unpackedSize?: number; fileCount?: number };
  }

  const [packageInfo, setPackageInfo] = useState<PackageInfo | null>(null)
  const [pullRequests, setPullRequests] = useState<number | null>(null)
  const [issues, setIssues] = useState<number | null>(null)
  const [readme, setReadme] = useState<string | null>(null)
  const [weeklyDownloads, setWeeklyDownloads] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'readme' | 'dependencies' | 'versions'>('readme')

  const renderTabContent = () => {
    if (activeTab === 'readme') return <Readme readme={readme || ''} />
    if (activeTab === 'dependencies') return <Dependencies dependencies={latestVersionInfo.dependencies || {}} />
    if (activeTab === 'versions') return <Versions versions={packageInfo?.versions || {}} packageName={packageInfo?.name || ''} />
  }

  useEffect(() => {
    async function fetchData() {
      const pkgInfo = await getPackageInfo(params.name);
      setPackageInfo(pkgInfo);
  
      const downloadsData = await getPackageDownloads(params.name);
      setWeeklyDownloads(downloadsData.downloads.toLocaleString());  // Set the weekly downloads dynamically
  
      // Extract repository information (assuming GitHub URL)
      const repoUrl = pkgInfo.repository?.url;
      if (repoUrl) {
        const parsedRepo = parseGitHubRepoUrl(repoUrl);
        if (parsedRepo) {
          const { owner, repo } = parsedRepo;
  
          // Fetch pull requests, issues, and README from GitHub
          setPullRequests(await getRepoPullRequests(owner, repo));
          setIssues(await getRepoIssues(owner, repo));
          
          if (!pkgInfo.readme) {
            const gitHubReadme = await getGitHubReadme(owner, repo);
            setReadme(gitHubReadme);
          }
        }
      }
  
      // Fallback to NPM registry README if available
      setReadme(pkgInfo.readme || '');
    }
  
    fetchData();
  }, [params.name]);

  if (!packageInfo) return <div>Loading...</div>

  const latestVersion = packageInfo['dist-tags'].latest
  const latestVersionInfo = packageInfo.versions[latestVersion]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">{packageInfo.name}</h1>
          <p className="text-gray-600 mb-4">{latestVersion} • Public • Published {new Date(packageInfo.time[latestVersion]).toLocaleDateString()}</p>
          
          <div className="flex mb-6 border-b">
            <button
              className={`px-4 py-2 ${activeTab === 'readme' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('readme')}
            >
              Readme
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'dependencies' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('dependencies')}
            >
              {latestVersionInfo.dependencies ? Object.keys(latestVersionInfo.dependencies).length : 0} Dependencies
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'versions' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('versions')}
            >
              {Object.keys(packageInfo.versions).length} Versions
            </button>
          </div>

          <div className="mb-8">
            {renderTabContent()}
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Install</h3>
            <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
              <code>npm i {packageInfo.name}</code>
              <Copy className="text-gray-400 cursor-pointer" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">Repository</h3>
            <a href={packageInfo.repository?.url.slice(4)} className="text-blue-600 hover:underline flex items-center">
              github.com/{packageInfo.name} <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">Homepage</h3>
            <a href={packageInfo.homepage} className="text-blue-600 hover:underline flex items-center">
              {packageInfo.homepage} <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">Weekly Downloads</h3>
            <p className="text-2xl font-bold">{weeklyDownloads !== null ? weeklyDownloads : 'Loading...'}</p>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">Version</h3>
              <p>{latestVersion}</p>
            </div>
            <div>
              <h3 className="font-bold">License</h3>
              <p>{packageInfo.license}</p>
            </div>
            <div>
              <h3 className="font-bold">Unpacked Size</h3>
              <p>{((packageInfo.dist?.unpackedSize ?? 0) / 1024).toFixed(2)} kB</p>
            </div>
            <div>
              <h3 className="font-bold">Total Files</h3>
              <p>{packageInfo.dist?.fileCount || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-bold">Issues</h3>
              <p>{issues !== null ? issues : 'Loading...'}</p>
            </div>
            <div>
              <h3 className="font-bold">Pull Requests</h3>
              <p>{pullRequests !== null ? pullRequests : 'Loading...'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Last publish</h3>
            <p>{new Date(packageInfo.time[latestVersion]).toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className="font-bold">Collaborators</h3>
            {/* Add collaborator avatars here */}
          </div>
        </div>
      </div>
    </div>
  )
}