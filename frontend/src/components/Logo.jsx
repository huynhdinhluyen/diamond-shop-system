import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="flex lg:justify-normal justify-center">
      <Link to="/">
        <img
          className="w-[250px] h-[60px] object-cover"
          src="/public/assets/img/logo/logo.svg"
          alt=""
        />
      </Link>
    </div>
  );
}
