// car-rental-platform/src/components/cars/SearchInput/SearchInput.jsx

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import "../SearchInput/SearchInput.scss";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("search", value.trim());
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  };

  const clearSearch = () => {
    setValue("");

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");

    setSearchParams(nextParams);
  };

  return (
    <form className="fleet-search" onSubmit={handleSubmit}>
      <Search size={19} strokeWidth={1.8} />

      <input
        type="search"
        placeholder="Search by brand or model..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Search cars"
      />

      {value && (
        <button
          type="button"
          className="fleet-search__clear"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}

      <button type="submit" className="fleet-search__submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;