import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function MyAddress() {
    const { user, updateProfile, refreshUser } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedProvinceName, setSelectedProvinceName] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedWardName, setSelectedWardName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [fullAddress, setFullAddress] = useState("");

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            lastName: user?.lastName || "",
            firstName: user?.firstName || "",
            username: user?.username || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            address: user?.address || ""
        }
    });

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const submit = (user) => {
        updateProfile(user)
        refreshUser();
    }

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
        <div className="lg:ml-10">
            <div className="md:flex md:flex-row flex-col justify-between mb-5">
                <h3 className="h3 mb-3 md:mb-0">Địa chỉ nhận hàng</h3>
            </div>
            <hr />
            <div>
                {user &&
                    <div className="">
                        <div className="">
                            <div className="mt-6">
                                <Input
                                    type="text"
                                    value={user?.address || 'Địa chỉ đang trống'}
                                    disabled
                                />
                                <button onClick={() => handleOpenDialog()} className="btn btn-accent btn-sm mt-5">Cập nhật</button>
                            </div>
                        </div>
                        <Dialog open={openDialog} onClose={handleCloseDialog}>
                            <DialogTitle className="uppercase text-center relative">
                                Cập nhật địa chỉ
                            </DialogTitle>
                            <i className="ri-close-line absolute right-2 top-3 px-2 bg-red-400 cursor-pointer rounded-full hover:bg-red-500 text-white" onClick={handleCloseDialog}></i>
                            <DialogContent>
                                <form onSubmit={handleSubmit(submit)}>
                                    <select className="border px-3 py-4 text-sm italic text-gray-400 rounded-lg w-full mb-3"
                                        value={selectedProvince}
                                        onChange={handleProvinceChange}>
                                        <option value="">Tỉnh thành</option>
                                        {provinces.map(province => (
                                            <option key={province.id} value={province.id}>{province.name}</option>
                                        ))}
                                    </select>
                                    <select className="border px-3 py-4 text-sm italic text-gray-400 rounded-lg w-full mb-3"
                                        value={selectedDistrict}
                                        onChange={handleDistrictChange}>
                                        <option value="">Chọn quận/huyện</option>
                                        {districts.map(district => (
                                            <option key={district.id} value={district.id}>{district.name}</option>
                                        ))}
                                    </select>
                                    <select className="border px-3 py-4 text-sm italic text-gray-400 rounded-lg w-full mb-3" value={selectedWard} onChange={handleWardChange}>
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
                                    <Input
                                        type="hidden"
                                        value={user.email}
                                        {...register("email")}
                                    />
                                    <Input
                                        type="hidden"
                                        value={user.firstName}
                                        {...register("firstName")}
                                    />
                                    <Input
                                        type="hidden"
                                        value={user.lastName}
                                        {...register("lastName")}
                                    />
                                    <Input
                                        type="hidden"
                                        value={user.phoneNumber}
                                        {...register("phoneNumber")}
                                    />
                                    <Input
                                        type="hidden"
                                        value={user.username}
                                        {...register("username")}
                                    />
                                    <button type="submit" className="btn btn-sm btn-accent mt-2 mx-auto">Lưu</button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                }
            </div>
        </div>
    );
}
