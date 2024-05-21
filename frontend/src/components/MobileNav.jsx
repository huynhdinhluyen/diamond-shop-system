/* eslint-disable react/prop-types */
import { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./Logo";

const MobileNav = ({ pages }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <div>
      <nav
        className={`fixed ${
          isNavOpen ? "left-0" : "-left-[300px]"
        } bg-white w-[300px] top-0 h-screen shadow-2xl lg:hidden transition-all duration-300 z-20`}
      >
        <div className="bg-primary w-8 h-8 relative -right-full top-8 flex justify-center items-center rounded-tr-lg rounded-br-lg cursor-pointer transition-all">
          {isNavOpen ? (
            <ArrowLeftIcon
              className="text-2xl text-white"
              onClick={toggleNav}
            />
          ) : (
            <ArrowRightIcon
              className="text-2xl text-white"
              onClick={toggleNav}
            />
          )}
        </div>
        <div className="px-12 flex flex-col gap-y-12 h-full">
          <a href="#">
            <Logo />
          </a>
          <ul>
            {pages.map((page, index) => (
              <li key={index}>
                <a
                  href={page.href}
                  className="text-secondary hover:text-accent transition-all duration-300"
                >
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
          <form className="relative flex gap-x-[10px] ">
            <label htmlFor="mnav-search-input">
              <SearchIcon />
            </label>
            <input
              type="text"
              id="mnav-input-search"
              placeholder="Search..."
              className="outline-none w-[160px] border-b-2 focus:border-b-2 focus: border-accent placeholder:italic"
            />
          </form>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
