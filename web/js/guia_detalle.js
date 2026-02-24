document.addEventListener("DOMContentLoaded", async () => {
    // 1. Extraer el ID de la URL (ej: guia_detalle.html?id=reutilizar-001)
    const params = new URLSearchParams(window.location.search);
    const idBuscado = params.get("id");

    const tituloDoc = document.getElementById("titulo-idea");
    const contenedor = document.getElementById("pasos-contenedor");

    // Si no hay ID, regresar a la página principal
    if (!idBuscado) {
        window.location.href = "guia.html";
        return;
    }

    try {
        // 2. Cargar el JSON (Asegúrate de que la ruta sea correcta)
        const response = await fetch('assets/json/reutilizar_crear.json');
        
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
        
        const ideas = await response.json();

        // 3. Buscar la idea que coincida con el ID de la URL
        const idea = ideas.find(item => item.id === idBuscado);

        if (idea) {
            // Llenar el título
            tituloDoc.textContent = idea.nombre_idea;
            contenedor.innerHTML = ''; // Limpiar el "Cargando..."

            // 4. Recorrer los pasos y agregarlos al HTML
            idea.pasos.forEach(paso => {
                contenedor.innerHTML += `
                    <div class="col-lg-8 mb-5">
                        <div class="card shadow-sm border-0">
                            <div class="card-body">
                                <h3 class="text-success">Paso ${paso.numero}: ${paso.titulo}</h3>
                                <p class="text-muted fs-5">${paso.descripcion}</p>
                                <img src="${paso.imagen}" 
                                     class="img-fluid rounded shadow-sm d-block mx-auto mt-3" 
                                     alt="Imagen del paso ${paso.numero}"
                                     onerror="this.src='assets/img/default.png'">
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            tituloDoc.textContent = "Error: Idea no encontrada";
            tituloDoc.classList.replace("text-success", "text-danger");
        }

    } catch (error) {
        console.error("Error detallado:", error);
        tituloDoc.textContent = "Error al cargar la información";
    }
});