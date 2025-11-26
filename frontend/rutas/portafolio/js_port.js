const ENDPOINT_SERVICES = 'http://localhost:3000/api/services';

const tarjetasContainer = document.querySelector('#tarjetas-container');

window.mostrarMensaje = () => alert('Función de solicitud o detalle no implementada aún.');

function createServiceCard(service) {
    const beneficiosList = service.beneficios
        .map(beneficio => `<li>${beneficio}</li>`)
        .join('');

    return `
        <div class="tarjeta">
            <img src="${service.imagen}" alt="${service.nombre}"> 
            <h3>${service.nombre}</h3>
            <p>${service.descripcion}</p>
            <ul>
                ${beneficiosList}
            </ul>
            <button onclick="mostrarMensaje()">Solicitar tarjeta</button>
            <button onclick="mostrarMensaje()">Ver más detalles</button>
        </div>
    `;
}

async function loadDynamicCards() {
    if (tarjetasContainer) tarjetasContainer.innerHTML = '<p>Cargando productos...</p>';

    try {
        const response = await fetch(ENDPOINT_SERVICES);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}.`);
        }
        
        const services = await response.json();

        const productosTarjeta = services.filter(item => item.nombre);
        
        if (productosTarjeta.length > 0) {
            const htmlContent = productosTarjeta
                .map(producto => createServiceCard(producto))
                .join('');
            tarjetasContainer.innerHTML = htmlContent;
        } else if (tarjetasContainer) {
            tarjetasContainer.innerHTML = '<p>No se encontraron tarjetas en la base de datos.</p>';
        }

    } catch (error) {
        console.error('Fallo al cargar los datos:', error);
        const errorMessage = `<p style="color: red;">Error: No se pudo conectar con el servidor de la API. Verifique el puerto 3000.</p>`;
        
        if (tarjetasContainer) tarjetasContainer.innerHTML = errorMessage;
    }
}

document.addEventListener('DOMContentLoaded', loadDynamicCards);