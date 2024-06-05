/* eslint-disable react/prop-types */

export default function Price({ price, locale = "vi-VN", currency = "VND" }) {
    const formatPrice = () =>
        new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
        }).format(price);
    return (
        <span>
            {formatPrice()}
        </span>
    )
}
