import Link from "next/link";

interface VersionsProps {
  versions: { [key: string]: unknown };
  packageName: string;
}

export default function Versions({ versions, packageName }: VersionsProps) {
  return (
    <div>
      <ul className="flex flex-col gap-3">
        {Object.keys(versions)
          .map((version) => (
            <li
              key={version}
            >
              <Link
                href={`/package/${packageName}/version/${version}`}
                className="text-blue-500 hover:underline bg-gray-200 px-2 py-1 rounded-full"
              >
                {version}
              </Link>
            </li>
          ))
          .reverse()}
      </ul>
    </div>
  );
}
