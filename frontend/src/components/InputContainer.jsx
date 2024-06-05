/* eslint-disable react/prop-types */

export default function InputContainer({ children }) {
    return (
        <div className="relative">
            <div className="content flex items-center">{children}</div>
        </div>
    )
}
