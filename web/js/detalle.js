document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tema = urlParams.get('tema');
    const contenedor = document.getElementById('contenedor-guia');
    const titulo = document.getElementById('titulo-guia');

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

    titulo.innerText = configuracion.titulo;

    fetch(configuracion.archivo)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // 1. Manejo de información faltante (Evita el "undefined")
                const nombreMostrado = item.titulo || item.nombre || "Sin título";
                const imagenMostrada = item.imagen_url || item.imagen || "assets/img/default.png";
                const descripcionMostrada = item.descripcion || item.descripcion_corta || "No hay descripción.";
                
                // 2. Lógica para los pasos (Si el JSON tiene un array de pasos)
                let pasosHtml = "";
                if (item.pasos && Array.isArray(item.pasos)) {
                    pasosHtml = `<div class="mt-2 small text-start">
                        <strong>Pasos:</strong>
                        <ul class="mb-0">
                            ${item.pasos.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>`;
                } else if (item.proceso_pasos) { // Por si el campo se llama así
                    pasosHtml = `<p class="mt-2 small"><strong>Proceso:</strong> ${item.proceso_pasos}</p>`;
                }

                // 3. Generar la tarjeta con todos los detalles
                const card = `
                    <div class="col">
                        <div class="card h-100 shadow-sm border-0 overflow-hidden">
                            <div class="bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                                <img src="${imagenMostrada}" class="img-fluid" 
                                     alt="${nombreMostrado}" 
                                     style="max-height: 100%; object-fit: contain;"
                                     onerror="this.src='assets/img/default.png'">
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-success fw-bold">${nombreMostrado}</h5>
                                <p class="card-text text-muted flex-grow-1" style="font-size: 0.9rem;">
                                    ${descripcionMostrada}
                                </p>
                                ${pasosHtml}
                            </div>
                            <div class="card-footer bg-white border-0 pb-3">
                                <span class="badge bg-success w-100">Educativo</span>
                            </div>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = '<div class="alert alert-danger w-100">Error al cargar la información.</div>';
        });
});