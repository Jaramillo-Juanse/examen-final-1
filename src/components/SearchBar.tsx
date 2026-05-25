import { FaSearch } from "react-icons/fa";

type Props = {
  search: string;
  setSearch: (search: string) => void;
}
function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="mb-6 relative">
      <FaSearch className="absolute left-3 top-3 text-gray-400" />

      <input
        type="text"
        placeholder="Buscar dragón..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded bg-slate-800"
      />
    </div>
  );
}

export default SearchBar;