import { Input } from "@/components/ui/input";
import { Command } from "cmdk";


interface TemplateSearchProps {
  onSearch: (query: string) => void;
}

export function TemplateSearch({ onSearch }: TemplateSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Command>
        <Input
          className="w-full"
          placeholder="Search templates..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </Command>
    </div>
  );
}
