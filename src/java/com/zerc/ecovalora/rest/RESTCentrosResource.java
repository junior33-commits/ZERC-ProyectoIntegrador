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
              new CentroReciclaje(2, "Araxxxo, S.A. de C.V.", "Blvd.. José María Morelos 115 Bodega 3ª, León.", "Metales", "477 327 64 12", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.454404030157!2d-101.66455202514662!3d21.174100380511845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bb8d7d27d995b%3A0x65f17992fa2e9983!2sBlvrd%20Jose%20Mar%C3%ADa%20Morelos%20115%2C%20Fracciones%20de%20Echeveste%2C%2037110%20Le%C3%B3n%20de%20los%20Aldama%2C%20Gto.!5e0!3m2!1ses!2smx!4v1772040205281!5m2!1ses!2smx"),
              new CentroReciclaje(3, "Cartonera del Centro", "Timoteo Lozano 101, León.", "Papel y Cartón", "(477) 7120000", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2512.840780245663!2d-101.69428545925682!3d21.095246716177982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bbf92ffd7c7fb%3A0x457a314cedd2783!2sBlvd.%20Timoteo%20Lozano%20101%2C%20San%20Miguel%2C%2037458%20Le%C3%B3n%20de%20los%20Aldama%2C%20Gto.!5e0!3m2!1ses!2smx!4v1772040443535!5m2!1ses!2smx"),
              new CentroReciclaje(3, "Trituradora de plásticos del Bajío", "Faisán 403, Col. Santa Rita León.", "Plástico", "(477) 770 5944\n(477) 227 2268", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.208468954524!2d-101.70465922514875!3d21.10425338056401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bbf861b9e5515%3A0xa15584963331cf52!2sFais%C3%A1n%20403%2C%20Centro%20Bodeguero%20Robles%2C%2037450%20Le%C3%B3n%20de%20los%20Aldama%2C%20Gto.!5e0!3m2!1ses!2smx!4v1772040634877!5m2!1ses!2smx")
         )
    );

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarCentros() {
        return Response.ok(centros).build();
    }
}
