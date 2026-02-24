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
              new CentroReciclaje(1, "Luis Bustos Trujillo", "Blvd.Timoteo Lozano 625, Col. San José de Cementos, León.", "Pilas, Baterías y Acumuladores", "477)470-9761","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d660.0802434531446!2d-101.68416919977699!3d21.0927025206006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bbfbce5a01a6b%3A0xcfea3c6246f24ab4!2sBlvd.%20Timoteo%20Lozano%20625%2C%20San%20Jose%20de%20Cementos%2C%2037555%20Le%C3%B3n%20de%20los%20Aldama%2C%20Gto.!5e0!3m2!1ses!2smx!4v1771943975723!5m2!1ses!2smx"),
              new CentroReciclaje(2, "Recicla León", "Col. Industrial", "Vidrio, Electrónicos", "8:00 – 16:00", ""),
              new CentroReciclaje(3, "Eco Punto Norte", "Zona Norte", "Papel, Plástico", "10:00 – 18:00", "")
         )
    );

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarCentros() {
        return Response.ok(centros).build();
    }
}
