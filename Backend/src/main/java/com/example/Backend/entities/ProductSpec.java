package com.example.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "product_specs")
public class ProductSpec {
    @Id
    @Column(name = "spec_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "product_id")
    private com.example.backend.entities.Product product;

    @Column(name = "spec_name", length = 100)
    private String specName;

    @Column(name = "spec_value")
    private String specValue;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public com.example.backend.entities.Product getProduct() {
        return product;
    }

    public void setProduct(com.example.backend.entities.Product product) {
        this.product = product;
    }

    public String getSpecName() {
        return specName;
    }

    public void setSpecName(String specName) {
        this.specName = specName;
    }

    public String getSpecValue() {
        return specValue;
    }

    public void setSpecValue(String specValue) {
        this.specValue = specValue;
    }

}