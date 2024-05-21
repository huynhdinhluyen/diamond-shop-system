
/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";

export default function MainNav({ pages }) {
  return (
    <nav className="bg-white absolute w-full left-0 -bottom-[86px] shadow-custom1 h-16 rounded-[10px] hidden lg:flex lg:items-center lg:justify-between lg:px-[50px]">
      <ul className="flex gap-x-4">
        {pages.map((page, index) => (
          <li key={index} className="last:border-r-0 border-r">
            <a
              href={page.href}
              className="text-secondary pr-4 hover:text-accent transition-all duration-300 "
            >
              {page.title}
            </a>
          </li>
        ))}
      </ul>
      <form className="relative flex gap-x-[10px]">
        <label
          htmlFor="search-input"
          className="flex justify-center items-center group"
        >
          <SearchIcon />
        </label>
        <input
          type="text"
          placeholder="Search..."
          id="search-input"
          className="outline-none w-[100px] focus:w-[180px] focus:border-b-2 focus:border-accent placeholder:italic placeholder:text-base transition-all duration-150"
        />
      </form>
    </nav>
  );
}
