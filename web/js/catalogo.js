document.addEventListener("DOMContentLoaded", () => {
    cargarGuiasReciclaje();
});

async function cargarGuiasReciclaje() {
    const contenedor = document.getElementById("contenedor-guias");
    if (!contenedor) return;

    try {
        const response = await fetch('assets/json/reutilizar_crear.json');
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        
        const datos = await response.json();
        contenedor.innerHTML = ""; 

        datos.forEach(guia => {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-4";
            card.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <div class="img-container">
                        <img src="${guia.imagen_catalogo}" 
                             alt="${guia.nombre_idea}" 
                             class="img-catalogo">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-success fw-bold">${guia.nombre_idea}</h5>
                        <p class="card-text text-muted small">${guia.descripcion_corta}</p>
                        <a href="guia_detalle.html?id=${guia.id}" class="btn btn-success mt-auto">Ver detalles completos</a>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error al llenar el catálogo:", error);
        contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar las guías. Inténtalo más tarde.</p>`;
    }
}