// mensajes.js


async function cargarMensajes() {
    // Configuración
    const BASE_URL = 'http://localhost:4000/api-gateway';
    const URL_ENDPOINT = `${BASE_URL}/contacts`;
    const contenedor = document.getElementById('mensajes-container');

    if (!contenedor) return;

    contenedor.innerHTML = '<h2>Cargando mensajes...</h2>';

    try {
        const respuesta = await fetch(URL_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: No se pudieron obtener los mensajes.`);
        }


        const mensajes = await respuesta.json();


        // Lógica de Renderizado
        if (mensajes.length === 0) {
            contenedor.innerHTML = '<h2>No hay mensajes de contacto guardados.</h2>';
        } else {

            let html = '<h2>Mensajes de Contacto Recibidos</h2>';
            html += '<ul style="list-style: none; padding: 0;">';
        
            mensajes.forEach(msg => {
                html += `
                    <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 15px; border-radius: 5px;">
                        <strong>Asunto:</strong> ${msg.subject}<br>
                        <strong>De:</strong> ${msg.senderName} (${msg.senderEmail})<br>
                        <strong>Mensaje:</strong> ${msg.messageBody}<br>
                        <small>Recibido: ${new Date(msg.receivedDate).toLocaleString()}</small>
                    </li>
                `;
            });
            html += '</ul>';
            contenedor.innerHTML = html;
        }

    } catch (error) {
        console.error('Error al cargar los mensajes:', error);
        contenedor.innerHTML = `<h2 style="color: red;">Error al conectar con el servidor: ${error.message}</h2>`;
    }
}

// Inicia la carga de datos al cargar la página

document.addEventListener('DOMContentLoaded', cargarMensajes);