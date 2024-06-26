import PhoneNotification from "./PhoneNotification";

export default function PhoneButton() {
    const handlePhoneCall = () => {
        const confirmation = window.confirm("Bạn có chắc chắn muốn gọi không?");
        if (confirmation) {
            window.location.href = "tel:+84123123123";
        }
    };
    return (
        <div>
            <PhoneNotification />
            <button
                onClick={handlePhoneCall}
                className="z-50 fixed bottom-20 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 flex items-center justify-center"
                style={{ width: '50px', height: '50px' }}
            >
                <i className="ri-customer-service-2-fill"></i>
            </button>
        </div>
    )
}
