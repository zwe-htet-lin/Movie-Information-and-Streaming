"use client";

import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "./ui/button";

interface Props {
  text: string;
}

const ExpandableText = ({ text }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const sm = useMediaQuery({ query: "(min-width: 640px)" });

  const limit = md ? 500 : sm ? 300 : 200;

  if (!text) return null;

  if (text.length <= limit) return <p>{text}</p>;

  const summary = expanded ? text : text.substring(0, limit) + " ...";

  return (
    <p className="hide-scrollbar max-h-[172px] overflow-y-scroll sm:max-h-[140px]">
      {summary}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setExpanded(!expanded)}
        className="h-fit px-2 py-1"
      >
        {expanded ? "Show less" : "Read more"}
      </Button>
    </p>
  );
};

export default ExpandableText;
