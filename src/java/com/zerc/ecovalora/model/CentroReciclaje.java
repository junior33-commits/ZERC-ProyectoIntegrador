package com.zerc.ecovalora.model;

public class CentroReciclaje {

    private int id;
    private String nombre;
    private String direccion;
    private String materialesAceptados;
    private String telefonos;
    private String mapa;

    public CentroReciclaje() {
    }

    public CentroReciclaje(int id, String nombre, String direccion, String materialesAceptados, String telefonos, String mapa) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.materialesAceptados = materialesAceptados;
        this.telefonos = telefonos;
        this.mapa = mapa;
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

    public String getTelefonos() {
        return telefonos;
    }

    public void setTelefonos(String telefonos) {
        this.telefonos = telefonos;
    }

    public String getMapa() {
        return mapa;
    }

    public void setMapa(String mapa) {
        this.mapa = mapa;
    }
}
