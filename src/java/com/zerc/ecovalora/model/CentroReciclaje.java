package com.zerc.ecovalora.model;

public class CentroReciclaje {

    private int id;
    private String nombre;
    private String direccion;
    private String materialesAceptados;
    private String horario;

    public CentroReciclaje() {
    }

    public CentroReciclaje(int id, String nombre, String direccion, String materialesAceptados, String horario) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.materialesAceptados = materialesAceptados;
        this.horario = horario;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getMaterialesAceptados() {
        return materialesAceptados;
    }

    public void setMaterialesAceptados(String materialesAceptados) {
        this.materialesAceptados = materialesAceptados;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }
}
