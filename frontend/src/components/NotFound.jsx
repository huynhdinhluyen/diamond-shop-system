/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function NotFound({ message = "Không tìm thấy", linkRoute = "/", linkText = "Quay về trang chính" }) {
    return (
        <div className="container flex flex-col justify-center items-center gap-y-5">
            <h3 className="h3 text-accent">{message}</h3>
            <Link to={linkRoute} className="btn btn-accent btn-lg">{linkText}</Link>
        </div>
    )
}


