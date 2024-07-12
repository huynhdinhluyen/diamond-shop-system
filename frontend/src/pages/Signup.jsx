/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { EMAIL, NAME, PHONE_NUMBER } from "../components/Pattern";
import Input from "../components/Input";
import { useEffect, useState } from "react";

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");
  const [formStep, setFormStep] = useState('basic');
  const [homeAddress, setHomeAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then(response => response.json())
      .then(data => {
        if (typeof data === "object" && Array.isArray(data.data)) {
          setProvinces(data.data);
        } else {
          console.error("Dữ liệu từ API không phải là một object hoặc không có mảng data:", data);
        }
      })
      .catch(error => {
        console.error("Lỗi khi fetch dữ liệu từ API:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince !== "") {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.data)) {
            setDistricts(data.data);
          } else {
            console.error("Dữ liệu từ API không phải là một mảng:", data);
          }
        })
        .catch(error => {
          console.error("Lỗi khi fetch dữ liệu từ API:", error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict !== "") {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.data)) {
            setWards(data.data);
          } else {
            console.error("Dữ liệu từ API không phải là một mảng:", data);
          }
        })
        .catch(error => {
          console.error("Lỗi khi fetch dữ liệu từ API:", error);
        });
    }
  }, [selectedDistrict]);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    trigger,
    formState: { errors }
  } = useForm();

  const submitAdditionalInfo = async (formData) => {
    const success = await auth.register(formData);
    if (success) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  const handleNextStep = async () => {
    const result = await trigger(["lastName", "firstName", "username", "password", "confirmPassword", "email", "phoneNumber"]);
    if (result) {
      setFormStep('address');
    }
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    const selectedProvince = provinces.find(province => province.id === provinceId);
    if (selectedProvince) {
      setSelectedProvinceName(selectedProvince.full_name);
    } else {
      setSelectedProvinceName("");
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    const selectedDistrict = districts.find(district => district.id === districtId);
    if (selectedDistrict) {
      setSelectedDistrictName(selectedDistrict.full_name);
    } else {
      setSelectedDistrictName("");
    }
  };

  const handleWardChange = (e) => {
    const wardId = e.target.value;
    setSelectedWard(wardId);
    const selectedWard = wards.find(ward => ward.id === wardId);
    if (selectedWard) {
      setSelectedWardName(selectedWard.full_name);
    } else {
      setSelectedWardName("");
    }
  };

  const generateFullAddress = () => {
    const parts = [];
    if (homeAddress) parts.push(homeAddress);
    if (selectedWardName) parts.push(selectedWardName);
    if (selectedDistrictName) parts.push(selectedDistrictName);
    if (selectedProvinceName) parts.push(selectedProvinceName);
    console.log(parts);
    return parts.join(", ");
  };

  useEffect(() => {
    const address = generateFullAddress();
    setFullAddress(address);
    setValue("address", address); // Đặt giá trị của trường address trong form
    setValue("city", selectedDistrictName)
  }, [homeAddress, selectedWardName, selectedDistrictName, selectedProvinceName]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img
            src="/src/assets/img/register/cover.jpg"
            alt="" />
        </div>

        <div className="md:w-1/2 px-6">
          <h2 className="font-bold text-2xl text-accent text-center uppercase">
            Đăng Ký
          </h2>
          <p className="text-sm my-2 text-center uppercase tracking-[1px]">
            {formStep === 'basic' ? 'Đăng ký ngay để nhận nhiều ưu đãi' : 'Nhập thông tin địa chỉ (Bạn có thể bỏ qua và cập nhật sau)'}
          </p>
          <form onSubmit={formStep === 'address' ? handleSubmit(submitAdditionalInfo) : handleSubmit(() => { })} noValidate className="flex flex-col gap-y-2">
            {formStep === 'basic' && (
              <>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Họ"
                  {...register("lastName", {
                    required: "Họ là bắt buộc",
                    pattern: NAME
                  })}
                  error={errors.lastName}
                />
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Tên"
                  {...register("firstName", {
                    required: "Tên là bắt buộc",
                    pattern: NAME
                  })}
                  error={errors.firstName}
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Tên đăng nhập"
                  {...register("username", {
                    required: "Tên đăng nhập là bắt buộc",
                    minLength: 5
                  })}
                  error={errors.username}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                    minLength: 5
                  })}
                  error={errors.password}
                />
                <Input
                  type="password"
                  label="Confirm password"
                  placeholder="Xác nhận mật khẩu"
                  {...register("confirmPassword", {
                    required: "Xác nhận mật khẩu là bắt buộc",
                    validate: (value) =>
                      value !== getValues("password")
                        ? "Password không khớp"
                        : true,
                  })}
                  error={errors.confirmPassword}
                />
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: EMAIL
                  })}
                  error={errors.email}
                />
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                  {...register("phoneNumber", {
                    required: "Số điện thoại là bắt buộc",
                    pattern: PHONE_NUMBER
                  })}
                  error={errors.phoneNumber}
                />
                <button type="button" onClick={handleNextStep} className="btn btn-sm btn-accent mt-2">Tiếp theo</button>
              </>
            )}

            {formStep === 'address' && (
              <>
                <select className="border px-3 py-4 text-sm italic text-gray-400 rounded-lg"
                  value={selectedProvince}
                  onChange={handleProvinceChange}>
                  <option value="">Tỉnh thành</option>
                  {provinces.map(province => (
                    <option key={province.id} value={province.id}>{province.name}</option>
                  ))}
                </select>
                <select className="border px-3 py-4 text-sm italic text-gray-400 rounded-lg"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}>
                  <option value="">Chọn quận/huyện</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
                <select className="border px-3 py-4 text-sm italic text-gray-400 rounded-lg" value={selectedWard} onChange={handleWardChange}>
                  <option value="">Chọn phường/xã</option>
                  {wards.map(ward => (
                    <option key={ward.id} value={ward.id}>{ward.name}</option>
                  ))}
                </select>
                <Input
                  type="text"
                  name="homeAddress"
                  placeholder="Số nhà"
                  onChange={(e) => setHomeAddress(e.target.value)}
                  value={homeAddress}
                  error={errors.address}
                />
                <input
                  type="hidden"
                  placeholder="Địa chỉ đầy đủ"
                  name="address"
                  value={fullAddress}
                  {...register("address")}
                />
                <button type="submit" className="btn btn-sm btn-accent mt-2">Đăng ký</button>
                <button type="button" onClick={() => setFormStep('basic')} className="btn btn-sm btn-secondary mt-2">Quay lại</button>
              </>
            )}

            <div className="flex flex-col gap-y-2 items-center mt-2 ">
              <Link to="/login" className=" text-md hover:underline text-center">
                Quay lại đăng nhập nếu bạn đã có tài khoản
              </Link>
              <Link to="/" className=" text-md hover:underline">
                Trở về trang chủ
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
