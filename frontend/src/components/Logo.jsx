export default function Logo() {
  return (
    <div className="flex lg:justify-normal justify-center">
      <a href="#">
        <img
          className="w-[250px] h-[60px] object-cover"
          src="/public/assets/img/logo/logo.svg"
          alt=""
        />
      </a>
    </div>
  );
}
