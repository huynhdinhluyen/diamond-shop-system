package com.example.backend.service.impl;

import com.example.backend.dto.DiamondDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Diamond;
import com.example.backend.entity.Product;
import com.example.backend.entity.ProductDiamond;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.DiamondRepository;
import com.example.backend.repository.ProductDiamondRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductDiamondRepository productDiamondRepository;
    private final DiamondRepository diamondRepository;
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

        // Ánh xạ các trường từ productDTO sang existingProduct (trừ productDiamonds)
        productMapper.updateProductFromDto(productDTO, existingProduct);

        // Update kim cương (productDiamonds)
        updateProductDiamonds(existingProduct, productDTO);

        // Lưu sản phẩm đã cập nhật
        Product updatedProduct = productRepository.save(existingProduct);

        // Trả về ProductDTO đã cập nhật
        return productMapper.toDto(updatedProduct);
    }

    @Transactional
    public void updateProductDiamonds(Product product, ProductDTO productDTO) {
        List<ProductDiamond> existingProductDiamonds = product.getProductDiamonds();
        Set<Integer> existingDiamondIds = existingProductDiamonds.stream()
                .map(pd -> pd.getDiamond().getId())
                .collect(Collectors.toSet());

        // Ánh xạ mainDiamond và auxiliaryDiamond
        DiamondDTO mainDiamondDTO = productDTO.getMainDiamond();
        DiamondDTO auxiliaryDiamondDTO = productDTO.getAuxiliaryDiamond();

        // Cập nhật hoặc tạo mới ProductDiamond cho mainDiamond
        updateOrCreateProductDiamond(product, existingProductDiamonds, existingDiamondIds, mainDiamondDTO, true);

        // Cập nhật hoặc tạo mới ProductDiamond cho auxiliaryDiamond
        updateOrCreateProductDiamond(product, existingProductDiamonds, existingDiamondIds, auxiliaryDiamondDTO, false);

        // Xóa các ProductDiamond không còn tồn tại
        List<ProductDiamond> toDelete = existingProductDiamonds.stream()
                .filter(pd -> {
                    Integer diamondId = pd.getDiamond().getId();
                    return (mainDiamondDTO == null || !diamondId.equals(mainDiamondDTO.getId())) &&
                            (auxiliaryDiamondDTO == null || !diamondId.equals(auxiliaryDiamondDTO.getId()));
                })
                .toList();

        for (ProductDiamond pd : toDelete) {
            existingProductDiamonds.remove(pd);
            productDiamondRepository.delete(pd);
        }
    }

    private void updateOrCreateProductDiamond(Product product, List<ProductDiamond> existingProductDiamonds,
                                              Set<Integer> existingDiamondIds, DiamondDTO diamondDTO, boolean isMain) {
        if (diamondDTO == null) {
            return;
        }
        Integer diamondId = diamondDTO.getId();

        // Kiểm tra xem kim cương đã tồn tại trong Product hay chưa
        Optional<ProductDiamond> existingProductDiamondOpt = existingProductDiamonds.stream()
                .filter(pd -> pd.getDiamond().getId().equals(diamondId))
                .findFirst();

        if (existingProductDiamondOpt.isPresent()) {
            // Nếu kim cương đã tồn tại trong Product, cập nhật isMain
            ProductDiamond existingProductDiamond = existingProductDiamondOpt.get();
            existingProductDiamond.setIsMain(isMain);
        } else {
            // Nếu kim cương chưa tồn tại trong Product
            // Lấy diamond từ repository bằng findById để tránh lỗi detached entity
            Diamond diamond = diamondRepository.findById(diamondId)
                    .orElseThrow(() -> new RuntimeException("Diamond not found"));

            ProductDiamond newProductDiamond = new ProductDiamond(product, diamond, isMain);
            existingProductDiamonds.add(newProductDiamond);
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

    @Override
    @Transactional
    public List<ProductDTO> getProductsByCategory(Integer categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream().map(productMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ProductDTO> getFilteredProducts(Integer categoryId, String searchQuery, Long minPrice, Long maxPrice) {
        List<Product> products = productRepository.findAll().stream()
                .filter(product -> (categoryId == null || product.getCategory().getId().equals(categoryId)) &&
                        (searchQuery == null || product.getName().toLowerCase().contains(searchQuery.toLowerCase())))
                .toList();

        return products.stream()
                .map(productMapper::toDto)
                .filter(productDTO -> (minPrice == null || productDTO.getSalePrice() >= minPrice) &&
                        (maxPrice == null || productDTO.getSalePrice() <= maxPrice))
                .collect(Collectors.toList());
    }
}
