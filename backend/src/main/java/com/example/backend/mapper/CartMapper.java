package com.example.backend.mapper;

import com.example.backend.dto.CartDTO;
import com.example.backend.dto.OrderDTO;
import com.example.backend.entity.Cart;
import com.example.backend.entity.Order;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class CartMapper {
    private final UserRepository userRepository;

//    public static Cart maptoCartEntity(CartDTO cartDTO) {
//        return new Cart(
//                cartDTO.getId(),
//                cartDTO.getUser_id(),
//                cartDTO.getProduct_id(),
//                cartDTO.getQuantity()
//        );
//    }

    public static CartDTO mapToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setQuantity(cart.getQuantity());
        // Chuyển đổi thông tin User và Product thành UserDTO và ProductDTO nếu cần
        // Ví dụ:
//         cartDTO.setUser(UserMapper.maptoUserDTO(cart.getUser()));
//         cartDTO.setProduct(cart.getProduct());
        return cartDTO;
    }

    public static List<CartDTO> maptoCartDTOList(List<Cart> cartList) {
        List<CartDTO> cartDTOList = new ArrayList<>();
        for (Cart cart : cartList) {
            cartDTOList.add(mapToCartDTO(cart));
        }
        return cartDTOList;
    }
}
