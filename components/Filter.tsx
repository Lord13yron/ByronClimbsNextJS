import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import React from "react";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Favorites", value: "favorites" },
  { label: "Sends", value: "sends" },
];

type FilterProps = {
  resetpage: () => void;
};

export default function Filter({ resetpage }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("filter") || "all";

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    router.replace(`?${params.toString()}`);
    resetpage();
  };

  return (
    <ButtonGroup aria-label="Button group ">
      {FILTERS.map((f, i) => (
        <React.Fragment key={i}>
          <Button
            variant={current === f.value ? "default" : "secondary"}
            onClick={() => handleClick(f.value)}
          >
            {f.label}
          </Button>
          {i < FILTERS.length - 1 && <ButtonGroupSeparator />}
        </React.Fragment>
      ))}
    </ButtonGroup>
  );
}
