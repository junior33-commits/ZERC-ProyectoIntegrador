document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tema = urlParams.get('tema');
    const contenedor = document.getElementById('contenedor-guia');
    const tituloPagina = document.getElementById('titulo-guia');

    const guias = {
        'separacion': {
            archivo: 'assets/json/separacion_residuos.json',
            titulo: 'Guía: Separación de Residuos'
        },
        'reutilizar': {
            archivo: 'assets/json/reutilizar_crear.json',
            titulo: 'Guía: Reutilizar y Crear'
        },
        'proceso': {
            archivo: 'assets/json/proceso_reciclaje.json',
            titulo: 'Guía: Proceso de Reciclaje'
        }
    };

    const configuracion = guias[tema];

    if (!configuracion) {
        contenedor.innerHTML = '<div class="alert alert-danger w-100">Tema no encontrado.</div>';
        return;
    }

    tituloPagina.innerText = configuracion.titulo;

    fetch(configuracion.archivo)
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                // Generamos las listas solo si existen en el JSON
                const pasos = item.pasos_preparacion ? item.pasos_preparacion.map(p => `<li>${p}</li>`).join('') : '';
                const depositar = item.que_depositar ? item.que_depositar.map(d => `<li>${d}</li>`).join('') : '';
                const evitar = item.evitar ? item.evitar.map(e => `<li>${e}</li>`).join('') : '';

                const card = `
                    <div class="col">
                        <div class="card h-100 shadow-sm border-0">
                            <div class="p-3 text-white text-center rounded-top" style="background-color: ${item.color_hex || '#2e7d32'}">
                                <h5 class="mb-0 fw-bold">${item.titulo}</h5>
                            </div>
                            
                            <div class="card-body">
                                <p class="text-muted small">Haz clic en el botón para ver los pasos de preparación y qué materiales depositar.</p>
                                
                                <div class="collapse" id="info-${index}">
                                    <div class="mt-3">
                                        <h6 class="fw-bold text-success">Pasos de preparación:</h6>
                                        <ul class="ps-3 small">${pasos}</ul>
                                        
                                        <h6 class="fw-bold text-primary">¿Qué depositar?</h6>
                                        <ul class="ps-3 small">${depositar}</ul>
                                        
                                        <h6 class="fw-bold text-danger">Evitar:</h6>
                                        <ul class="ps-3 small">${evitar}</ul>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer bg-white border-0 pb-3">
                                <button class="btn btn-outline-success btn-sm w-100" 
                                        type="button" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target="#info-${index}">
                                    Ver detalles completos
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = '<div class="alert alert-danger w-100">Error al cargar el JSON.</div>';
        });
});