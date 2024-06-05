export const EMAIL = {
  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
  message: "Email không hợp lệ!",
};

export const PHONE_NUMBER = {
  value: /^0\d{9}$/,
  message: "Số điện thoại không hợp lệ!"
};
export const NAME = {
  value: /^[^\d]+$/,
  message: "Họ và tên không chứa chữ số!"
}

