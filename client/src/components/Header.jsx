import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-transparent backdrop-blur-md shadow-md w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={'/'}>
          <h1 className="font-bold underline-offset-8  text-neutral-700  text-sm sm:text-lg flex flex-wrap">
            Movie<span className="text-cyan-600">Mate</span>
          </h1>
        </Link>
        <form className=" p-3 ml-auto flex flex-wrap items-center border-b border-neutral-400">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <button>
            <FaSearch className="text-neutral-600" />
          </button>
        </form>
        <ul className="flex gap-4 pl-6">
          <Link to={"/"}>
            <li className=" hidden sm:inline text-neutral-900 hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className=" hidden sm:inline text-neutral-900 hover:underline">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className=" hidden sm:inline text-neutral-900 hover:underline">
              Profile
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Header;
