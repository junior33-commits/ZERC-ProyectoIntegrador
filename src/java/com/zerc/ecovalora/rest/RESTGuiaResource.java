package com.zerc.ecovalora.rest;

import com.zerc.ecovalora.model.Guia;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.*;

@Path("/guia")
public class RESTGuiaResource {

    private static List<Guia> guias = new ArrayList<>(
         Arrays.asList(
              new Guia(1, "Separación de Residuos", "Clasifica correctamente la basura en casa."),
              new Guia(2, "Proceso de Reciclaje", "Conoce los pasos del reciclaje."),
              new Guia(3, "Reutilizar y Crear", "Ideas prácticas para reutilizar materiales.")
         )
    );

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarGuias() {
        return Response.ok(guias).build();
    }
}
