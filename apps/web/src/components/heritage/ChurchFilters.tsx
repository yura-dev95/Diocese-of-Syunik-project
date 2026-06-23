import { Search } from 'lucide-react';
import { churchCategoryLabels } from '../../constants/church';
import type { ChurchCategory } from '../../types/church';

interface ChurchFiltersProps {
  category?: ChurchCategory;
  search: string;
  onCategoryChange: (category?: ChurchCategory) => void;
  onSearchChange: (search: string) => void;
}

export function ChurchFilters({ category, search, onCategoryChange, onSearchChange }: ChurchFiltersProps) {
  return (
    <div className="flex flex-col gap-5 border-y border-gold/25 py-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
        <button
          className={`focus-ring shrink-0 rounded-md px-4 py-2.5 text-xs font-bold transition ${!category ? 'bg-gold text-white' : 'border border-gold/30 bg-parchment/70 text-episcopal hover:bg-white/75'}`}
          type="button"
          onClick={() => onCategoryChange(undefined)}
        >
          Բոլորը
        </button>
        {(Object.entries(churchCategoryLabels) as [ChurchCategory, string][]).map(([value, label]) => (
          <button
            className={`focus-ring shrink-0 rounded-md px-4 py-2.5 text-xs font-bold transition ${category === value ? 'bg-gold text-white' : 'border border-gold/30 bg-parchment/70 text-episcopal hover:bg-white/75'}`}
            key={value}
            type="button"
            onClick={() => onCategoryChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="relative block min-w-64">
        <span className="sr-only">Որոնել սրբավայր</span>
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-royal" />
        <input
          className="focus-ring h-12 w-full rounded-md border border-gold/35 bg-parchment/80 pl-11 pr-4 text-sm text-episcopal placeholder:text-ink/40"
          placeholder="Որոնել անունով կամ վայրով"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </div>
  );
}
