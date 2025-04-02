package com.example.backend.services;

import com.example.backend.dtos.ProductDTO;
import com.example.backend.entities.Product;
import com.example.backend.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductDTO getProductById(int id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            Product p = product.get();
            return new ProductDTO(
                    p.getId(),
                    p.getName(),
                    p.getBrand(),
                    p.getPrice(),
                    p.getDescription(),
                    p.getSoldQuantity(),
                    p.getImages() != null
                            ? p.getImages().stream().map(img -> img.getImageUrl()).collect(Collectors.toList())
                            : null,
                    p.getSpecs() != null
                            ? p.getSpecs().stream().map(spec -> Map.of("name", spec.getSpecName(), "value", spec.getSpecValue())).collect(Collectors.toList())
                            : null
            );
        }

        return null;
    }

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> new ProductDTO(
                product.getId(),
                product.getName(),
                product.getBrand(),
                product.getPrice(),
                product.getDescription(),
                product.getSoldQuantity(),
                product.getImages() != null
                        ? product.getImages().stream().map(img -> img.getImageUrl()).collect(Collectors.toList())
                        : null,
                product.getSpecs() != null
                        ? product.getSpecs().stream().map(spec -> Map.of("name", spec.getSpecName(), "value", spec.getSpecValue())).collect(Collectors.toList())
                        : null
        )).collect(Collectors.toList());
    }
}
