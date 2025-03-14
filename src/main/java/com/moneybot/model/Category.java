package com.moneybot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    public Category() {}
    
    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() { return id;}
    public void setId(Long id) { this.id = id;}

    public String getName() { return name;}
}
