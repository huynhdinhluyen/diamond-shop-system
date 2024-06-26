import { useState, useEffect } from "react";

export default function PhoneNotification() {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(true);
        }, 10000); // Show notification after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowNotification(false);
    };

    return (
        showNotification && (
            <div className="fixed bottom-28 right-14 bg-white p-4 rounded-lg shadow-lg z-50 flex items-center space-x-4">
                <div className="text-black">Bạn cần tư vấn ngay? Nhấn vào đây để gọi!</div>
                <button
                    onClick={handleClose}
                    className="absolute -left-[7%] -top-[14%] bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full hover:bg-red-700 transition duration-300"
                >
                    x
                </button>
            </div>
        )
    );
}
