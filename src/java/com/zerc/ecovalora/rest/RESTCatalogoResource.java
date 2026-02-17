package com.zerc.ecovalora.rest;

import com.zerc.ecovalora.model.Material;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.*;

@Path("/catalogo")
public class RESTCatalogoResource {

    private static List<Material> materiales = new ArrayList<>(
         Arrays.asList(
              new Material(1, "Plásticos", "Botellas, envases y empaques"),
              new Material(2, "Papel y Cartón", "Hojas, cajas y periódicos"),
              new Material(3, "Vidrio", "Botellas y frascos"),
              new Material(4, "Metales", "Latas y chatarra"),
              new Material(5, "Electrónicos", "Dispositivos y componentes")
         )
    );

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarMateriales() {
        return Response.ok(materiales).build();
    }
}
