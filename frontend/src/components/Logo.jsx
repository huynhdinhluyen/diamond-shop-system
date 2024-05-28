import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex lg:justify-normal justify-center">
      <img
        className="w-[250px] h-[60px] object-cover"
        src="/src/assets/img/logo/logo.svg"
        alt=""
      />
    </Link>
  );
}
