package com.example.backend.service.impl;

import com.example.backend.dto.DiamondDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.*;
import com.example.backend.exception.DiamondCasingNotFoundException;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.exception.PromotionNotFoundException;
import com.example.backend.exception.WarrantyNotFoundException;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.*;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final DiamondCasingRepository diamondCasingRepository;
    private final ProductDiamondRepository productDiamondRepository;
    private final DiamondRepository diamondRepository;
    private final PromotionRepository promotionRepository;
    private final WarrantyRepository warrantyRepository;
    private final ProductMapper productMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAllWithDetails();
        return products.stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getProductById(Integer id) {
        Product product = productRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return productMapper.toDto(product);
    }

    @Override
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = productMapper.toEntity(productDTO);
        return productMapper.toDto(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDTO updateProduct(Integer id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        existingProduct.setName(productDTO.getName());
        existingProduct.setImageUrl(productDTO.getImageUrl());
        existingProduct.setLaborCost(productDTO.getLaborCost());
        existingProduct.setProfitMargin(productDTO.getProfitMargin());
        existingProduct.setStockQuantity(productDTO.getStockQuantity());

        if (productDTO.getDiamondCasing() != null) {
            DiamondCasing diamondCasing = diamondCasingRepository.findById(productDTO.getDiamondCasing().getId())
                    .orElseThrow(() -> new DiamondCasingNotFoundException(productDTO.getDiamondCasing().getId()));
            existingProduct.setDiamondCasing(diamondCasing);
        }

        // Cập nhật khuyến mãi
        if (productDTO.getPromotion() != null) {
            Promotion promotion = promotionRepository.findById(productDTO.getPromotion().getId())
                    .orElseThrow(() -> new PromotionNotFoundException(productDTO.getPromotion().getId()));
            existingProduct.setPromotion(promotion);
        }

        // Cập nhật bảo hành
        if (productDTO.getWarranty() != null) {
            Warranty warranty = warrantyRepository.findById(productDTO.getWarranty().getId())
                    .orElseThrow(() -> new WarrantyNotFoundException(productDTO.getWarranty().getId()));
            existingProduct.setWarranty(warranty);
        }

        // Cập nhật kim cương
        updateProductDiamonds(existingProduct, productDTO.getDiamonds());

        return productMapper.toDto(productRepository.save(existingProduct));
    }

    @Transactional
    public void updateProductDiamonds(Product product, List<DiamondDTO> diamondDTOs) {
        // Xóa các ProductDiamond hiện có của sản phẩm
        productDiamondRepository.deleteByProduct(product);
        if (diamondDTOs != null) {
            for (DiamondDTO diamondDTO : diamondDTOs) {
                Diamond diamond = diamondRepository.findById(diamondDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Diamond not found"));

                // Tìm ProductDiamond tương ứng với diamondDTO
                boolean isMain = product.getProductDiamonds().stream()
                        .filter(pd -> pd.getDiamond().getId().equals(diamondDTO.getId()))
                        .findFirst()
                        .map(ProductDiamond::getIsMain)
                        .orElse(false); // Mặc định là false (kim cương phụ) nếu không tìm thấy
                ProductDiamond productDiamond = new ProductDiamond(product, diamond, isMain);
                productDiamondRepository.save(productDiamond);
            }
        }
    }

    @Override
    @Transactional
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Long countProducts() {
        return productRepository.count();
    }
}
