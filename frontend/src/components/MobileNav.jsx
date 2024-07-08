/* eslint-disable react/prop-types */
import { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MobileNav = ({ pages }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { user, logout } = useAuth();

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      navigate(`/products?query=${query}`);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div
        className={`fixed ${isNavOpen ? "left-0" : "-left-[300px]"
          } bg-white w-[80%] top-0 h-screen shadow-2xl lg:hidden transition-all duration-300 z-20`}
      >
        <div className="bg-primary w-8 h-8 relative -right-full top-8 flex justify-center items-center rounded-tr-lg rounded-br-lg cursor-pointer transition-all">
          {isNavOpen ? (
            <ArrowLeftIcon
              className="text-2xl text-white"
              onClick={toggleNav}
            />
          ) : (
            <ArrowRightIcon
              className="text-2xl text-white "
              onClick={toggleNav}
            />
          )}
        </div>
        <div className="px-12 flex flex-col gap-y-9 h-full">
          {user ? <div className="flex flex-col items-center">
            <Link to="/profile" className="flex gap-x-2 hover:text-accent cursor-pointer font-semibold text-center items-center">
              <i className="ri-user-line"></i>
              <p>Xin chào {user.firstName}</p>
            </Link>
            <div
              onClick={handleLogout}
              className="p-0 cursor-pointer hover:bg-slate-50 hover:text-accent transition-all duration-300 text-sm"
            >
              Đăng xuất
            </div>
          </div> : <Link
            to="/login"
            className="text-nowrap flex items-center gap-x-2 relative group z-10 hover:text-accent transition-all duration-300"
          >
            <i className="ri-user-line"></i>
            Đăng nhập
          </Link>}
          <ul>
            {pages.map((page, index) => (
              <li key={index} className="pb-1 border-b-2 border-gray-200 ">
                <Link
                  to={page.href}
                  className="text-secondary hover:text-accent transition-all duration-300"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
          <form className="flex gap-x-1" onSubmit={handleSearch}>
            <label
              htmlFor="search-input"
              className="flex justify-center items-center group"
            >
              <SearchIcon />
            </label>
            <input
              type="text"
              placeholder="Tìm sản phẩm"
              id="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none lg:w-[130px] focus:border-b-2 focus:border-accent placeholder:italic placeholder:text-[14px] transition-all duration-75"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
