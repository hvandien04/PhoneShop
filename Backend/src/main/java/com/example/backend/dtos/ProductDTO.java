package com.example.backend.dtos;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class ProductDTO {
    private Integer id;
    private String name;
    private String brand;
    private BigDecimal price;
    private String description;
    private Integer soldQuantity;
    private List<String> images;
    private List<Map<String, String>> specs;

    public ProductDTO(Integer id, String name, String brand, BigDecimal price, String description, Integer soldQuantity, List<String> images, List<Map<String, String>> specs) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.soldQuantity = soldQuantity;
        this.images = images;
        this.specs = specs;
    }

    // Getters & Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSoldQuantity() {
        return soldQuantity;
    }

    public void setSoldQuantity(Integer soldQuantity) {
        this.soldQuantity = soldQuantity;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<Map<String, String>> getSpecs() {
        return specs;
    }

    public void setSpecs(List<Map<String, String>> specs) {
        this.specs = specs;
    }
}
