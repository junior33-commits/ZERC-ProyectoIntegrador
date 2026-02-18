/**
 * ZERC / EcoValora - Aplicación frontend
 * Catálogo de residuos valorizables, guía educativa y centros de reciclaje.
 * Consume la API REST del proyecto.
 */
const ZERCApp = (function () {
    'use strict';

    const config = {
        apiBase: '/EcoValora/api'
    };

    function get(url) {
        return fetch(url)
            .then(function (response) {
                if (!response.ok) throw new Error('Error de red: ' + response.status);
                return response.json();
            });
    }

    function renderCatalogo(contenedor) {
        const el = document.getElementById(contenedor);
        if (!el) return;

        get(config.apiBase + '/catalogo')
            .then(function (data) {
                el.innerHTML = (data || []).map(function (material) {
                    return `
                <div class="col-md-4">
                  <div class="card h-100 text-center shadow-sm">
                    <div class="card-body">
                      <h5>${escapeHtml(material.nombre || '')}</h5>
                      <p>${escapeHtml(material.descripcion || '')}</p>
                      <a href="#" class="btn btn-outline-success">Ver más</a>
                    </div>
                  </div>
                </div>`;
                }).join('');
            })
            .catch(function (err) {
                console.error('Error cargando catálogo:', err);
                el.innerHTML = '<div class="col-12 text-center text-danger">No se pudo cargar el catálogo. Verifica la conexión con la API.</div>';
            });
    }

    function renderGuia(contenedor) {
        const el = document.getElementById(contenedor);
        if (!el) return;

        get(config.apiBase + '/guia')
            .then(function (data) {
                el.innerHTML = (data || []).map(function (guia) {
                    return `
                <div class="col-md-4">
                  <div class="card h-100 text-center shadow-sm">
                    <div class="card-body">
                      <h5>${escapeHtml(guia.titulo || '')}</h5>
                      <p>${escapeHtml(guia.descripcion || '')}</p>
                      <a href="#" class="btn btn-outline-primary">Ver más</a>
                    </div>
                  </div>
                </div>`;
                }).join('');
            })
            .catch(function (err) {
                console.error('Error cargando guía:', err);
                el.innerHTML = '<div class="col-12 text-center text-danger">No se pudo cargar la guía. Verifica la conexión con la API.</div>';
            });
    }

    function renderCentros(contenedor) {
        const el = document.getElementById(contenedor);
        if (!el) return;

        get(config.apiBase + '/centros')
            .then(function (data) {
                el.innerHTML = (data || []).map(function (centro) {
                    return `
                <div class="col-md-4">
                  <div class="card h-100 shadow-sm">
                    <div class="card-body">
                      <h5 class="card-title">${escapeHtml(centro.nombre || '')}</h5>
                      <p class="card-text">
                        📍 ${escapeHtml(centro.direccion || '')}<br>
                        ♻ Acepta: ${escapeHtml(centro.materialesAceptados || '')}<br>
                        ⏰ ${escapeHtml(centro.horario || '')}
                      </p>
                      <a href="#" class="btn btn-success w-100">Ver detalles</a>
                    </div>
                  </div>
                </div>`;
                }).join('');
            })
            .catch(function (err) {
                console.error('Error cargando centros:', err);
                el.innerHTML = '<div class="col-12 text-center text-danger">No se pudo cargar los centros. Verifica la conexión con la API.</div>';
            });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Inicializa la página según el contenedor presente (catalogo, guia o centros).
     */
    function init() {
        if (document.getElementById('catalogo')) renderCatalogo('catalogo');
        if (document.getElementById('guia')) renderGuia('guia');
        if (document.getElementById('centros')) renderCentros('centros');
    }

    return {
        config: config,
        loadCatalogo: renderCatalogo,
        loadGuia: renderGuia,
        loadCentros: renderCentros,
        init: init
    };
})();

// Auto-inicialización al cargar el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ZERCApp.init);
} else {
    ZERCApp.init();
}
