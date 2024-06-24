import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
export default function Slider() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/products");
  };
  const sliderData = [
    {
      image: "/src/assets/img/slider/swipe-1.jpg",
      title: "Kim cương đến từ thiên đường",
      description: "Tạo Nên Những Kỷ Niệm Vĩnh Cửu Với Kim Cương Hoàn Mỹ Và Khám Phá Sự Tinh Tế Và Hoàn Hảo Trong Từng Thiết Kế",
    },
    {
      image: "/src/assets/img/slider/swipe-2.jpg",
      title: "Sự hoàn hảo trong từng chi tiết",
      description: "Khám phá sự tinh xảo và vẻ đẹp tuyệt vời của những viên kim cương hoàn hảo nhất.",
    },
    {
      image: "/src/assets/img/slider/swipe-3.jpg",
      title: "Vẻ đẹp vĩnh cửu",
      description: "Những thiết kế trang sức mang đến sự sang trọng và đẳng cấp, tạo nên những khoảnh khắc không thể quên.",
    },
  ];

  const items = sliderData.map((data, index) => (
    <div key={index} className="h-[480px] w-full relative">
      <img
        className="w-full h-full object-cover rounded-md"
        role="presentation"
        src={data.image}
        alt=""
      />
      <div className="absolute text-center lg:text-left md:text-center md:justify-center sm:text-center top-[20%] lg:left-[5%]">
        <h2 className="h2 mb-6 text-white">{data.title}</h2>
        <p className="mb-[42px] text-white leading-8">
          {data.description}
        </p>
        <button
          className="btn btn-accent btn-lg w-[250px] mx-auto lg:mx-0"
          onClick={handleNavigate}
        >
          Mua sắm ngay
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex lg:mt-6">
      <AliceCarousel
        animationType="fadeout"
        animationDuration={800}
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
        disableDotsControls
      />
    </div>
  );
}
