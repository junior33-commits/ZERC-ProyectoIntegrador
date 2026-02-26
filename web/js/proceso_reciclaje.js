document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById('contenedor-proceso');

    fetch('../assets/json/proceso_reciclaje.json')
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar JSON de procesos");
            return response.json();
        })
        .then(data => {

            contenedor.innerHTML = "";

            data.forEach((proceso, index) => {

             
            const etapasHtml = proceso.pasos_proceso.map(etapa => `
                <div class="col-md-6 mb-4">
                    <div class="card h-100 border-0 shadow-sm bg-white">

                        <div class="d-flex align-items-center justify-content-center bg-white" 
                             style="height: 220px; overflow: hidden; border-radius: 8px 8px 0 0;">
                            <img src="${etapa.imagen}" 
                                 class="img-fluid"
                                 style="max-height: 100%; width: auto; object-fit: contain;"
                                 onerror="this.src='../assets/img/default.png'">
                        </div>

                        <div class="card-body d-flex flex-column">
                            <h5 class="fw-bold text-success mb-2">
                                Etapa ${etapa.paso}: ${etapa.titulo}
                            </h5>
                            <p class="text-secondary small mb-0">
                                ${etapa.descripcion}
                            </p>
                        </div>
                    </div>
                </div>
            `).join('');

                const htmlProceso = `
                    <div class="col">
                        <div class="card h-100 shadow-sm border-0">

                            <div class="d-flex align-items-center justify-content-center bg-white p-3" 
                                 style="height: 200px; border-radius: 8px 8px 0 0; background-color: ${proceso.color_hex} !important;">
                                <div class="bg-white w-100 h-100 d-flex align-items-center justify-content-center rounded shadow-sm">
                                    <img src="${proceso.imagen_principal}" 
                                         class="img-fluid"
                                         style="max-height: 160px; width: auto; object-fit: contain;"
                                         onerror="this.src='../assets/img/default.png'">
                                </div>
                            </div>

                            <div class="card-body text-center d-flex flex-column">
                                <h4 class="fw-bold text-dark">
                                    ${proceso.nombre}
                                </h4>

                                <p class="text-muted small">
                                    ${proceso.descripcion_corta}
                                </p>

                                <div class="mt-auto">
                                    <button class="btn btn-success w-100 mt-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modal-proc-${index}">
                                        Ver Proceso Industrial
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                <div class="modal fade" id="modal-proc-${index}" tabindex="-1">
                    <div class="modal-dialog" style="max-width: 900px;">
                        <div class="modal-content">
                            <div class="modal-header bg-dark text-white">
                                <h5 class="modal-title">${proceso.nombre}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body p-4 p-lg-5">
                                <div class="row align-items-center mb-5">
                                    <div class="col-lg-5 text-center">
                                        <img src="${proceso.imagen_principal}" class="img-fluid rounded shadow-lg" style="max-height:400px;">
                                    </div>
                                    <div class="col-lg-7 mt-4 mt-lg-0">
                                        <h2 class="fw-bold text-success">${proceso.nombre}</h2>
                                        <p class="fs-5 text-muted">${proceso.descripcion_corta}</p>
                                    </div>
                                </div>
                                <hr class="my-5">
                                <h3 class="text-center mb-5 fw-bold text-uppercase">Etapas de Transformación</h3>
                                <div class="row justify-content-center">${etapasHtml}</div>
                            </div>
                            <div class="modal-footer bg-light">
                                <button type="button" class="btn btn-secondary px-5" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                contenedor.innerHTML += htmlProceso;
            });

        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = `
                <div class="alert alert-danger w-100 text-center">
                    Hubo un problema al cargar los procesos industriales.
                </div>`;
        });

});