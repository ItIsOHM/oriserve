import ReactMarkdown from "react-markdown";

interface ReadmeProps {
  readme: string;
}

export default function Readme({ readme }: ReadmeProps) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown className={"markdown"}>
        {readme || "No README available"}
      </ReactMarkdown>
    </div>
  );
}
