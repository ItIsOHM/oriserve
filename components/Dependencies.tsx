interface DependenciesProps {
  dependencies: { [key: string]: string };
}

export default function Dependencies({ dependencies }: DependenciesProps) {
  return (
    <div className="max-w-3xl">
      {Object.keys(dependencies).length > 0 ? (
        <ul className="flex flex-row flex-wrap gap-2">
          {Object.entries(dependencies).map(([key, version]) => (
            <li key={key} className="bg-gray-200 px-2 py-1 rounded-full">
              {key}: {version}
            </li>
          ))}
        </ul>
      ) : (
        <p>No dependencies.</p>
      )}
    </div>
  );
}
