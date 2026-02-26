document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById('contenedor-reutilizar');

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

                const pasosHtml = proyecto.pasos.map(p => `
                    <div class="col-md-6 mb-3">
                        <div class="card h-100 border-0 shadow-sm bg-light">
                            <img src="${p.imagen_paso}" 
                                 class="card-img-top"
                                 style="height:150px; object-fit:contain; background:#fff;">
                            <div class="card-body p-3">
                                <span class="badge bg-success mb-2">
                                    Paso ${p.num_paso}
                                </span>
                                <h6 class="fw-bold mb-1">${p.titulo}</h6>
                                <p class="small text-muted mb-0">${p.descripcion}</p>
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

                            <div class="card-body text-center d-flex flex-column">
                                <h5 class="fw-bold text-success">
                                    ${proyecto.nombre_idea}
                                </h5>

                                <p class="text-muted small">
                                    ${proyecto.descripcion_corta}
                                </p>

                                <div class="mt-auto">
                                    <p class="small mb-3">
                                        <strong>Dificultad:</strong> ${proyecto.dificultad} | 
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
                    </div>

                <div class="modal fade" id="modal-${index}" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered" style="max-width: 900px;">
                        <div class="modal-content border-0 shadow-lg">

                            <div class="modal-header bg-success text-white">
                                <h5 class="modal-title fw-bold">
                                    ${proyecto.nombre_idea}
                                </h5>
                                <button type="button" 
                                        class="btn-close btn-close-white"
                                        data-bs-dismiss="modal">
                                </button>
                            </div>

                            <div class="modal-body p-4" style="max-height: 80vh; overflow-y: auto;">

                                <div class="row mb-4 align-items-center">
                                    <div class="col-md-5 text-center">
                                        <img src="${proyecto.imagen_catalogo}" 
                                             class="img-fluid rounded shadow-sm"
                                             style="max-height:200px;">
                                    </div>

                                    <div class="col-md-7 mt-3 mt-md-0">
                                        <h4 class="text-success fw-bold">Herramientas</h4>
                                        <ul class="small mt-2">
                                            ${proyecto.herramientas_necesarias
                                                .map(h => `<li>${h}</li>`)
                                                .join('')}
                                        </ul>
                                    </div>
                                </div>

                                <hr>

                                <h5 class="text-center my-3 fw-bold text-uppercase">
                                    Procedimiento Paso a Paso
                                </h5>

                                <div class="row g-3 justify-content-center">
                                    ${pasosHtml}
                                </div>

                            </div>

                            <div class="modal-footer bg-light">
                                <button type="button"
                                        class="btn btn-secondary px-4"
                                        data-bs-dismiss="modal">
                                    Cerrar
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
                <div class="alert alert-danger w-100 text-center">
                    Error al cargar los proyectos de reutilización.
                </div>`;
        });

});