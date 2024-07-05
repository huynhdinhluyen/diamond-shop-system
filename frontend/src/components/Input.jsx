/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from 'react';
import InputContainer from './InputContainer';

const Input = forwardRef(({
    type,
    defaultValue,
    onChange,
    name,
    error,
    placeholder,
    value,
    disabled
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const getErrorMessage = () => {
        if (!error) return;
        if (error.message) return error.message;
        switch (error.type) {
            case "required":
                return `Không được bỏ trống!`;
            case "minLength":
                return `Có vẻ hơi ngắn!`;
            case "pattern":
                return `Định dạng không đúng!`;
            case "validate":
                return error.message;
            default:
                return "*";
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <InputContainer>
            <div className="relative w-full">
                <input
                    ref={ref}
                    className="w-full outline-none border rounded-xl px-4 py-2 focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
                    type={showPassword ? 'text' : type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                    >
                        {showPassword ? (
                            <i className="ri-eye-off-fill"></i>
                        ) : (
                            <i className="ri-eye-fill"></i>
                        )}
                    </button>
                )}
            </div>
            {error && <div className="text-red-500 text-center text-xs absolute top-0 right-8 flex items-center h-full">{getErrorMessage()}</div>}
        </InputContainer>
    );
});

export default Input;