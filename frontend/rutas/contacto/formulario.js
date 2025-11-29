document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('form-contacto');
    
    
    const BASE_URL = 'http://localhost:4000/api-gateway/contacts'; 


    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío por defecto

        // Obtener y validar los valores de los campos
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validaciones del Frontend
        if (nombre.length < 3) {
            alert('Por favor, ingresa un nombre válido (mínimo 3 caracteres)');
            return;
        }
        if (!validarCorreo(correo)) {
            alert('Por favor, ingresa un correo electrónico válido');
            return;
        }
        // Nota: La validación de 'telefono' se mantiene aquí, pero el campo NO se envía al backend
        if (!validarTelefono(telefono)) {
            alert('Por favor, ingresa un número de teléfono válido (9 dígitos)');
            return;
        }
        if (mensaje.length < 10) {
            alert('Por favor, ingresa un mensaje más detallado (mínimo 10 caracteres)');
            return;
        }

        //  Mapeo de nombres para coincidir con el Backend 
        const datosFormulario = {
            // Frontend: nombre  -> Backend: senderName
            senderName: nombre,
            // Frontend: correo -> Backend: senderEmail
            senderEmail: correo,
            // Backend espera 'subject', el frontend no lo pide, lo ponemos fijo.
            subject: "Consulta Formulario Web", 
            // Frontend: mensaje -> Backend: messageBody
            messageBody: mensaje
            // 🛑 IMPORTANTE: 'telefono' NO se incluye porque el backend no lo espera ni lo valida.
        };

        // Enviar los datos al servidor
        enviarDatos(datosFormulario, BASE_URL);
    });
});

// FUNCIONES DE SOPORTE

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function validarTelefono(telefono) {
    const regex = /^9\d{8}$/; 
    return regex.test(telefono);
}

/**
 * Función modificada para mostrar el mensaje flotante de éxito
 * @param {string} mensajeTexto - El texto que se mostrará en el mensaje.
 */
function mostrarMensajeExito(mensajeTexto) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito';
    mensaje.textContent = mensajeTexto; 
    
    // Estilos...
    mensaje.style.backgroundColor = '#4CAF50';
    mensaje.style.color = 'white';
    mensaje.style.padding = '15px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.position = 'fixed';
    mensaje.style.top = '20px';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translateX(-50%)';
    mensaje.style.zIndex = '1000';
    
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}


// ENVÍO DE DATOS


async function enviarDatos(data, baseUrl) {
    
    const URL_ENDPOINT = `${baseUrl}`; 
    const formulario = document.getElementById('form-contacto');

    try {
        const respuesta = await fetch(URL_ENDPOINT, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        });
        
        if (respuesta.ok) { 
            // Mensaje de confirmación de envío exitoso
            mostrarMensajeExito('✅ ¡Datos enviados correctamente! Nos comunicaremos contigo pronto.');
            formulario.reset(); // Limpia el formulario
        } else {
            console.error('Error del servidor:', respuesta.status, respuesta.statusText);
            
            let mensajeError = 'Error   al enviar el formulario. Intenta nuevamente.';
            try {
                // Intenta leer el mensaje de error personalizado del servidor
                const errorData = await respuesta.json();
                if (errorData.message) {
                    mensajeError = errorData.message; 
                }
            } catch (e) {}
            
            alert(mensajeError); 
        }

    } catch (error) {
        // Error de red 
        console.error('Error de conexión/red:', error);
        alert('Ocurrió un error de conexión. Verifica la URL o el estado del servidor.');
    }
}