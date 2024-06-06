import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
export default function Slider() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/product");
  };
  const sliderData = [
    { image: "/src/assets/img/slider/swipe-1.jpg" },
    { image: "/src/assets/img/slider/swipe-2.jpg" },
    { image: "/src/assets/img/slider/swipe-3.jpg" },
  ];
  const items = sliderData.map((data, index) => (
    <div key={index} className="h-[480px] w-full">
      <img
        className="w-full h-full object-cover rounded-md"
        role="presentation"
        src={data.image}
        alt=""
      />
      <div className="absolute text-center lg:text-left md:text-center md:justify-center sm:text-center top-[20%] lg:left-[5%]">
        <h2 className="h2 mb-6 text-white">Kim cương đến từ thiên đường</h2>
        <p className="mb-[42px] text-white  leading-8">
          Tạo Nên Những Kỷ Niệm Vĩnh Cửu Với Kim Cương Hoàn Mỹ Và Khám Phá Sự
          Tinh Tế Và Hoàn Hảo Trong Từng Thiết Kế
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
