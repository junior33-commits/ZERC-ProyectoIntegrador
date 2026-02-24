document.addEventListener("DOMContentLoaded", () => {
    cargarGuiasReciclaje();
});

async function cargarGuiasReciclaje() {
    const contenedor = document.getElementById("contenedor-guias"); // Asegúrate de que este ID esté en tu HTML
    if (!contenedor) return;

    try {
        const response = await fetch('assets/json/reutilizar_crear.json');
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        
        const datos = await response.json();
        contenedor.innerHTML = ""; // Limpiar el contenedor

        datos.forEach(guia => {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-4";
            card.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <img src="${guia.imagen_principal}" class="card-img-top" alt="${guia.nombre_idea}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-success">${guia.nombre_idea}</h5>
                        <p class="card-text text-muted">${guia.descripcion_corta}</p>
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