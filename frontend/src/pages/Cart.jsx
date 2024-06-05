import { Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useCart } from "../hooks/useCart"
import Price from "../components/Price";

export default function Cart() {
    const { cart, changeQuantity, removeFromCart } = useCart();
    return (
        <div className="lg:mt-10">
            {cart.items.length === 0 ?
                <NotFound message="Giỏ hàng của bạn đang trống!" />
                : (
                    <div className="container">
                        <ul className="flex flex-col m-2 flex-grow rounded-lg list-none border-2">
                            {cart.items.map((item) => (
                                <li key={item.product.id}
                                    className="flex flex-col sm:flex-row items-center border-b-2 border-b-gray-300 last:border-none justify-around">
                                    <div className="p-2 flex items-center">
                                        <img
                                            src={`${item.product.imageUrl}`}
                                            alt={item.product.name}
                                            className="w-20 h-20 rounded-full object-cover md:mr-10"
                                        />
                                        <div className="p-0 text-lg sm:w-[200px] md:w-[300px]">
                                            <Link
                                                to={`/products/${item.product.id}`}
                                            >
                                                {item.product.name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-0 flex">
                                        <span className="flex sm:hidden">Số lượng:</span>
                                        <select
                                            name=""
                                            id=""
                                            value={item.quantity}
                                            onChange={(e) => changeQuantity(item, Number(e.target.value))}
                                            className="w-9 ml-2 outline-none border-b-2 border-gray-300"
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>
                                    </div>
                                    <div className="p-4 flex">
                                        <span className="flex sm:hidden mr-2">Thành tiền:</span><Price price={item.price} />
                                    </div>
                                    <button
                                        className="w-20 py-2 bg-gray-200 rounded-full text-accent hover:bg-gray-100 hover:text-accent-secondary mb-2 mr-2"
                                        onClick={() => removeFromCart(item.product.id)}
                                    >
                                        Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-y-5 items-center rounded-lg p-2 m-2 w-full">
                            <div className="my-auto">
                                <div>Tổng số lượng sản phẩm:
                                    <span className="ml-2 font-semibold">{cart.totalCount}</span>
                                </div>
                                <div>
                                    Tổng thanh toán:
                                    <span className="ml-2 font-semibold"><Price price={cart.totalPrice} /></span>
                                </div>
                            </div>
                            <Link to="/checkout" className="btn-accent p-3 rounded-lg">Tiến hành thanh toán</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
