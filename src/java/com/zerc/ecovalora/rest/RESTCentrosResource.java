package com.zerc.ecovalora.rest;

import com.zerc.ecovalora.model.CentroReciclaje;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.*;

@Path("/centros")
public class RESTCentrosResource {

    private static List<CentroReciclaje> centros = new ArrayList<>(
         Arrays.asList(
              new CentroReciclaje(1, "Centro Verde León", "Blvd. Torres Landa", "Plástico, Cartón, Aluminio", "9:00 – 17:00"),
              new CentroReciclaje(2, "Recicla León", "Col. Industrial", "Vidrio, Electrónicos", "8:00 – 16:00"),
              new CentroReciclaje(3, "Eco Punto Norte", "Zona Norte", "Papel, Plástico", "10:00 – 18:00")
         )
    );

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarCentros() {
        return Response.ok(centros).build();
    }
}
