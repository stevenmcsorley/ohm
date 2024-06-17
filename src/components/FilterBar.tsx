import { useState } from "react";

const FilterBar = ({
  onFilter,
}: {
  onFilter: (filters: { category?: string; sort?: string }) => void;
}) => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const handleFilter = () => {
    console.log("Filtering by:", { category, sort });
    onFilter({ category, sort });
  };

  return (
    <div className="flex space-x-4 mb-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded border bg-gray-300"
      >
        <option value="">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Software Development">Software Development</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 rounded border bg-gray-300"
      >
        <option value="">Sort by</option>
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
      <button
        onClick={handleFilter}
        className="p-2 bg-pink-600 text-white rounded hover:bg-pink-900 transition-colors duration-200"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterBar;
