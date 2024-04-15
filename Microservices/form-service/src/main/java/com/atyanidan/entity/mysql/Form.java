package com.atyanidan.entity.mysql;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "Form")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long formId;

    @Column(name = "title")
    private String title;

    @Column(name = "selected", insertable = false)
    private Boolean selected;

    @Column(name = "created_on", updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdOn;

    private String formDefinitionId;

    public Form(String title, String formDefinitionId) {
        this.title = title;
        this.formDefinitionId = formDefinitionId;
    }

}
