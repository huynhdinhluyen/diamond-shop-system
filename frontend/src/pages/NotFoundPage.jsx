import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NotFoundPage() {
  const { user } = useAuth();
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[#E85A1C]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Không tìm thấy trang
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Trang bạn tìm kiếm không tồn tại
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {!user && (
            <Link
              to="/"
              className="rounded-md bg-[#E85A1C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay về trang chủ
            </Link>
          )}
          {user && user.role === "CUSTOMER" && (
            <Link
              to="/"
              className="rounded-md bg-[#E85A1C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay về trang chủ
            </Link>
          )}
          {user && user.role === "SALES_STAFF" && (
            <Link
              to="/sales-staff"
              className="rounded-md bg-[#E85A1C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay về trang chủ
            </Link>
          )}
          {user && user.role === "DELIVERY_STAFF" && (
            <Link
              to="/delivery"
              className="rounded-md bg-[#E85A1C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay về trang chủ
            </Link>
          )}
          {user && user.role === "MANAGER" && (
            <Link
              to="/manager"
              className="rounded-md bg-[#E85A1C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay về trang chủ
            </Link>
          )}
          {user && user.role === "ADMIN" && (
            <Link
              to="/admin"
              className="rounded-md bg-[#E85A1C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay về trang chủ
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
