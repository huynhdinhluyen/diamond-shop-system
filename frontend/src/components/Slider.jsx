export default function Slider() {
  return (
    <section className="bg-grey py-12 xl:pt-12 xl:pb-0 overflow-hidden">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between h-full ">
          {/* text */}
          <div className="w-full xl:w-[48%] text-center xl:text-left">
            <h1 className="h1 mb-6">Kim cương đến từ thiên đường</h1>
            <p className="mb-[42px] md:max-w-xl mx-auto ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
              tempore reiciendis fugit corporis sint et quae, temporibus
              deleniti numquam nesciunt sit.
            </p>
            <button className="btn btn-accent btn-lg mx-auto xl:mx-0">
              Tìm hiểu thêm
            </button>
          </div>
          <div className="hidden xl:flex max-w-[640px] h-[630px] self-end">
            <img
              src="/public/assets/img/slider/slider-2.jpg"
              alt=""
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
