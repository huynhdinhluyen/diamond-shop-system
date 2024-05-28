import { useRef } from "react";
import Map from "../components/Map.jsx";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_epol6bk", "template_9mwtlgo", form.current, {
        publicKey: "FclgDBY_WLzkpsGZ6",
      })
      .then(
        () => {
          form.current.reset();
          toast.success("Gửi thành công!");
        },
        (error) => {
          toast.error("Gửi thất bại!");
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="container">
      <div className="flex flex-col gap-y-4  text-center w-full lg:w-[50%] mx-auto mb-10">
        <h3 className="h3 text-accent">
          Nơi tinh hoa của cái đẹp và nghệ thuật trang sức được tạo ra
        </h3>
        <p className="text-md text-gray-400">
          Chúng tôi tự hào là một địa chỉ uy tín và đáng tin cậy trong việc cung
          cấp những tác phẩm trang sức tuyệt đẹp và độc đáo cho khách hàng yêu
          thích sự sang trọng và phong cách.
        </p>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <i className="ri-map-pin-line text-[30px] text-accent"></i>
            <div className="flex flex-col">
              <p className="font-bold text-primary">Địa chỉ</p>
              <p className="font-bold text-primary">
                Hoạt động:{" "}
                <span className="text-sm text-gray-500 font-normal">
                  Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP.
                  Thủ Đức, TP. Hồ Chí Minh
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-x-2">
            <i className="ri-phone-line text-[30px] text-accent"></i>
            <div className="flex flex-col">
              <p className="font-bold text-primary">Liên hệ</p>
              <p className="font-bold text-primary">
                Số điện thoại:{" "}
                <span className="text-sm text-gray-500 font-normal">
                  (+84) 123123123
                </span>
              </p>
              <p className="font-bold text-primary">
                Email:{" "}
                <span className="text-sm text-gray-500 font-normal">
                  DHLdiamond@gmail.com
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-x-2">
            <i className="ri-time-line text-[30px] text-accent"></i>
            <div className="flex flex-col mb-5">
              <p className="font-bold text-primary">Giờ hoạt động</p>
              <p className="font-bold text-primary">
                Thứ 2 - Thứ 6:{" "}
                <span className="text-sm text-gray-500 font-normal">
                  09:00 – 18:00
                </span>
              </p>
              <p className="font-bold text-primary">
                Thứ 7 - Chủ nhật:{" "}
                <span className="text-sm text-gray-500 font-normal">
                  09:00 – 16:00
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <img
            src="https://images.unsplash.com/photo-1505686183080-0020a5979305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-[80%] w-full object-cover"
          />
        </div>
      </div>
      <div className="w-full">
        <Map />
      </div>
      <div className="mt-4 w-[75%] mx-auto">
        <h3 className="h3 text-accent uppercase text-center my-5">
          Gửi liên hệ
        </h3>
        <form ref={form} onSubmit={sendEmail}>
          <div className="flex flex-col lg:flex-row gap-x-4 gap-y-2">
            <input
              type="text"
              name="user_name"
              placeholder="Họ Tên*"
              className="p-2 bg-grey placeholder:italic lg:w-[50%] rounded-md outline-none"
            />
            <input
              type="text"
              name="user_email"
              placeholder="Email*"
              className="p-2 bg-grey placeholder:italic lg:w-[50%] rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-2">
            <textarea
              type="text"
              name="message"
              rows="4"
              placeholder="Nội dung*"
              className="p-2 bg-grey placeholder:italic w-full rounded-md outline-none"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="uppercase btn-sm btn-accent mt-4 hover:opacity-80 cursor-pointer"
              type="submit"
              value="Send"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
