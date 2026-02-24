document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById('contenedor-separacion');

    // Usamos una ruta relativa directa desde la carpeta web
    fetch('../assets/json/separacion_residuos.json')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
            return response.json();
        })
        .then(data => {
            contenedor.innerHTML = ""; // Limpiamos el cargando...
            
            data.forEach((item) => {
                // Validación para evitar undefined si el JSON cambia
                const pasos = item.pasos_preparacion || [];
                const depositar = item.que_depositar || [];
                const evitar = item.evitar || [];

                const card = `
                <div class="col">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="p-4 text-white text-center rounded-top" style="background-color: ${item.color_hex || '#666'}">
                            <i class="fas fa-trash-can fa-3x mb-3"></i>
                            <h3 class="fw-bold mb-0">${item.titulo || "Sin Título"}</h3>
                        </div>

                        <div class="card-body p-4">
                            <h5 class="text-success fw-bold"><i class="fas fa-clipboard-check me-2"></i>Pasos de preparación</h5>
                            <ul class="mt-2">
                                ${pasos.map(p => `<li>${p}</li>`).join('')}
                            </ul>

                            <hr>

                            <div class="row mt-4">
                                <div class="col-md-6 mb-3">
                                    <h6 class="fw-bold text-primary"><i class="fas fa-check-circle me-2"></i>¿Qué depositar?</h6>
                                    <ul class="small ps-3">
                                        ${depositar.map(d => `<li>${d}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <h6 class="fw-bold text-danger"><i class="fas fa-times-circle me-2"></i>Evitar</h6>
                                    <ul class="small ps-3">
                                        ${evitar.map(e => `<li>${e}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                contenedor.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            contenedor.innerHTML = `<div class="alert alert-danger">Error: Asegúrate de que 'assets/json/separacion_residuos.json' existe.</div>`;
        });
});