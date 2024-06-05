/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import InputContainer from './InputContainer';

const Input = forwardRef(({
    type,
    defaultValue,
    onChange,
    name,
    error,
    placeholder,
    value
}, ref) => {
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

    return (
        <InputContainer>
            <input
                ref={ref}
                className="w-full outline-none border rounded-xl px-4 py-2 focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
            />
            {error && <div className="text-red-500 text-center text-xs absolute top-0 right-4 flex items-center h-full">{getErrorMessage()}</div>}
        </InputContainer>
    );
});

export default Input;