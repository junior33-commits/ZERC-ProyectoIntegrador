document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById('contenedor-reutilizar');

    // Mantenemos el ../ aquí porque el JS se ejecuta desde el contexto del HTML 
    // que está dentro de la carpeta 'guia_educativa'
    fetch('../assets/json/reutilizar_crear.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el JSON");
            }
            return response.json();
        })
        .then(data => {

            contenedor.innerHTML = "";

            data.forEach((proyecto, index) => {

                // Generamos pasos - Se eliminó el "../" extra de la ruta de imagen
                const pasosHtml = proyecto.pasos.map(p => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card h-100 border-0 shadow-sm">
                            <img src="${p.imagen_paso}" 
                                 class="card-img-top"
                                 style="height:200px; object-fit:contain; background:#f8f9fa;">
                            <div class="card-body">
                                <span class="badge bg-success mb-2">
                                    Paso ${p.num_paso}
                                </span>
                                <h6 class="fw-bold">${p.titulo}</h6>
                                <p class="card-text">${p.descripcion}</p>
                            </div>
                        </div>
                    </div>
                `).join('');

                const htmlProyecto = `
                <div class="col">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${proyecto.imagen_catalogo}" 
                             class="card-img-top"
                             style="height:250px; object-fit:cover;">

                        <div class="card-body text-center">
                            <h5 class="fw-bold text-success">
                                ${proyecto.nombre_idea}
                            </h5>

                            <p class="text-muted small">
                                ${proyecto.descripcion_corta}
                            </p>

                            <p class="small">
                                <strong>Dificultad:</strong> ${proyecto.dificultad}<br>
                                <strong>Tiempo:</strong> ${proyecto.tiempo_estimado}
                            </p>

                            <button class="btn btn-success w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-${index}">
                                Ver Instrucciones
                            </button>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="modal-${index}" tabindex="-1">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">

                            <div class="modal-header bg-success text-white">
                                <h5 class="modal-title fw-bold">
                                    ${proyecto.nombre_idea}
                                </h5>
                                <button type="button" 
                                        class="btn-close btn-close-white"
                                        data-bs-dismiss="modal">
                                </button>
                            </div>

                            <div class="modal-body p-4 p-md-5">

                                <div class="row mb-5 align-items-center">
                                    <div class="col-md-4 text-center">
                                        <img src="${proyecto.imagen_catalogo}" 
                                             class="img-fluid rounded shadow"
                                             style="max-height:300px;">
                                    </div>

                                    <div class="col-md-8">
                                        <h2 class="text-success fw-bold">
                                            Herramientas Necesarias
                                        </h2>
                                        <ul class="fs-5 mt-3">
                                            ${proyecto.herramientas_necesarias
                                                .map(h => `<li>${h}</li>`)
                                                .join('')}
                                        </ul>
                                    </div>
                                </div>

                                <hr>

                                <h3 class="text-center my-4 fw-bold">
                                    Procedimiento Paso a Paso
                                </h3>

                                <div class="row justify-content-center">
                                    ${pasosHtml}
                                </div>

                            </div>

                            <div class="modal-footer">
                                <button type="button"
                                        class="btn btn-outline-secondary"
                                        data-bs-dismiss="modal">
                                    Cerrar Tutorial
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                `;

                contenedor.innerHTML += htmlProyecto;
            });

        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = `
                <div class="alert alert-danger w-100">
                    Error al cargar los proyectos de reutilización.
                </div>`;
        });

});