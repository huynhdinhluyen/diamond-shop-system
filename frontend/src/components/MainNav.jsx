/* eslint-disable react/prop-types */
import { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function MainNav({ pages }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      navigate(`/products?query=${query}`);
    }
  };

  return (
    <nav className="bg-white absolute w-full left-0 -bottom-[86px] shadow-custom1 h-16 rounded-[10px] hidden lg:flex lg:items-center lg:justify-between lg:px-[50px] z-10">
      <ul className="flex gap-x-4">
        {pages.map((page, index) => (
          <li key={index} className="last:border-r-0 border-r">
            <Link
              to={page.href}
              className="text-secondary pr-4 hover:text-accent transition-all duration-300 "
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
      <form className="relative flex gap-x-[10px]" onSubmit={handleSearch}>
        <label
          htmlFor="search-input"
          className="flex justify-center items-center group"
        >
          <SearchIcon />
        </label>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          id="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none w-[140px] focus:w-[190px] focus:border-b-2 focus:border-accent placeholder:italic placeholder:text-base transition-all duration-150"
        />
      </form>
    </nav>
  );
}
