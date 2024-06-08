export default function Newsletter() {
  return (
    <div className="md:h-[350px] bg-primary py-12 flex items-center relative overflow-hidden">
      <div className="absolute left-0 bottom-0"></div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-[58px]">
          <div className="flex-1 z-10 text-center md:text-left">
            <p className="text-accent uppercase text-white tracking-[2.24px] font-medium text-accent">
              Giảm giá 500k cho đơn hàng đầu tiên
            </p>
            <h2 className="h2 mb-4 text-white">Đăng ký email ngay</h2>
            <p className="text-secondary">
              Phiếu giảm giá sẽ được gửi vào email của bạn trị giá 1.000.000đ
              khi đơn hàng đầu tiên trên 10.000.000đ
            </p>
          </div>
          <form className="flex-1">
            <div className="flex flex-col md:flex-row relative gap-y-4">
              <input
                type="text"
                placeholder="Email của bạn"
                className="rounded-full w-full h-[66px] bg-transparent border-2 border-white outline-none pl-[30px] placeholder:text-white focus:text-white"
              />
              <button className="btn btn-lg btn-accent md:absolute right-0">
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
