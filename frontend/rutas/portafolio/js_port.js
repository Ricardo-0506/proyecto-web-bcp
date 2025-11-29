const ENDPOINT_SERVICES = 'http://localhost:4000/api-gateway/products';

const tarjetasContainer = document.querySelector('#tarjetas-container');

// Escapa texto para evitar XSS
function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function createServiceCard(service) {
    const id = service._id || service.id || service.serviceId || '';
    const beneficios = Array.isArray(service.beneficios) ? service.beneficios : (service.beneficios ? [service.beneficios] : []);
    const beneficiosList = beneficios.map(b => `<li>${escapeHtml(b)}</li>`).join('');

    return `
        <div class="tarjeta card mb-3" data-id="${escapeHtml(id)}">
            <div class="row g-0">
              <div class="col-md-3 d-flex align-items-center">
                <img src="${escapeHtml(service.imagen || '')}" alt="${escapeHtml(service.nombre || '')}" class="img-fluid rounded-start">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">${escapeHtml(service.nombre || '')}</h5>
                  <p class="card-text">${escapeHtml(service.descripcion || '')}</p>
                  <ul>${beneficiosList}</ul>
                  <div>
                    <button class="btn btn-sm btn-primary" onclick="window.showEditPrompt('${escapeHtml(id)}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="window.deleteService('${escapeHtml(id)}')">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `;
}

// Wrapper de fetch para manejar JSON y errores
async function fetchJSON(url, options = {}) {
    try {
        const res = await fetch(url, options);
        const contentType = res.headers.get('content-type') || '';
        let data = null;
        if (contentType.includes('application/json')) data = await res.json();
        else data = await res.text();
        if (!res.ok) return { ok: false, status: res.status, data };
        return { ok: true, status: res.status, data };
    } catch (error) {
        return { ok: false, error };
    }
}

async function loadDynamicCards() {
    if (tarjetasContainer) tarjetasContainer.innerHTML = '<p>Cargando servicios...</p>';
    const result = await fetchJSON(ENDPOINT_SERVICES);
    if (!result.ok) {
        console.error('Fallo al cargar los datos:', result.error || result.data);
        const detail = result.error ? result.error.message : (result.data ? JSON.stringify(result.data) : 'Sin detalle');
        if (tarjetasContainer) tarjetasContainer.innerHTML = `<p style="color:red">Error al conectar con ${ENDPOINT_SERVICES}: ${escapeHtml(detail)}</p>`;
        return;
    }

    const services = Array.isArray(result.data) ? result.data : (result.data ? [result.data] : []);
    const productosTarjeta = services.filter(item => item && (item.nombre || item.serviceId || item.id));

    if (productosTarjeta.length > 0) {
        tarjetasContainer.innerHTML = productosTarjeta.map(createServiceCard).join('');
    } else if (tarjetasContainer) {
        tarjetasContainer.innerHTML = '<p>No se encontraron servicios en la base de datos.</p>';
    }
}

async function createService(data) {
    let payload = data;
    const form = document.querySelector('#service-form');
    if (!payload && form) {
        const fd = new FormData(form);
        payload = {
            nombre: fd.get('nombre'),
            imagen: fd.get('imagen'),
            membresia: fd.get('membresia'),
            millasWelc: fd.get('millasWelc'),
            descripcion: fd.get('descripcion'),
            beneficios: (fd.get('beneficios') || '').split('\n').map(s => s.trim()).filter(Boolean)
        };
    }
    if (!payload || !payload.nombre) return alert('Proporcione al menos el nombre del servicio.');

    const result = await fetchJSON(ENDPOINT_SERVICES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!result.ok) {
        console.error('Error creando servicio:', result.error || result.data);
        alert('Error al crear servicio: ' + (result.error ? result.error.message : JSON.stringify(result.data)));
        return;
    }

    if (form) form.reset();
    await loadDynamicCards();
}

async function searchServices(term) {
    if (!term) return loadDynamicCards();
    const url = `${ENDPOINT_SERVICES}/search?q=${encodeURIComponent(term)}`;
    const result = await fetchJSON(url);
    if (!result.ok) {
        console.error('Error en búsqueda:', result.error || result.data);
        if (tarjetasContainer) tarjetasContainer.innerHTML = `<p style="color:red">Error en búsqueda: ${escapeHtml(result.error ? result.error.message : JSON.stringify(result.data))}</p>`;
        return;
    }
    const services = Array.isArray(result.data) ? result.data : (result.data ? [result.data] : []);
    if (services.length === 0) tarjetasContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    else tarjetasContainer.innerHTML = services.map(createServiceCard).join('');
}

async function updateService(id, updateData) {
    if (!id) return alert('ID requerido para actualizar.');
    if (!updateData || Object.keys(updateData).length === 0) return alert('Proporcione datos a actualizar.');
    const url = `${ENDPOINT_SERVICES}/${id}`;
    const result = await fetchJSON(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updateData) });
    if (!result.ok) {
        console.error('Error al actualizar:', result.error || result.data);
        alert('Error al actualizar: ' + (result.error ? result.error.message : JSON.stringify(result.data)));
        return;
    }
    await loadDynamicCards();
}

async function deleteService(id) {
    if (!id) return alert('ID de servicio no proporcionado.');
    if (!confirm('¿Eliminar este servicio?')) return;
    const url = `${ENDPOINT_SERVICES}/${id}`;
    const result = await fetchJSON(url, { method: 'DELETE' });
    if (!result.ok) {
        console.error('Error al eliminar:', result.error || result.data);
        alert('Error al eliminar: ' + (result.error ? result.error.message : JSON.stringify(result.data)));
        return;
    }
    await loadDynamicCards();
}

async function showEditPrompt(id) {
    if (!id) return alert('ID inválido.');
    const card = document.querySelector(`.tarjeta[data-id="${id}"]`);
    const currentName = card ? card.querySelector('.card-title')?.textContent : '';
    const currentDesc = card ? card.querySelector('.card-text')?.textContent : '';
    const newName = prompt('Nuevo nombre (vacío para no cambiar):', currentName);
    const newDesc = prompt('Nueva descripción (vacío para no cambiar):', currentDesc);
    const payload = {};
    if (newName !== null && newName !== '' && newName !== currentName) payload.nombre = newName;
    if (newDesc !== null && newDesc !== '' && newDesc !== currentDesc) payload.descripcion = newDesc;
    if (Object.keys(payload).length === 0) return alert('No hay cambios para aplicar.');
    await updateService(id, payload);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        let t = null;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(t);
            t = setTimeout(() => searchServices(e.target.value.trim()), 300);
        });
        const clearBtn = document.querySelector('#search-clear');
        if (clearBtn) clearBtn.addEventListener('click', () => { searchInput.value = ''; loadDynamicCards(); });
    }

    const form = document.querySelector('#service-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); createService(); });

    loadDynamicCards();
});

// Expose for debugging
window.loadDynamicCards = loadDynamicCards;
window.createService = createService;
window.searchServices = searchServices;
window.updateService = updateService;
window.deleteService = deleteService;
window.showEditPrompt = showEditPrompt;