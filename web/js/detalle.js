document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idMaterial = urlParams.get('id');
    const contenedor = document.getElementById('detalle-contenedor');

    if (!idMaterial) {
        contenedor.innerHTML = '<div class="alert alert-danger">No se seleccionó ningún material.</div>';
        return;
    }

    fetch('assets/json/materiales_valorizables.json')
        .then(response => response.json())
        .then(materiales => {
            const material = materiales.find(m => m.id == idMaterial);

            if (material) {
                renderizarDetalle(material, contenedor);
            } else {
                contenedor.innerHTML = '<div class="alert alert-warning">Material no encontrado.</div>';
            }
        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = '<div class="alert alert-danger">Error al cargar la base de datos.</div>';
        });
});

function renderizarDetalle(item, contenedor) {
    // Convertimos el arreglo de objetos_creados en etiquetas HTML (badges)
    const objetosHtml = item.objetos_creados 
        ? item.objetos_creados.map(obj => `<span class="badge rounded-pill bg-light text-dark border me-2 mb-2 p-2">${obj}</span>`).join('')
        : 'Sin información';

    contenedor.innerHTML = `
        <div class="card shadow-lg border-0 overflow-hidden">
            <div class="p-4 text-white" style="background-color: ${item.color_interfaz}">
                <h1 class="display-5 mb-0">${item.nombre}</h1>
            </div>

            <div class="row g-0">
                <div class="col-md-5 d-flex align-items-center justify-content-center bg-white p-3">
                    <img src="${item.imagen_url}" class="img-fluid rounded" 
                         alt="${item.nombre}" 
                         style="max-height: 350px; width: 100%; object-fit: contain;">
                </div>
                
                <div class="col-md-7">
                    <div class="card-body p-4">
                        <h4 class="text-muted small text-uppercase fw-bold">Descripción</h4>
                        <p class="fs-5">${item.descripcion_corta}</p>
                        
                        <hr>
                        
                        <h4 class="text-success h5"><i class="fas fa-tools me-2"></i>Proceso de Reciclaje</h4>
                        <p class="text-secondary">${item.proceso_reciclaje}</p>
                        
                        <div class="mt-4">
                            <h4 class="h6 fw-bold text-dark">¿Qué se fabrica con esto?</h4>
                            <div class="d-flex flex-wrap mt-2">
                                ${objetosHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-footer bg-white border-0 p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <a href="catalogo.html" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Regresar al Catálogo
                    </a>
                    <small class="text-muted">ID: #00${item.id}</small>
                </div>
            </div>
        </div>
    `;
}