package com.atyanidan.healthhub.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "District")
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "district_id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;

    @OneToMany(mappedBy = "district")
    private List<Taluka> talukas;

    public District() {}

    public District(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Taluka> getTalukas() {
        return talukas;
    }

    public void setTalukas(List<Taluka> talukas) {
        this.talukas = talukas;
    }
}