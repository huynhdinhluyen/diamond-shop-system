import { Button, Fade } from "@mui/material";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="hidden md:block md:relative">
      <img
        src="https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/4c3c2af7-3c16-4fa0-ba37-49c15d5539fd_1716134727504422823?Expires=-62135596800&Signature=NZrt6LCUqTHd91Yu4KFdWhoPzfyuL9pZ2mZLTN1SgQZJDN34bWkKQt8~fuYWxD13P7BUFfA94oSIcl4waacHFM2Z0b7xSg5HbsGqO5a7s1ZVcOug55wDycGKUZ5INYf5hKV0QnvlT9MlP3Mz1FDq6eOAmd9-RRv6qJp4HaGSnuNr1ufRoCmHJvWLPtym7RKFrAfPctIQeXEc89MofARUrj7LA7qRHUavvjhxXpXs7Q9n5OjVh7dIsfq74mCbObacu3dcJub6ue3EKHUHYhLXjw7U7u~pAL0xTiBBEWH4PKFfxvwxkpoPRsAzlgdBUOEZsAQZlZujFoa47crb5rqW5w__&Key-Pair-Id=K1P54FZWCHCL6J"
        alt="Banner"
        className="w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Fade in={true} timeout={2000}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            BỘ SƯU TẬP KIM CƯƠNG CAO CẤP
          </h1>
          <p className="text-lg mb-4">
            Chào mừng bạn đến với bộ sưu tập kim cương cao cấp của chúng tôi -
            nơi tinh tuý của sự lấp lánh và sang trọng hội tụ
          </p>
          <Button
            variant="contained"
            color="primary"
            className="!bg-orange-500 hover:!bg-orange-700"
          >
            <Link to="/products" className="text-white">
              Tìm hiểu thêm
            </Link>
          </Button>
        </div>
      </Fade>
    </div>
  );
}
